import { Schema } from 'mongoose';
import { User } from '../../modules/mongo-db/schemas/user.schema';
declare global {
  namespace Express {
    interface SessionData {
      isLoggedIn: boolean | null;
      userId: string | null;
      flash: { [key: string]: string[] };
    }

    interface Request {
      user: User;
      flash: (event: string, message: string) => Promise<void>;
      consumeFlash: (event: string) => Promise<string[] | null>;
    }

    interface Response {
      locals: {
        isLoggedIn: boolean | null;
      };
    }
  }
}
