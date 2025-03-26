"use client";
import style from "./Search.module.css";
import { useState } from "react";
import { months } from "@/app/utils/constants";
import { getLastFiveYears } from "@/app/utils/common";
import { useRouter } from "next/navigation";

const SearchSection = ({
  customCss,
  selectedMonth,
  selectedYear,
  areaData = [],
}) => {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [selectedValues, setSelectedValues] = useState({
    year: selectedYear || "",
    month: selectedMonth || "",
  });

  const formattedAreas = areaData
    ?.map((area) => area.area)
    .join(", ")
    .replace(/,([^,]*)$/, " and$1");

  const onchange = (e) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      (selectedValues.year === "" && selectedValues.month === "") ||
      selectedValues.year === "" ||
      selectedValues.month === ""
    ) {
      setIsError(true);
      return;
    }
    router.push(
      `/search/${selectedValues.month.toLowerCase()}/${selectedValues.year}`
    );
  };

  return (
    <div className={`${style.searchSection} ${customCss ? customCss : ""}`}>
      <p className={style.message}>
        Yahan Aap Month Aur Year Select karke {formattedAreas} Ka Combined Chart
        Dekh Sakte Hai.
      </p>
      <form onSubmit={onSubmit}>
        <div className={style.dropDownSec}>
          <select
            id="year"
            onChange={onchange}
            name="year"
            value={selectedValues.year}
            aria-label="Select Year"
          >
            {getLastFiveYears().map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={style.dropDownSec}>
          <select
            id="month"
            onChange={onchange}
            name="month"
            value={selectedValues.month}
            aria-label="Select Month"
          >
            {months.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={style.dropDownSec}>
          <button id="search" type="submit">
            Go
          </button>
        </div>
      </form>
      {isError && (
        <div className={style.error}>Please select year and month</div>
      )}
    </div>
  );
};
export default SearchSection;
