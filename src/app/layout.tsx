import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Nuestro Matrimonio - Juan & María",
  description: "Información sobre nuestro día especial. Ceremonia, fiesta, código de vestimenta y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}

