export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">Shopnavn</div>

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

      <div className="nav-icons">
        <a href="#">👤</a>
      </div>
    </nav>
  );
}
