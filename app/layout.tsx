import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Alterion – Zonnepanelen & Energieoplossingen",
  description: "Alterion levert professionele zonnepanelen en duurzame energieoplossingen voor particulieren en bedrijven in de regio Amsterdam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Icon fonts use display=block on purpose: with swap/optional the raw
            ligature text (e.g. "home") flashes before the glyph loads. See the
            .icons-loaded CSS guard in globals.css for the fallback. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=block"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                function markLoaded(){document.documentElement.classList.add('icons-loaded');}
                if(document.fonts && document.fonts.ready){
                  Promise.race([
                    Promise.all([
                      document.fonts.load('24px "Material Symbols Outlined"'),
                      document.fonts.load('24px "Material Icons"')
                    ]),
                    new Promise(function(r){setTimeout(r, 3000);})
                  ]).then(markLoaded).catch(markLoaded);
                } else {
                  setTimeout(markLoaded, 500);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Header />
          <main className="flex-1 pt-28">{children}</main>
          <Footer />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
