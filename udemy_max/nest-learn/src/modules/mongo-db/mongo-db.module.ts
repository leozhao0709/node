import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../../environment/environment';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(environment.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
  ],
})
export class MongoDbModule {}
