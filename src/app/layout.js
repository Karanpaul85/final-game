import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { getRequestInfo } from "./utils/getRequestInfo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const { isMobile } = getRequestInfo();
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Header isMobile={isMobile} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
