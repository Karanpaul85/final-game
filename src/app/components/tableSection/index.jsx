import style from "./TableSection.module.css";
const TableSection = ({ data, areaData }) => {
  return (
    <div className={style.tableSection}>
      <table className={style.customers}>
        <thead>
          <tr>
            <th>Date</th>
            {areaData.length > 0 &&
              areaData.map((item) => <th key={item.areaId}>{item.area}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item) => (
              <tr key={item.date}>
                <td>{item.date}</td>
                {areaData.map((area) => {
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
