import styles from "../filter.module.css";
import { PropsGenreFilter } from "./types";

export default function GenreFilter({
  value,
  onChange,
  options,
}: PropsGenreFilter) {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Alle genrer</option>

      {options.map((g) => (
        <option key={g} value={g}>
          {g}
        </option>
      ))}
    </select>
  );
}
