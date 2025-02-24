import style from "./WinnerCard.module.css";
const WinnerCard = () => {
  return (
    <div className={style.card}>
      <h4>Shalimar Savera</h4>
      <p className={style.time}>12:15 PM</p>
      <p>
        Lucky Winner :- <span>35</span>
      </p>
      <p>
        Total Entries :- <span>95</span>
      </p>
    </div>
  );
};
export default WinnerCard;
