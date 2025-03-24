import style from "./TableSection.module.css";
const TableSection = ({ data, areaData }) => {
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
                <td>{item.date.split("-")[0]}</td>
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
    </div>
  );
};
export default TableSection;
