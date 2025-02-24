"use client";
import SearchIcon from "@mui/icons-material/Search";
import style from "./Search.module.css";
import { useState } from "react";

const Search = () => {
  const [isShowDropDown, setIsShowDropDown] = useState({
    year: false,
    month: false,
  });
  const showYears = () => {
    setIsShowDropDown((prevState) => ({
      ...prevState,
      year: true,
      month: false,
    }));
  };
  const showMonths = () => {
    setIsShowDropDown((prevState) => ({
      ...prevState,
      year: false,
      month: true,
    }));
  };

  return (
    <div className={style.searchSection}>
      <form>
        <div className={style.dropDownSec}>
          <button type="button" id="year" onClick={showYears}>
            Year
          </button>
          <ul className={isShowDropDown.year ? style.show : ""}>
            <li>2019</li>
            <li>2020</li>
            <li>2021</li>
            <li>2022</li>
            <li>2023</li>
            <li>2024</li>
            <li>2025</li>
          </ul>
        </div>
        <div className={style.dropDownSec}>
          <button type="button" id="month" onClick={showMonths}>
            Month
          </button>
          <ul className={isShowDropDown.month ? style.show : ""}>
            <li>January</li>
            <li>February</li>
            <li>March</li>
            <li>April</li>
            <li>May</li>
            <li>June</li>
            <li>August</li>
            <li>September</li>
            <li>October</li>
            <li>November</li>
            <li>December</li>
          </ul>
        </div>
        <button id="search" type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};
export default Search;
