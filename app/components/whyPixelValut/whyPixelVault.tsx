import styles from "./whyPixelvault.module.css";
import { reasons } from "./reasons";

export default function WhyPixelvault() {
  return (
    <section className={styles.whyPixelvaultContainer}>
      <div className={styles.whyPixelvaultIntroText}>
        <h2 className="header">Hvorfor PIXELVAULT?</h2>

        <p className="description">
          Gaming skal være nemt. Vi gør det enkelt at finde spil og produkter,
          du rent faktisk har lyst til at spille.
        </p>
      </div>

      <div className={styles.grid}>
        {reasons.map((reason) => {
          const Icon = reason.icon;

          return (
            <article className={styles.card} key={reason.title}>
              <div className="icon">
                <Icon />
              </div>

              <h3 className="header">{reason.title}</h3>

              <p>{reason.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
