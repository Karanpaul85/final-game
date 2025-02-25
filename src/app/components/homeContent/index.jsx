import style from "./Home.module.css";
const HomeContent = () => {
  return (
    <div className={style.homeContent}>
      <div className={style.heading}>Home Top Content</div>
      <div className={style.textAreaSection}>
        <textarea name="topContent"></textarea>
      </div>
      <div className={style.heading}>Home Footer Content</div>
      <div className={style.textAreaSection}>
        <textarea name="footerContent"></textarea>
      </div>
      <button className={style.saveBtn}>Save</button>
    </div>
  );
};
export default HomeContent;
