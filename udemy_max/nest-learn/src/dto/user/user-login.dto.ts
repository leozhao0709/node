import { ApiModelProperty } from '@nestjs/swagger';

/**
 * UserLogin
 */
export class UserLoginDto {
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly password: string;
}
