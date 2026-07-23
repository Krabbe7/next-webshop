import "./globals.css";
import NavBar from "./components/navBar/navbar-component";
import Footer from "./components/footer/footer-component";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
