import style from "./DropDown.module.css";
const DropDown = ({ isShow, itemList, fun }) => {
  return (
    <ul className={`${style.dropDownList} ${isShow ? style.show : ""}`}>
      {itemList.map((item, index) => (
        <li onClick={() => fun(item)} key={index}>
          {item}
        </li>
      ))}
    </ul>
  );
};
export default DropDown;
