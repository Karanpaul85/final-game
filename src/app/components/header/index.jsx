"use client";
import Image from "next/image";
import style from "./Header.module.css";
import Link from "next/link";

const Header = ({ isMobile }) => {
  return (
    <header className={style.header}>
      <Link href="/">
        <Image
          src="/assets/logo.png"
          width={isMobile ? 200 : 300}
          height={isMobile ? 50 : 75}
          alt="logo"
          priority={true}
        />
      </Link>
    </header>
  );
};
export default Header;
