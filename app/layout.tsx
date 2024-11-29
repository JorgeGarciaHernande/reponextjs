import type { Metadata } from "next";
import "./globals.css";
import "./layout.css"; // Importamos el archivo layout.css

export const metadata: Metadata = {
  title: "Gestión de Notas de Jorge",
  description: "Plataforma para gestión de notas de Jorge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="layout-container">
        <header className="header">
          Gestión de Notas de Jorge
        </header>

        <main className="main-content">{children}</main>

        <footer className="footer">
          © 2024 Gestión de Notas - Todos los derechos reservados
        </footer>
      </body>
    </html>
  );
}
