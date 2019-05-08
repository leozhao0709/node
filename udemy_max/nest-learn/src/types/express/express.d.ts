import { Schema } from 'mongoose';
import { User } from '../../modules/mongo-db/schemas/user.schema';
declare global {
  namespace Express {
    interface SessionData {
      isLoggedIn: boolean | null;
      userId: string | null;
    }

    interface Request {
      user: User;
    }
  }
}
