import styles from "./searchBar.module.css";
import { PropsSearchBar } from "./types";

export default function SearchBar({ value, onChange }: PropsSearchBar) {
  return (
    <input
      className={`input ${styles.searchInput}`}
      type="search"
      placeholder="Søg efter spil..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
