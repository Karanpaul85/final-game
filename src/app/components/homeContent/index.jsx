"use client";
import { useEffect, useState } from "react";
import Loader from "../loader";
import style from "./Home.module.css";
import axios from "axios";

const HomeContent = () => {
  const [isLoader, setIsLoader] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
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
    if (isEdit) {
      setIsLoader(true);
      try {
        const savedData = await axios.post("/api/homeContent", content);
        if (savedData.data.success) {
          setIsLoader(false);
          setIsEdit(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoader(false);
      }
    } else {
      setIsEdit(true);
    }
  };

  const onCancelEdit = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/homeContent");
        if (res.data.success) {
          setContent((prev) => ({
            ...prev,
            topContent: res.data?.data?.topContent || "",
            footerContent: res.data?.data?.footerContent || "",
          }));
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
    } else {
      if (content?.topContent !== "" || content?.footerContent !== "") {
        setIsEdit(false);
      }
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
            disabled={!isEdit}
          />
        </div>
        <div className={style.heading}>Home Footer Content</div>
        <div className={style.textAreaSection}>
          <textarea
            name="footerContent"
            onChange={onChange}
            disabled={!isEdit}
            value={content.footerContent} // ✅ Fixed value binding
          />
        </div>
        <div className={style.buttonSec}>
          <button type="submit" className={style.saveBtn}>
            {isEdit ? "Save" : "Edit"}
          </button>
          {isEdit && (
            <button
              type="button"
              className={style.cancel}
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default HomeContent;
