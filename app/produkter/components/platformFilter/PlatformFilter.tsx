import styles from "../filter.module.css";
import { PropsPlatformFilter } from "./types";

export default function PlatformFilter({
  value,
  onChange,
  options,
}: PropsPlatformFilter) {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Alle platforme</option>

      {options.map((p) => (
        <option key={p} value={p}>
          {p}
        </option>
      ))}
    </select>
  );
}
