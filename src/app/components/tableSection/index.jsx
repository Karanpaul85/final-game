import { months } from "@/app/utils/constants";
import style from "./TableSection.module.css";
import Link from "next/link";
const TableSection = ({ data, areaData, selectedMonth, selectedYear }) => {
  const currentMonthIndex = months.findIndex(
    (month) => month === selectedMonth
  );

  const nextMonth = `/search/${
    currentMonthIndex === 11
      ? months[currentMonthIndex - 11]
      : months[currentMonthIndex + 1]
  }/${currentMonthIndex === 11 ? Number(selectedYear) + 1 : selectedYear}`;

  const prevMonth = `/search/${
    currentMonthIndex === 0
      ? months[currentMonthIndex + 11]
      : months[currentMonthIndex - 1]
  }/${currentMonthIndex === 0 ? Number(selectedYear) - 1 : selectedYear}`;

  return (
    <div className={style.tableSection}>
      <table className={style.customers}>
        <thead>
          <tr>
            <th>Date</th>
            {areaData.length > 0 &&
              areaData.map(
                (item, index) =>
                  index <= 3 && <th key={item.areaId}>{item.area}</th>
              )}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item) => (
              <tr key={item.date}>
                <td style={{ color: "#f00" }}>{item.date.split("-")[0]}</td>
                {areaData.map((area, index) => {
                  if (index > 3) return;
                  const result = item.results.find(
                    (res) => res.areaId === area.areaId
                  );
                  return (
                    <td key={area.areaId}>
                      {result
                        ? result?.luckyWinner !== ""
                          ? result?.luckyWinner
                          : "XX"
                        : "XXX"}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
      <div className={style.prevNextMonth}>
        <Link href={prevMonth}>{`${
          currentMonthIndex === 0
            ? months[currentMonthIndex + 11]
            : months[currentMonthIndex - 1]
        } ${
          currentMonthIndex === 0 ? Number(selectedYear) - 1 : selectedYear
        }`}</Link>
        <Link href={nextMonth}>
          {`${
            currentMonthIndex === 11
              ? months[currentMonthIndex - 11]
              : months[currentMonthIndex + 1]
          } 
          ${currentMonthIndex === 11 ? Number(selectedYear) + 1 : selectedYear}
          `}
        </Link>
      </div>
    </div>
  );
};
export default TableSection;
