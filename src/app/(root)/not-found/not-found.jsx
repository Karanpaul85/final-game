import Image from "next/image";
import style from "./NotFound.module.css";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className={style.notFoundContainer}>
      <Image
        src="/assets/notFound.svg"
        width={750}
        height={500}
        alt="oops not found"
      />
      <Link href="/" className={style.gotohome}>
        Go To Home
      </Link>
    </div>
  );
};
export default NotFound;
