import style from "./WinnerCard.module.css";
const WinnerCard = ({ cardData }) => {
  return (
    <div className={style.card}>
      <h4>{cardData?.area}</h4>
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
