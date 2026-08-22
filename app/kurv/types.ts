export type CartItem = {
  id: number;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
};

export type PropsCartItem = {
  item: CartItem;
  onRemove: (id: number) => void;
};
export type PropsCartList = {
  cart: CartItem[];
  onRemove: (id: number) => void;
};

export type PropsCartSummary = {
  cart: CartItem[];
};
