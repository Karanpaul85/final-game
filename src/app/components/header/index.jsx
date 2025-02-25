import Image from "next/image";
import style from "./Header.module.css";
import Link from "next/link";

const Header = ({ isMobile }) => {
  return (
    <header className={style.header}>
      <Link href="/">
        <Image
          src="/assets/logo.png"
          width={isMobile ? 92 : 146}
          height={isMobile ? 72 : 114}
          alt="logo"
        />
      </Link>
    </header>
  );
};
export default Header;
