import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar2 from "./components/shared/Navbar2";
import Footer from "./components/shared/Footer";
import { CartProvider } from "./context/CartContext";
import ErrorBoundary from './components/ErrorBoundary';
import { NextAuthProvider } from "./providers/NextAuthProvider";
import { Toaster } from 'react-hot-toast';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'KarachiKart',
  description: 'Your One-Stop Shop',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col overflow-x-hidden`}>
        <ErrorBoundary>
          <NextAuthProvider>
            <WishlistProvider>
              <CompareProvider>
                <CartProvider>
                 <Navbar2 />
                  <Toaster position="top-right" />
                  <main className="flex-grow min-h-screen">
                    {children}
                  </main>
                  <Footer />
                </CartProvider>
              </CompareProvider>
            </WishlistProvider>
          </NextAuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
