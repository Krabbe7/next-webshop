// import Image from "next/image";
// import Link from "next/link";
// import { Archivo_Black } from "next/font/google";
// import styles from "./heroSection.module.css";
// import { FaGamepad } from "react-icons/fa";

// const archivoBlack = Archivo_Black({
//   subsets: ["latin"],
//   weight: "400",
// });

// export default function HeroSection() {
//   return (
//     <div className={styles.heroContainer}>
//       <Image
//         src="/images/Landing_page/landing_page_hero_img.jpg"
//         alt="Hero"
//         fill
//         priority
//         className={styles.hero_img}
//       />
//       <div className={styles.heroTextCTAContainer}>
//         <h1 className={`${archivoBlack.className} ${styles.heroHeading}`}>
//           DIT NÆSTE SPIL <br />
//           <span>VENTER PÅ DIG</span>
//         </h1>
//         <div className={styles.heroText}>
//           <p>De nyeste spil. De bedste priser.</p>
//           <p>
//             Hurtig levering. <span>Klar til gaming!</span>
//           </p>
//         </div>
//         <button className={`button ${styles.CTAButton}`}>
//           <FaGamepad />
//           <Link href="/products">Se spil</Link>
//         </button>
//       </div>
//     </div>
//   );
// }
import Image from "next/image";
import Link from "next/link";
import { Archivo_Black } from "next/font/google";
import styles from "./heroSection.module.css";
import { FaGamepad } from "react-icons/fa";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
});

export default function HeroSection() {
  return (
    <div className={styles.heroContainer}>
      {/* Desktop billede */}
      <Image
        src="/images/Landing_page/landing_page_hero_img.jpg"
        alt="Pixelvault gaming"
        fill
        priority
        className={`${styles.hero_img} ${styles.desktopImage}`}
      />
      {/* tablet billede */}
      <Image
        src="/images/Landing_page/landing_page_hero_img_tablet.jpg"
        alt="Pixelvault gaming"
        fill
        priority
        className={`${styles.hero_img} ${styles.tabletImage}`}
      />

      {/* Mobil billede */}
      <Image
        src="/images/Landing_page/landing_page_hero_img_mobile.jpg"
        alt="Pixelvault gaming"
        fill
        priority
        className={`${styles.hero_img} ${styles.mobileImage}`}
      />

      <div className={styles.heroTextCTAContainer}>
        <h1 className={`${archivoBlack.className} ${styles.heroHeading}`}>
          DIT NÆSTE SPIL <br />
          <span>VENTER PÅ DIG</span>
        </h1>

        <div className={styles.heroText}>
          <p>De nyeste spil. De bedste priser.</p>

          <p>
            Hurtig levering. <span>Klar til gaming!</span>
          </p>
        </div>

        <button className={`button ${styles.CTAButton}`}>
          <FaGamepad />

          <Link href="/products">Se spil</Link>
        </button>
      </div>
    </div>
  );
}
