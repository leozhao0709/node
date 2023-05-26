import { Expose } from 'class-transformer';

class Resp {
  @Expose()
  updatedAt!: Date;
  @Expose()
  createdAt!: Date;
}

export class GetUserResp extends Resp {
  @Expose()
  email!: string;
}
