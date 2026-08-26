import styles from "./ourStory.module.css";

export default function OurStory() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>VORES HISTORIE</p>

        <h2 className="header">Fra gamer til gamingbutik</h2>

        <p className="description">
          Pixelvault startede med en simpel idé: Gaming skal være for alle.
          Derfor har vi skabt en webshop, hvor det er nemt at gå på opdagelse
          blandt forskellige spil og finde noget nyt at spille.
        </p>

        <p className="description">
          Vi ønsker at samle et udvalg af spil på tværs af genrer og platforme,
          så både nye og erfarne gamere kan finde deres næste favorit.
        </p>
      </div>

      <div className={styles.timeline}>
        <div className={styles.timelineItem}>
          <span className={styles.year}>2022</span>
          <h3 className="header">Idéen opstår</h3>
          <p>De første tanker bag Pixelvault bliver til.</p>
        </div>

        <div className={styles.timelineItem}>
          <span className={styles.year}>2023</span>
          <h3 className="header">De første produkter</h3>
          <p>Pixelvaults udvalg begynder at tage form.</p>
        </div>

        <div className={styles.timelineItem}>
          <span className={styles.year}>2024</span>
          <h3 className="header">Flere kategorier</h3>
          <p>Udvalget vokser med flere genrer og platforme.</p>
        </div>

        <div className={styles.timelineItem}>
          <span className={styles.year}>I dag</span>
          <h3 className="header">Pixelvault</h3>
          <p>En moderne gaming-webshop for alle typer gamere.</p>
        </div>
      </div>
    </section>
  );
}
