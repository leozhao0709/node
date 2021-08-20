import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  @Get('whomai')
  whomai() {
    return 'whomai';
  }
}
