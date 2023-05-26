import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UpdateUserDto } from './dto/UpdateUser.dto.js';
import { GetUserResp } from './resp/GetUserResp.js';
import Serialize from '../decorators/Serialize.decorator.js';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  create() {
    console.log('---creating----');
    return this.userService.create();
  }

  @Get('/delete/:id')
  async deleteOne(@Param('id') id: number) {
    return this.userService.deleteOne(id);
  }

  @Post('/update/:id')
  async updateOne(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const user = await this.userService.updateOne(id, updateUserDto);
    return user;
  }

  // @UseInterceptors(new SerializeInterceptor(GetUserResp))
  @Get('/:id')
  @Serialize(GetUserResp)
  async getOne(@Param('id') id: number) {
    const user = await this.userService.getOne(id);
    return user;
  }
}
