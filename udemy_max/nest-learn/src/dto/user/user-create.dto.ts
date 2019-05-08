import { ApiModelProperty } from '@nestjs/swagger';

/**
 * UserCreateDto
 */
export class UserCreateDto {
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly password: string;
  @ApiModelProperty()
  readonly confirmPassword: string;
}
