import Image from "next/image";
import Link from "next/link";
import style from "./NotFound.module.css";

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
