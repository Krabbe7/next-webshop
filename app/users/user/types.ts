export type OrderItem = {
  gameId: number;
  title: string;
  image_url: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: number;
  created_at: string;
  total_price: number;
  delivery_method: string;
  pickup_point_id: string | null;
  pickup_point_name: string | null;
  pickup_point_address: string | null;
  items: OrderItem[];
};
