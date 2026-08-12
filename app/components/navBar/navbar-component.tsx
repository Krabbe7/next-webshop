"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";
import styles from "./navBar.module.css";

export default function NavBar() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/user", {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener("authChanged", loadUser);

    return () => {
      window.removeEventListener("authChanged", loadUser);
    };
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cartKey = user ? `cart_${user.id}` : "cart_guest";

      const raw = localStorage.getItem(cartKey);

      console.log("========== NAVBAR ==========");
      console.log("user:", user);
      console.log("cartKey:", cartKey);
      console.log("raw localStorage:", raw);

      const cart = JSON.parse(raw || "[]");

      console.log("cart:", cart);

      const total = cart.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0,
      );

      console.log("total:", total);

      setCartCount(total);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, [user]);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setOpen(false);
    setMenuOpen(false);
    setCartCount(0);

    window.dispatchEvent(new Event("authChanged"));
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <img
          className={styles.logo}
          src="/images/logo/Pixelvault-logo.svg"
          alt="PIXELVAULT logo"
        />
      </Link>

      <ul
        className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}
      >
        <li>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>

        <li
          className={styles.productsDropdown}
          onMouseEnter={() => {
            if (window.innerWidth > 850) {
              setProductsOpen(true);
            }
          }}
          onMouseLeave={() => {
            if (window.innerWidth > 650) {
              setProductsOpen(false);
            }
          }}
        >
          <button
            className={styles.productsButton}
            onClick={() => setProductsOpen((prev) => !prev)}
          >
            Produkter
            <FaChevronDown
              className={`${styles.chevron} ${
                productsOpen ? styles.chevronOpen : ""
              }`}
            />
          </button>

          {productsOpen && (
            <ul className={styles.productsMenu}>
              <li>
                <Link
                  href="/produkter/spil"
                  onClick={() => {
                    setProductsOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Spil
                </Link>
              </li>

              <li>
                <Link
                  href="/produkter/kategori2"
                  onClick={() => {
                    setProductsOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Kategori 2
                </Link>
              </li>
            </ul>
          )}
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
