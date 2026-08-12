import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand */}
        <div className={styles.column}>
          <img
            className={styles.logo}
            src="/images/logo/Pixelvault-logo-text-white.svg"
            alt="PIXELVAULT logo text white"
          />

          <p className={styles.description}>
            Din webshop til nye og gamle spil til PlayStation, Xbox, Nintendo og
            PC.
          </p>

          <div className={styles.socials}>
            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.column}>
          <h3>Navigation</h3>

          <Link href="/">Forside</Link>
          <Link href="/products">Produkter</Link>
          <Link href="/about">Om os</Link>
          <Link href="/contact">Kontakt</Link>
        </div>

        {/* Kundeservice */}
        <div className={styles.column}>
          <h3>Kundeservice</h3>

          <Link href="/faq">FAQ</Link>
          <Link href="/terms">Handelsbetingelser</Link>
          <Link href="/privacy">Privatlivspolitik</Link>
        </div>

        {/* Kontakt */}
        <div className={styles.column}>
          <h3>Kontakt</h3>

          <p>
            <FaMapMarkerAlt /> Aalborg, Danmark
          </p>

          <p>
            <FaEnvelope /> kontakt@pixelvault.dk
          </p>

          <p>
            <FaPhoneAlt /> +45 12 34 56 78
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} Game Store. Alle rettigheder forbeholdes.
      </div>
    </footer>
  );
}
