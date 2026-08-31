import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

import styles from "./contactInfo.module.css";

export default function ContactInfo() {
  return (
    <section className={styles.card}>
      <h2>Find os</h2>

      <div className={styles.info}>
        <div>
          <span className="icon">
            <FaEnvelope />
          </span>

          <div>
            <h3>Email</h3>
            <p>support@pixelvault.dk</p>
          </div>
        </div>

        <div>
          <span className="icon">
            <FaPhone />
          </span>

          <div>
            <h3>Telefon</h3>
            <p>+45 12 34 56 78</p>
          </div>
        </div>

        <div>
          <span className="icon">
            <FaMapMarkerAlt />
          </span>

          <div>
            <h3>Adresse</h3>
            <p>
              PIXELVAULT
              <br />
              Gamingvej 42
              <br />
              9000 Aalborg
            </p>
          </div>
        </div>

        <div>
          <span className="icon">
            <FaClock />
          </span>

          <div>
            <h3>Åbningstider</h3>
            <p>
              Mandag – fredag: 09:00 – 17:00
              <br />
              Lørdag – søndag: 10:00 – 15:00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
