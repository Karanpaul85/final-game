import WinnerCard from "../winnerCard";
import style from "./Winner.module.css";

const WinnerList = () => {
  return (
    <div className={style.winnerSection}>
      <h2>Today's Lucky Winner</h2>
      <div className={style.winnerCards}>
        <WinnerCard />
        <WinnerCard />
        <WinnerCard />
        <WinnerCard />
        <WinnerCard />
        <WinnerCard />
      </div>
    </div>
  );
};
export default WinnerList;
