"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setOpen(false);
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link href="/">Game Store</Link>
      <ul className="nav-links">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Produkter</a>
        </li>
        <li>
          <a href="#">Kategorier</a>
        </li>
        <li>
          <a href="#">Om os</a>
        </li>
        <li>
          <a href="#">Kontakt</a>
        </li>
      </ul>
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {!user ? (
          <Link href="/login">Login</Link>
        ) : (
          <>
            <span style={{ cursor: "pointer" }}>👤</span>

            {open && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  background: "white",
                  border: "1px solid #ccc",
                  padding: "1rem",
                  minWidth: "150px",
                  zIndex: 1000,
                }}
              >
                <p>Hej {user.username}</p>

                <button onClick={handleLogout}>Log ud</button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
