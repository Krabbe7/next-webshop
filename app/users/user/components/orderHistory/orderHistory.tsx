"use client";

import Image from "next/image";
import { FiPackage, FiCalendar, FiTruck, FiCheckCircle } from "react-icons/fi";
import { useState } from "react";
import { useOrderHistory } from "../../hooks/orderHistoryHook/useOrderHistory";
import styles from "./orderHistory.module.css";

export default function OrderHistory() {
  const { orders, loading } = useOrderHistory();
  const [visibleOrders, setVisibleOrders] = useState(3);

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
      <h2 className={styles.orderHistoryTitle}>Ordrehistorik</h2>

      {orders.slice(0, visibleOrders).map((order) => (
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
      {orders.length > visibleOrders && (
        <button
          className={styles.showMoreButton}
          onClick={() => setVisibleOrders((prev) => prev + 3)}
        >
          Vis ældre ordrer
        </button>
      )}
    </section>
  );
}
