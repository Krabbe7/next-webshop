"use client";

import Image from "next/image";
import { FiPackage, FiCalendar, FiTruck, FiCheckCircle } from "react-icons/fi";

import { useOrders } from "../hooks/useOrders";
import styles from "./orderHistory.module.css";

export default function OrderHistory() {
  const { orders, loading } = useOrders();

  if (loading) {
    return <div className={styles.loading}>Indlæser...</div>;
  }

  if (orders.length === 0) {
    return (
      <section className={styles.container}>
        <h2 className={styles.title}>Ordrehistorik</h2>

        <div className={styles.empty}>Du har ingen tidligere ordrer.</div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Ordrehistorik</h2>

      {orders.map((order) => (
        <article key={order.id} className={styles.orderCard}>
          <div className={styles.orderHeader}>
            <div className={styles.left}>
              <h3 className={styles.orderNumber}>
                <FiPackage />
                Ordre #{order.id}
              </h3>

              <p className={styles.info}>
                <FiCalendar />
                {new Date(order.created_at).toLocaleDateString("da-DK")}
              </p>

              <span className={styles.info}>
                <FiTruck />
                {order.pickup_point_name && (
                  <div>
                    <p>{order.pickup_point_name}</p>
                    <p>{order.pickup_point_address}</p>
                  </div>
                )}
              </span>
            </div>

            <div className={styles.right}>
              <span className={styles.status}>
                <FiCheckCircle />
                Leveret
              </span>

              <p className={styles.total}>{order.total_price} kr.</p>
            </div>
          </div>

          <div className={styles.items}>
            {order.items.map((item) => (
              <div key={item.gameId} className={styles.item}>
                <div className={styles.product}>
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={60}
                    height={80}
                    className={styles.image}
                  />

                  <div>
                    <p className={styles.productTitle}>{item.title}</p>

                    <p className={styles.quantity}>Antal: {item.quantity}</p>
                  </div>
                </div>

                <p className={styles.price}>{item.price} kr.</p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
