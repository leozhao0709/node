import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
      }@cluster0-sizbw.mongodb.net/shop?retryWrites=true`,
    ),
  ],
})
export class MongoDbModule {}
