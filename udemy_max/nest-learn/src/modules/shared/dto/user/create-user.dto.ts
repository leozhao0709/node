import { ApiModelProperty } from '@nestjs/swagger';

/**
 * createUserDto
 */
export class CreateUserDto {
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly cart: Array<{
    items: { productId: string; quantity: number };
  }>;
}
