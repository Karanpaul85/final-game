import WinnerCard from "../winnerCard";
import style from "./Winner.module.css";

const WinnerList = ({ data }) => {
  return (
    <div className={style.winnerSection}>
      <h2>Today's Lucky Winner</h2>
      <div className={style.winnerCards}>
        {data?.data?.results?.length > 0 &&
          data?.data?.results?.map(
            (item) =>
              item.luckyWinner !== "" && (
                <WinnerCard cardData={item} key={item.areaId} />
              )
          )}
      </div>
    </div>
  );
};
export default WinnerList;
