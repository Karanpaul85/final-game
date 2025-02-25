"use client";
import { useState } from "react";
import style from "./Today.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeSpace } from "@/app/utils/common";

const TodayDraw = () => {
  const [areas, setAreas] = useState([]);

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
  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saved Data:", areas);
    alert("Data Saved!");
  };

  return (
    <>
      <div className={style.addAreaBtnSection}>
        <button onClick={addArea} className={style.addBtn}>
          Add Area
        </button>
      </div>
      <div className={style.formSection}>
        <form onSubmit={handleSave}>
          {areas?.map((item) => (
            <div className={style.areaInputs} key={item.id}>
              <div className={style.inputSection}>
                <input
                  type="text"
                  placeholder="Enter Area Name"
                  value={item.area}
                  name={item.areaId}
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
