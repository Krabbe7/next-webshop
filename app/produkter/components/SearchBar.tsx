import styles from "../products.module.css";
type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
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
