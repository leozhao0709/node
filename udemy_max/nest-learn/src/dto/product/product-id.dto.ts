import { ApiModelProperty } from '@nestjs/swagger';

/**
 * ProductId
 */
export class ProductIdDto {
  @ApiModelProperty()
  readonly productId: string;
}
