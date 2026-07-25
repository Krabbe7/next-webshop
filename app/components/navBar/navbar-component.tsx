"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { FaBars, FaTimes, FaShoppingCart, FaUserCircle } from "react-icons/fa";

import styles from "./navBar.module.css";

export default function NavBar() {
  const [user, setUser] = useState<any>(null);

  const [open, setOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    const updateCartCount = () => {
      const user = JSON.parse(localStorage.getItem("user") || "null");

      const cartKey = user ? `cart_${user.id}` : "cart_guest";

      const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

      const totalItems = cart.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0,
      );

      setCartCount(totalItems);
    };

    loadUser();

    updateCartCount();

    window.addEventListener("authChanged", loadUser);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("authChanged", loadUser);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setOpen(false);
    setMenuOpen(false);
    setCartCount(0);

    window.dispatchEvent(new Event("authChanged"));
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        Game Store
      </Link>

      <ul
        className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}
      >
        <li>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>

        <li>
          <Link href="/products" onClick={() => setMenuOpen(false)}>
            Produkter
          </Link>
        </li>

        <li>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Kategorier
          </Link>
        </li>

        <li>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Om os
          </Link>
        </li>

        <li>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Kontakt
          </Link>
        </li>

        {user?.role === "admin" && (
          <li>
            <Link href="/admin" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          </li>
        )}
      </ul>

      <div className={styles.navActions}>
        <Link href="/cart" className={styles.cartLink}>
          <FaShoppingCart className={styles.cartIcon} />

          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </Link>

        {!user ? (
          <Link href="/login" className={styles.loginButton}>
            Login
          </Link>
        ) : (
          <div
            className={styles.profileWrapper}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <FaUserCircle className={styles.profileIcon} />

            {open && (
              <div className={styles.dropdown}>
                <p className={styles.username}>Hej {user.username}</p>

                <p className={styles.role}>{user.role}</p>

                {user.role === "admin" && (
                  <Link href="/admin" className={styles.adminLink}>
                    Admin Panel
                  </Link>
                )}
                {user.role === "user" && (
                  <Link href="/users/user" className={styles.adminLink}>
                    Min side
                  </Link>
                )}

                <button onClick={handleLogout} className={styles.logoutButton}>
                  Log ud
                </button>
              </div>
            )}
          </div>
        )}

        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}
