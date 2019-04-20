/**
 * Cart
 */
export class Cart {
  constructor(public products: Array<{ productId: string; qty: number }>, public totalPrice: number) {}
}
