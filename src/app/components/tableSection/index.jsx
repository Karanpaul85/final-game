import style from "./TableSection.module.css";
const TableSection = ({ data }) => {
  console.log(data, "data");
  return (
    <div className={style.tableSection}>
      <table className={style.customers}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Shalimar</th>
            <th>Gali</th>
            <th>Shalimar Light</th>
            <th>Gaziyabad</th>
            <th>Area1</th>
            <th>Area2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>20-02-25</td>
            <td>25</td>
            <td>20</td>
            <td>02</td>
            <td>25</td>
            <td>20</td>
            <td>02</td>
          </tr>
          <tr>
            <td>20-02-25</td>
            <td>25</td>
            <td>20</td>
            <td>02</td>
            <td>25</td>
            <td>20</td>
            <td>02</td>
          </tr>
          <tr>
            <td>20-02-25</td>
            <td>25</td>
            <td>20</td>
            <td>02</td>
            <td>25</td>
            <td>20</td>
            <td>02</td>
          </tr>
          <tr>
            <td>20-02-25</td>
            <td>25</td>
            <td>20</td>
            <td>02</td>
            <td>25</td>
            <td>20</td>
            <td>02</td>
          </tr>
          <tr>
            <td>20-02-25</td>
            <td>25</td>
            <td>20</td>
            <td>02</td>
            <td>25</td>
            <td>20</td>
            <td>02</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default TableSection;
