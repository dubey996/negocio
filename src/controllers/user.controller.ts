import { repository } from "@loopback/repository";
import { UserRepository, Credentials } from "../repositories";
import { post, getJsonSchemaRef, requestBody, get, param } from "@loopback/rest";
import { User, Rol } from "../models";
import { validateCredentials } from "../services/validator";
import * as _ from 'lodash';
import { BcryptHasher } from "../services/encryptacion";
import { inject } from "@loopback/core";
import { CredentialsRquestBody } from "./specs/user.controller.spec";
import { MyUserService } from "../services/user-service";
import { JWTService } from "../services/jwt-service";
import { PasswordHasherBindings, UserServiceBindings, TokenServiceBindings } from "../keys";
import { UserProfile, securityId } from "@loopback/security";
import { authenticate, AuthenticationBindings } from "@loopback/authentication";
import { PermissionKeys } from "../authorization/permisos-key";
import { MyUserProfile } from "../types";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
  ) { }

  @post('/users/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchemaRef(User),
        },
      },
    },
  })
  async signup(@requestBody() userData: User) {
    validateCredentials(_.pick(userData, ['email', 'password']));
    userData.permissions = [PermissionKeys.AccessAuthFeature];
    userData.password = await this.hasher.hashPassword(userData.password)
    const savedUser = await this.userRepository.create(userData)
    delete savedUser.password;
    return savedUser;
  }
  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                }
              }
            }
          }

        },
      },
    },
  })
  async login(@requestBody(CredentialsRquestBody) credentials: Credentials): Promise<{ token: string, em: MyUserProfile }> {

    const user = await this.userService.verifyCredentials(credentials);

    const userProfile = this.userService.convertToUserProfile(user);

    const em = userProfile;

    const token = await this.jwtService.generateToken(userProfile);

    return Promise.resolve({ token, em });

  }
  @get('/users/me')
  @authenticate('jwt')
  async me(
    @inject(AuthenticationBindings.CURRENT_USER)
    CurrentUser: UserProfile,
  ): Promise<UserProfile> {

    return Promise.resolve(CurrentUser);
  }

  @get('/users/{id}/rolId')
  async getRol(
    @param.path.number('id') userId: typeof User.prototype.id,
  ): Promise<Rol> {
    return this.userRepository.rol(userId);

  }
}
