import { SignupException } from './user-signup.exception';
import { ValidationError } from 'class-validator';
/**
 * CreateUserDtoException
 */
export class UserCreateDtoException extends SignupException {
  validateErrors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super();
    this.validateErrors = errors;
  }
}
