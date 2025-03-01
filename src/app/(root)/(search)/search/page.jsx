import SearchSection from "@/app/components/search";
import style from "./Search.module.css";
import ContentSection from "@/app/components/contentSection";
import axios from "axios";

export default async function Search() {
  let contentData = null;

  const API_BASE_URL =
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_URL // Local API during development
      : process.env.PROD_URL; // Production API

  try {
    const fetchContent = await axios.get(`${API_BASE_URL}/api/searchContent`);
    if (fetchContent.data?.success) {
      contentData = fetchContent.data?.data;
    }
  } catch (error) {
    console.error("Error fetching search data:", error);
  }
  return (
    <div className="wrapper">
      <main>
        {contentData?.topContent && (
          <ContentSection data={contentData?.topContent} />
        )}
        <SearchSection customCss={style.marginBottom} />
        {contentData?.footerContent && (
          <ContentSection data={contentData?.footerContent} />
        )}
      </main>
    </div>
  );
}
