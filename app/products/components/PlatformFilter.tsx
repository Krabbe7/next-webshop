import styles from "../products.module.css";
type Props = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

export default function PlatformFilter({ value, onChange, options }: Props) {
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
