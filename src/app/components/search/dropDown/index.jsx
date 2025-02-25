import style from "./DropDown.module.css";
const DropDown = ({ isShow, itemList, fun, selected }) => {
  return (
    <ul className={`${style.dropDownList} ${isShow ? style.show : ""}`}>
      {itemList.map((item, index) => (
        <li
          onClick={() => fun(item)}
          key={index}
          className={String(item) === String(selected) ? style.active : ""}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
export default DropDown;
