"use client";
import SearchIcon from "@mui/icons-material/Search";
import style from "./Search.module.css";
import { useEffect, useRef, useState } from "react";
import DropDown from "./dropDown";
import { months } from "@/app/utils/constants";
import { getLastFiveYears } from "@/app/utils/common";

const Search = () => {
  const formRef = useRef();
  const [selectedValues, setSelectedValues] = useState({
    year: "",
    month: "",
  });
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

  const selectYear = (year) => {
    setSelectedValues((prevState) => ({ ...prevState, year: year }));
    setIsShowDropDown({ year: false, month: false });
  };

  const selectMonth = (month) => {
    setSelectedValues((prevState) => ({ ...prevState, month: month }));
    setIsShowDropDown({ year: false, month: false });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(selectedValues);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsShowDropDown({ year: false, month: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={style.searchSection}>
      <form ref={formRef} onSubmit={onSubmit}>
        <div className={style.dropDownSec}>
          <button type="button" id="year" onClick={showYears}>
            {selectedValues.year !== "" ? selectedValues.year : "Year"}
          </button>
          <DropDown
            isShow={isShowDropDown.year}
            itemList={getLastFiveYears()}
            fun={selectYear}
          />
        </div>
        <div className={style.dropDownSec}>
          <button type="button" id="month" onClick={showMonths}>
            {selectedValues.month !== "" ? selectedValues.month : "Month"}
          </button>
          <DropDown
            isShow={isShowDropDown.month}
            itemList={months}
            fun={selectMonth}
          />
        </div>
        <button id="search" type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};
export default Search;
