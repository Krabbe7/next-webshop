import Image from "next/image";
import styles from "./landingPage.module.css";

export default function Page() {
  return (
    <div className={styles.heroContainer}>
      <Image
        src="/images/Landing_page/landing_page_hero_img.jpg"
        alt="Hero"
        fill
        priority
        className={styles.hero_img}
      />
    </div>
  );
}
