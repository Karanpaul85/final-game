import Image from "next/image";
import style from "./Announcement.module.css";

const Announcement = () => {
  return (
    <div className={style.announcement}>
      <Image
        src="/assets/social-media-marketing.png"
        alt="Announcement"
        width={512}
        height={512}
        priority={true}
      />
      <div className={style.message}>
        We will announce today's winners shortly
      </div>
    </div>
  );
};
export default Announcement;
