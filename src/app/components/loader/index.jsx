import Image from "next/image";
import style from "./Loader.module.css";

const Loader = ({ position = "fixed" }) => {
  return (
    <div className={style.loader} style={{ position: position }}>
      <Image width={100} height={100} src="/assets/infinite-spinner.svg" />
    </div>
  );
};
export default Loader;
