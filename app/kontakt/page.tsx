import ContactInfo from "./components/contactInfo/contactInfo";
import ContactForm from "./components/contactForm/contactForm";
import Link from "next/link";
import styles from "./contactContainer.module.css";
export default function contactPage() {
  return (
    <div className="pageContainer">
      <section>
        <h1 className="pageTitle">Kontakt os</h1>

        <p className={`description ${styles.contactDescription}`}>
          Har du spørgsmål til et produkt, en ordre eller noget helt tredje som
          du ikke kan få svar på i vores{" "}
          <Link className="textLink" href="/faq">
            FAQ
          </Link>
          ?
        </p>
        <p className={`description ${styles.contactDescription}`}>
          Så er du altid velkommen til at kontakte os enten via nederstående
          kontaktformular, mail eller telefon.
        </p>
      </section>

      <section className={styles.contactContainer}>
        <div>
          <ContactForm />
        </div>

        <div>
          <ContactInfo />
        </div>
      </section>
    </div>
  );
}
