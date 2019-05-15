import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * UserCreateDto
 */
export class UserCreateDto {
  @ApiModelProperty()
  @IsEmail()
  readonly email: string;
  @ApiModelProperty()
  readonly password: string;
  @ApiModelProperty()
  readonly confirmPassword: string;
}
