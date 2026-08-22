import type { PickupPoint } from "../../types";

export type PropsPickUp = {
  points: PickupPoint[];
  loading: boolean;
  selected: PickupPoint | null;
  onSelect: (p: PickupPoint) => void;
  visible: boolean;
  error?: string;
  address: string;
};
