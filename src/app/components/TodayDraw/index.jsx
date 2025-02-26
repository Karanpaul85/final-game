"use client";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import style from "./Today.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { currentDate, getCurrentTime, removeSpace } from "@/app/utils/common";
import axios from "axios";

const TodayDraw = () => {
  const [areas, setAreas] = useState([]);
  const [allAreas, setAllAreas] = useState(null);
  const [todayData, setTodayData] = useState(null);

  const { day, month, year } = currentDate();
  // console.log(day, month, year, "day, month, year ");

  // Function to add a new area row
  const addArea = () => {
    setAreas([
      ...areas,
      {
        id: areas.length + 1,
        area: "",
        areaId: "",
        winner: "",
        entries: "",
        isNew: true,
      },
    ]);
  };

  // Function to delete a newly added area
  const deleteArea = (id) => {
    setAreas(areas.filter((item) => item.id !== id));
  };

  // Function to handle input change
  const handleChange = (id, field, value) => {
    setAreas(
      areas.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  //convert Area value into areaId
  const convertAreaId = (id, value) => {
    const areaId = removeSpace(value);
    setAreas(
      areas.map((item) => (item.id === id ? { ...item, areaId: areaId } : item))
    );
  };

  // Function to handle form submission
  const handleSave = async (e) => {
    e.preventDefault();
    const resultToSave = {
      date: day,
      month,
      year,
      results: areas.map((item) => ({
        area: item.area,
        areaId: item.areaId,
        winner: item.winner,
        entries: item.entries,
        ...(item.winner ? { time: getCurrentTime() } : {}),
      })),
    };
    console.log(resultToSave);
    const newAreaArr = areas.map(({ area, areaId }) => ({ area, areaId }));

    !isEqual(newAreaArr, allAreas) &&
      (await axios.post("/api/areas", newAreaArr));

    const savedResult = await axios.post("/api/addResult", resultToSave);
    console.log(savedResult.data.data, "savedResult*********");
    alert("Data Saved!");
  };

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get("/api/areas");
        const todayData = await axios.get("/api/todayResult", {
          params: {
            day,
          },
        });
        // console.log(todayData.data?.data, "todayData*****");
        setTodayData(todayData.data?.data);
        setAllAreas(
          response.data?.data[0]?.areas.map(({ area, areaId }) => ({
            area,
            areaId,
          }))
        );
        const finalAreas = response.data?.data[0]?.areas.map((item, index) => ({
          id: index + 1,
          area: item.area,
          areaId: item.areaId,
          winner: "",
          entries: "",
          isNew: false,
        }));
        setAreas(finalAreas);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    if (!allAreas) {
      fetchAreas();
    }
  }, []);

  return (
    <>
      <div className={style.addAreaBtnSection}>
        <button onClick={addArea} className={style.addBtn}>
          Add Area
        </button>
      </div>
      <div className={style.formSection}>
        <form onSubmit={handleSave}>
          {areas?.map((item, index) => (
            <div className={style.areaInputs} key={item.id}>
              <div className={style.inputSection}>
                <input
                  type="text"
                  placeholder="Enter Area Name"
                  value={item.area}
                  name={item.areaId}
                  disabled={allAreas[index]?.areaId === item?.areaId}
                  onChange={(e) =>
                    handleChange(item.id, "area", e.target.value)
                  }
                  onBlur={(e) => convertAreaId(item.id, e.target.value)}
                />
              </div>
              <div className={style.inputSection}>
                <input
                  type="text"
                  placeholder="Winner No."
                  value={item.winner}
                  name={item.areaId}
                  onChange={(e) =>
                    handleChange(item.id, "winner", e.target.value)
                  }
                />
              </div>
              <div className={style.inputSection}>
                <input
                  type="text"
                  placeholder="Total Entries"
                  value={item.entries}
                  name={item.areaId}
                  onChange={(e) =>
                    handleChange(item.id, "entries", e.target.value)
                  }
                />
              </div>
              {item.isNew ? (
                <div className={style.inputSection}>
                  <button
                    onClick={() => deleteArea(item.id)}
                    className={style.deleteBtn}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              ) : (
                <div className={style.inputSection} />
              )}
            </div>
          ))}
          {areas.length > 0 && <button className={style.saveBtn}>Save</button>}
        </form>
      </div>
    </>
  );
};
export default TodayDraw;
