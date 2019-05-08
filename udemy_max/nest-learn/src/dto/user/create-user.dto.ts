import { ApiModelProperty } from '@nestjs/swagger';

/**
 * createUserDto
 */
export class CreateUserDto {
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly password: string;
  @ApiModelProperty()
  readonly confirmPassword: string;
}
