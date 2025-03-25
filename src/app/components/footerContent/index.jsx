"use client";

import { useEffect, useState } from "react";
import Loader from "../loader";
import style from "../homeContent/Home.module.css";
import axios from "axios";

const FooterContent = () => {
  const [isLoader, setIsLoader] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [content, setContent] = useState({
    content: "",
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
        const savedData = await axios.post("/api/footerContent", content);
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
        const res = await axios.get("/api/footerContent");
        if (res.data.success) {
          setContent((prev) => ({
            ...prev,
            content: res.data?.data?.content || "",
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
      if (content?.content !== "") {
        setIsEdit(false);
      }
    }
  }, [isFetched]);

  return (
    <>
      {isLoader && <Loader position="absolute" />}
      <form className={style.homeContent} onSubmit={onSubmit}>
        <div className={style.textAreaSection}>
          <textarea
            name="content"
            onChange={onChange}
            disabled={!isEdit}
            value={content.content}
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
export default FooterContent;
