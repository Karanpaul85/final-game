import Image from "next/image";
import style from "./Header.module.css";
const Header = () => {
  return (
    <header className={style.header}>
      <Image src="/assets/logo.png" width={146} height={114} alt="logo" />
    </header>
  );
};
export default Header;
