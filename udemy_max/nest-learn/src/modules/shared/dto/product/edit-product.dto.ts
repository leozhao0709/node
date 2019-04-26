import { ApiModelProperty } from '@nestjs/swagger';

/**
 * productDTO
 */
export class EditProductDto {
  @ApiModelProperty()
  readonly productId: string;
  @ApiModelProperty()
  readonly title: string;
  @ApiModelProperty()
  readonly imageUrl: string;
  @ApiModelProperty()
  readonly description: string;
  @ApiModelProperty()
  readonly price: number;
}
