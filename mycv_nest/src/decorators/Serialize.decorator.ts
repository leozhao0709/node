import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize/serialize.interceptor';
import type { Constructor } from '../types/helper';

const Serialize = (respClass: Constructor<any>) => {
  return UseInterceptors(new SerializeInterceptor(respClass));
};

export default Serialize;
