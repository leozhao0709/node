import { User } from '../../modules/database/entities/user.entity';

declare module 'express' {
  interface Request {
    user?: User;
  }
}
