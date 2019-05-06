import { User } from '../../modules/mongo-db/schemas/user.schema';

declare global {
  namespace Express {
    interface SessionData {
      isLoggedIn: boolean | null;
    }
    interface Request {
      user: User;
    }
  }
}
