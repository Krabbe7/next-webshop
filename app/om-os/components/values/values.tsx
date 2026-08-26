import styles from "./values.module.css";

import valueItems from "./valueItems";

export default function Values() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>VORES VÆRDIER</p>

        <h2 className="header">Det står vi for</h2>
      </div>

      <div className={styles.grid}>
        {valueItems.map((valueItem) => (
          <article className={styles.card} key={valueItem.title}>
            <div className={styles.icon}>
              <valueItem.icon />
            </div>

            <h3>{valueItem.title}</h3>

            <p>{valueItem.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
