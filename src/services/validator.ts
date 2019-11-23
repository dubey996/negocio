import * as isEmail from 'isemail';
import { Credentials } from '../repositories/user.repository';
import { HttpErrors } from '@loopback/rest';

export function validateCredentials(credentials: Credentials) {
  if (!isEmail.validate(credentials.email)) {
    throw new HttpErrors.UnprocessableEntity(' invalid Email');
  }

  if (credentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity(' contraseña muy corta, debe tener mas de 8 caracteres');
  }
}
