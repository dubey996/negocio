import { UserService } from '@loopback/authentication';
import { UserProfile, securityId } from '@loopback/security'
import { User } from '../models';
import { Credentials, UserRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { inject } from '@loopback/core';
import { BcryptHasher } from './encryptacion';
import { PasswordHasherBindings } from '../keys';
import { MyUserProfile } from '../types';
import { toJSON } from '@loopback/testlab';
import { pick } from "lodash";


export class MyUserService implements UserService<User, Credentials>{
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher
  ) { }
  async verifyCredentials(credentials: Credentials): Promise<User> {
    const foundUser = await this.userRepository.findOne(
      {
        where: {
          email: credentials.email
        },
      }
    );
    if (!foundUser) {
      throw new HttpErrors.NotFound(`usuario no encontrado con este ${credentials.email}`);
    }
    const passwordMatched = await this.hasher.compararContrasenas(credentials.password, foundUser.password);
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('contraseña no es valida');
    }
    return foundUser;
  }
  convertToUserProfile(user: User): MyUserProfile {
    let userName = '';
    if (user.nombre) {
      userName = user.nombre;
    }
    if (user.apellidos) {
      userName = user.apellidos ? `${user.nombre} ${user.apellidos}` : user.apellidos;

    }
    const currentUser: MyUserProfile = pick(toJSON(user), [
      'id',
      'email',
      'permissions',
      'rolId'

    ]) as MyUserProfile;
    currentUser.name = userName;
    return currentUser;
  }

}
