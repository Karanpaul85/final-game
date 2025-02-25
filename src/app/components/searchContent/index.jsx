import style from "./Search.module.css";
const SearchContent = () => {
  return (
    <div className={style.homeContent}>
      <div className={style.heading}>Search Top Content</div>
      <div className={style.textAreaSection}>
        <textarea name="topContent"></textarea>
      </div>
      <div className={style.heading}>Search Footer Content</div>
      <div className={style.textAreaSection}>
        <textarea name="footerContent"></textarea>
      </div>
      <button className={style.saveBtn}>Save</button>
    </div>
  );
};
export default SearchContent;
