import styles from "../../products.module.css";
import { PropsSearchBar } from "./types";

export default function SearchBar({ value, onChange }: PropsSearchBar) {
  return (
    <input
      className={styles.searchInput}
      type="search"
      placeholder="Søg efter spil..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
