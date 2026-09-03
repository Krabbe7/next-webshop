import type { ErrorMessageProps } from "./types";
import styles from "./errorMessage.module.css";

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) {
    return null;
  }

  return <p className={styles.errorMessage}>{message}</p>;
}
