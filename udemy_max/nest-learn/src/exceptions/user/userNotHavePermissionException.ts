import { UserException } from './userException';

/**
 * UserNotHavePermissionException extends UserException
 */
export class UserNotHavePermissionException extends UserException {
  constructor() {
    super();
  }
}
