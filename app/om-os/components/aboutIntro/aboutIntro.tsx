import styles from "./aboutIntro.module.css";

export default function AboutIntro() {
  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>PIXELVAULT</p>

      <h2 className="header">Om Pixelvault</h2>

      <p className="description">
        Pixelvault er din destination for gaming, gode oplevelser og nye
        favoritter. Vi gør det nemt at gå på opdagelse blandt spil på tværs af
        genrer og platforme.
      </p>
    </section>
  );
}
