import styles from "../products.module.css";
type Props = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

export default function GenreFilter({ value, onChange, options }: Props) {
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
