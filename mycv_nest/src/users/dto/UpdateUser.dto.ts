import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './CreateUser.dto.js';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
