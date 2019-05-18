import { SignupException } from './user-signup.exception';

/**
 * UserAlreadyExistingException
 */
export class UserAlreadyExistingException extends SignupException {
  constructor() {
    super();
  }
}
