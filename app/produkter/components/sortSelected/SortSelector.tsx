import type { SortOption } from "./types";
import styles from "../filter.module.css";
import { PropsSortSelected } from "./types";

export default function SortSelector({ value, onChange }: PropsSortSelected) {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
    >
      <option value="">Ingen sortering</option>

      <option value="title">Navn A-Å</option>

      <option value="price-low">Pris lav-høj</option>

      <option value="price-high">Pris høj-lav</option>
    </select>
  );
}
