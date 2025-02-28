"use client";
import { useEffect, useState } from "react";
import Loader from "../loader";
import style from "./Home.module.css";
import axios from "axios";

const HomeContent = () => {
  const [isLoader, setIsLoader] = useState(true);
  const [isFetched, setIsFetched] = useState(false); // Prevent infinite loop
  const [content, setContent] = useState({
    topContent: "",
    footerContent: "",
  });

  const onChange = (e) => {
    setContent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const savedData = await axios.post("/api/homeContent", content);
    console.log(savedData, "savedData");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/homeContent");
        if (res.data.success) {
          setContent(res.data.data || {}); // Ensure fallback to an empty object
        }
      } catch (error) {
        console.error("Error fetching home content:", error);
      } finally {
        setIsLoader(false);
        setIsFetched(true); // Prevent re-fetching
      }
    };

    if (!isFetched) {
      fetchData();
    }
  }, [isFetched]); // Only trigger once

  return (
    <>
      {isLoader && <Loader position="absolute" />}
      <form className={style.homeContent} onSubmit={onSubmit}>
        <div className={style.heading}>Home Top Content</div>
        <div className={style.textAreaSection}>
          <textarea
            name="topContent"
            onChange={onChange}
            value={content.topContent}
          />
        </div>
        <div className={style.heading}>Home Footer Content</div>
        <div className={style.textAreaSection}>
          <textarea
            name="footerContent"
            onChange={onChange}
            value={content.footerContent} // ✅ Fixed value binding
          />
        </div>
        <button type="submit" className={style.saveBtn}>
          Save
        </button>
      </form>
    </>
  );
};

export default HomeContent;
