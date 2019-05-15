import { ApiModelProperty } from '@nestjs/swagger';

/**
 * UserUpdatePasswordDto
 */
export class UserUpdatePasswordDto {
  @ApiModelProperty()
  readonly password: string;
  @ApiModelProperty()
  readonly token: string;
  @ApiModelProperty()
  readonly userId: string;
}
