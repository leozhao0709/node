import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { GetUserResp } from './resp/GetUserResp';
import Serialize from '../decorators/Serialize.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  create() {
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

  @Get('/:id')
  @Serialize(GetUserResp)
  async getOne(@Param('id') id: number) {
    const user = await this.userService.getOne(id);
    return user;
  }
}
