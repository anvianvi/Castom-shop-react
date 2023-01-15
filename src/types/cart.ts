export interface CartItem {
  id: string;
  count: number;
}

export interface ICart {
  items: CartItem[];
}
