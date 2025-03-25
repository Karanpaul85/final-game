"use client";
import { useEffect, useState } from "react";
import Loader from "../loader";
import style from "../homeContent/Home.module.css";
import axios from "axios";

const SearchContent = () => {
  const [isLoader, setIsLoader] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isFetched, setIsFetched] = useState(false); // Prevent infinite loop
  const [content, setContent] = useState({
    title: "",
    description: "",
    keywords: "",
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
        const savedData = await axios.post("/api/searchContent", content);
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
        const res = await axios.get("/api/searchContent");
        if (res.data.success) {
          setContent((prev) => ({
            ...prev,
            topContent: res.data?.data?.topContent || "",
            footerContent: res.data?.data?.footerContent || "",
            title: res.data?.data?.pageTitle || "",
            description: res.data?.data?.pageDescription || "",
            keywords: res.data?.data?.pageKeywords || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching Search content:", error);
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
        <div className={style.heading}>Search Top Content</div>
        <div className={style.textAreaSection}>
          <input
            type="text"
            placeholder="Please Enter Home Page Title"
            name="title"
            onChange={onChange}
            value={content.title}
            disabled={!isEdit}
          />
        </div>
        <div className={style.textAreaSection}>
          <input
            type="text"
            placeholder="Please Enter Home Page Description"
            name="description"
            onChange={onChange}
            value={content.description}
            disabled={!isEdit}
          />
        </div>
        <div className={style.textAreaSection}>
          <input
            type="text"
            placeholder="Please Enter Home Page keywords"
            name="keywords"
            onChange={onChange}
            value={content.keywords}
            disabled={!isEdit}
          />
        </div>
        <div className={style.textAreaSection}>
          <textarea
            name="topContent"
            onChange={onChange}
            value={content.topContent}
            disabled={!isEdit}
          />
        </div>
        <div className={style.heading}>Search Footer Content</div>
        <div className={style.textAreaSection}>
          <textarea
            name="footerContent"
            onChange={onChange}
            disabled={!isEdit}
            value={content.footerContent}
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

export default SearchContent;
