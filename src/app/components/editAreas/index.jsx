"use client";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import style from "./EditAreas.module.css";

const EditArea = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);

  const inputRefs = useRef([]);

  const onChange = (e, index) => {
    const { name, value } = e.target;
    setAreas((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  const onBlur = () => {
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index); // Enable editing for this input
    setTimeout(() => {
      inputRefs.current[index]?.focus(); // ✅ Auto-focus on the input
    }, 0);
  };

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const result = await axios.get("/api/areas");
        if (result.data.message === "successful") {
          setAreas(result.data?.data?.[0]?.areas || []);
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []); // ✅ Prevent infinite loop

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {areas.length > 0 ? (
        <div className={style.editAreaSec}>
          <ul>
            {areas.map((item, index) => (
              <li key={item?.areaId}>
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  name="area"
                  value={item?.area || ""}
                  disabled={editIndex !== index}
                  onChange={(e) => onChange(e, index)}
                  onBlur={onBlur}
                />
                <EditIcon onClick={() => handleEdit(index)} />
                <DeleteIcon />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Sorry, there is no area.</p>
      )}
    </>
  );
};

export default EditArea;
