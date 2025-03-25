import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { getRequestInfo } from "./utils/getRequestInfo";
import axios from "axios";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {
  const API_BASE_URL =
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_URL // Local API during development
      : process.env.PROD_URL; // Production API

  const { isMobile } = getRequestInfo();

  let footerContent = "";
  try {
    footerContent = await axios.get(`${API_BASE_URL}/api/footerContent`);
  } catch (error) {}
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Header isMobile={isMobile} />
        {children}
        <Footer content={footerContent?.data?.data?.content} />
      </body>
    </html>
  );
}
