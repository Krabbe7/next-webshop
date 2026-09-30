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

      {options.map((genre) => (
        <option key={genre.id} value={genre.name}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}
