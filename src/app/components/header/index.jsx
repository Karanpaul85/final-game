import Image from "next/image";
import style from "./Header.module.css";
import Link from "next/link";
const Header = () => {
  return (
    <header className={style.header}>
      <Link href="/">
        <Image src="/assets/logo.png" width={146} height={114} alt="logo" />
      </Link>
    </header>
  );
};
export default Header;
