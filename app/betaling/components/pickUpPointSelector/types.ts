import type { PickupPoint } from "../../types";

export type PropsPickUp = {
  points: PickupPoint[];
  loading: boolean;
  selected: PickupPoint | null;
  onSelect: (p: PickupPoint) => void;
  error?: string;
  address: string;
};
