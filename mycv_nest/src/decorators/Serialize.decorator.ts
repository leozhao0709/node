import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize/serialize.interceptor.js';
import type { Constructor } from '../types/helper.js';

const Serialize = (respClass: Constructor<any>) => {
  return UseInterceptors(new SerializeInterceptor(respClass));
};

export default Serialize;
