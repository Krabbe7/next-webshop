"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

import styles from "./navBar.module.css";

import { useLoadUser } from "./hooks/useLoadUser";
import { useUpdateCartCount } from "./hooks/useUpdateCartCount";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navLinkDropDownOpen, setNavLinkDropDownOpen] = useState(false);

  const { user, setUser } = useLoadUser();

  const { cartCount, setCartCount } = useUpdateCartCount(user);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      setOpen(false);
      setMenuOpen(false);
      setCartCount(0);

      window.dispatchEvent(new Event("authChanged"));
    } catch (error) {
      console.error("Kunne ikke logge ud:", error);
    }
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
            Hjem
          </Link>
        </li>

        <li
          className={styles.navLinkDropDown}
          onMouseEnter={() => {
            if (window.innerWidth > 850) {
              setNavLinkDropDownOpen(true);
            }
          }}
          onMouseLeave={() => {
            if (window.innerWidth > 850) {
              setNavLinkDropDownOpen(false);
            }
          }}
        >
          <button
            className={`${styles.navLinkButton} ${
              navLinkDropDownOpen ? styles.navLinkButtonOpen : ""
            }`}
            onClick={() => setNavLinkDropDownOpen((prev) => !prev)}
          >
            Produkter
            <FaChevronDown
              className={`${styles.chevron} ${
                navLinkDropDownOpen ? styles.chevronOpen : ""
              }`}
            />
          </button>

          {navLinkDropDownOpen && (
            <ul className={styles.navLinkDropDownMenu}>
              <li>
                <Link
                  href="/produkter/spil"
                  onClick={() => {
                    setNavLinkDropDownOpen(false);
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
                    setNavLinkDropDownOpen(false);
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
          <Link href="/om-os" onClick={() => setMenuOpen(false)}>
            Om os
          </Link>
        </li>

        <li>
          <Link href="/kontakt" onClick={() => setMenuOpen(false)}>
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
        <Link href="/kurv" className={styles.cartLink}>
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
              <div className={styles.dropDown}>
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
