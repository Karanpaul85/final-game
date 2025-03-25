import style from "./WinnerCard.module.css";
const WinnerCard = ({ cardData }) => {
  return (
    <div className={style.card}>
      <p className={style.heading}>{cardData?.area}</p>
      <p className={style.time}>{cardData?.drawTime}</p>
      <p>
        Lucky Winner :- <span>{cardData?.luckyWinner}</span>
      </p>
      <p>
        Total Entries :- <span>{cardData?.totalEntries}</span>
      </p>
    </div>
  );
};
export default WinnerCard;
