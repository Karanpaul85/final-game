import style from "./WinnerCard.module.css";
const WinnerCard = ({ cardData, date }) => {
  return (
    <div className={style.card}>
      <p className={style.heading}>{cardData?.area}</p>
      <p className={style.time}>{`${date} - ${cardData?.drawTime}`}</p>
      <p className={style.winner}>
        Lucky Winner :- <span>{cardData?.luckyWinner}</span>
      </p>
      <p className={style.winner}>
        Total Entries :- <span>{cardData?.totalEntries}</span>
      </p>
    </div>
  );
};
export default WinnerCard;
