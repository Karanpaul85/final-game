import WinnerCard from "../winnerCard";
import style from "./Winner.module.css";

const WinnerList = ({ data }) => {
  return (
    <div className={style.winnerSection}>
      <h2>Lucky Winner</h2>
      <div className={style.winnerCards}>
        {data?.data?.results?.length > 0 &&
          data?.data?.results?.map(
            (item) =>
              item.luckyWinner !== "" && (
                <WinnerCard
                  cardData={item}
                  key={item.areaId}
                  date={data.data.date}
                />
              )
          )}
      </div>
    </div>
  );
};
export default WinnerList;
