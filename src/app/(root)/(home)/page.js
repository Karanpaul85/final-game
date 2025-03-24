import WinnerList from "../../components/winnerList";
import SearchSection from "@/app/components/search";
import ContentSection from "@/app/components/contentSection";
import axios from "axios";
import { isEmpty } from "lodash";
import Announcement from "@/app/components/announcement";
import { currentDate } from "@/app/utils/common";

export default async function Home() {
  const { day } = currentDate();
  let winnerData = null;
  let contentData = null;
  const API_BASE_URL =
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_URL // Local API during development
      : process.env.PROD_URL; // Production API
  try {
    const result = await axios.get(`${API_BASE_URL}/api/todayResult`, {
      params: { date: day },
    });
    const fetchContent = await axios.get(`${API_BASE_URL}/api/homeContent`);
    if (result.data?.message === "successfully") {
      winnerData = result.data;
    }

    if (fetchContent.data?.success) {
      contentData = fetchContent.data?.data;
    }
  } catch (error) {
    console.error("Error fetching winner data:", error);
  }

  const hasLuckyWinner =
    !isEmpty(winnerData.data) &&
    winnerData?.data?.results.some((item) => item.luckyWinner.trim() !== "");

  return (
    <div className="wrapper">
      <main>
        {contentData?.topContent && (
          <ContentSection data={contentData?.topContent} />
        )}

        {hasLuckyWinner ? <WinnerList data={winnerData} /> : <Announcement />}
        {contentData?.footerContent && (
          <ContentSection data={contentData?.footerContent} />
        )}
        <SearchSection />
      </main>
    </div>
  );
}
