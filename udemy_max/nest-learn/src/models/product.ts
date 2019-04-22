/**
 * Product
 */
export class Product {
  constructor(
    public id: string,
    public title: string,
    public imageUrl: string,
    public description: string,
    public price: number,
  ) {}
}
