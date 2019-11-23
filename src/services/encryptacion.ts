import { genSalt, hash, compare } from 'bcryptjs';
import { inject } from '@loopback/core';
import { PasswordHasherBindings } from '../keys';
export interface PasswordHasher<T = string> {
  hashPassword(password: T): Promise<T>;
  compararContrasenas(providedPass: T, storedPass: T): Promise<boolean>
}


export class BcryptHasher implements PasswordHasher<string> {
  async compararContrasenas(providedPass: string, storedPass: string): Promise<boolean> {
    const passwordMatched = await compare(providedPass, storedPass);
    return passwordMatched;
  }
  @inject(PasswordHasherBindings.ROUNDS)
  public readonly rounds: number;
  async hashPassword(password: string) {
    const salt = await genSalt(this.rounds);
    return await hash(password, salt);
  }
}
