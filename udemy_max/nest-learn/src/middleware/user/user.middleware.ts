import { createConnection, getConnectionManager } from 'typeorm';
import { User } from '../../modules/database/entities/user.entity';
import { Request } from 'express';
import * as path from 'path';
import { Cart } from '../../modules/database/entities/cart.entity';

let user: User;

export const userMiddleware = async (req: Request, res, next) => {
  const connectionName = 'createUserSession';

  if (!getConnectionManager().has(connectionName)) {
    await createConnection({
      name: connectionName,
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: 'node_complete',
      entities: [
        path.resolve(
          path.dirname(process.mainModule.filename),
          './modules/database/entities/*.entity.ts',
        ),
      ],
    });

    const connection = await getConnectionManager().get(connectionName);
    const userRepository = connection.getRepository(User);

    user = (await userRepository.findByIds([1], {
      relations: [
        'cart',
        'products',
        'cart.cartItems',
        'cart.cartItems.product',
      ],
    }))[0];
    if (user && !user.cart) {
      user.cart = await getConnectionManager()
        .get(connectionName)
        .getRepository(Cart)
        .create();

      await userRepository.save(user);
    }
  }

  req.user = user;

  next();
};
