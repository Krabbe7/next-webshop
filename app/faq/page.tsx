"use client";

import { questions } from "./faqList";
import { useState } from "react";
import styles from "./faq.module.css";

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="pageContainer">
      <section className={styles.section}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>FAQ</p>

          <h2 className="header">Ofte stillede spørgsmål</h2>
        </div>

        <div className={styles.list}>
          {questions.map((item, index) => (
            <div className={styles.item} key={item.question}>
              <button
                className={styles.question}
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span>{item.question}</span>

                <span className={styles.icon}>
                  {open === index ? "−" : "+"}
                </span>
              </button>

              {open === index && <p className={styles.answer}>{item.answer}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
