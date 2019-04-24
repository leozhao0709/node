import { ApiModelProperty } from '@nestjs/swagger';

/**
 * productDTO
 */
export class AddProductDto {
  @ApiModelProperty()
  readonly title: string;
  @ApiModelProperty()
  readonly imageUrl: string;
  @ApiModelProperty()
  readonly description: string;
  @ApiModelProperty()
  readonly price: number;
}
