import type { Shipping } from "../../types";
export type PropsShipping = {
  methods: Shipping[];
  selected: Shipping;
  onChange: (m: Shipping) => void;
};
