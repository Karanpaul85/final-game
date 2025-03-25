import WinnerList from "../../components/winnerList";
import SearchSection from "@/app/components/search";
import ContentSection from "@/app/components/contentSection";
import axios from "axios";
import { isEmpty } from "lodash";
import Announcement from "@/app/components/announcement";
import { currentDate } from "@/app/utils/common";
import TableSection from "@/app/components/tableSection";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.LOCAL_URL // Local API during development
    : process.env.PROD_URL; // Production API

export async function generateMetadata() {
  const fetchContent = await axios.get(`${API_BASE_URL}/api/homeContent`);
  const { pageTitle, pageDescription, pageKeywords } = fetchContent?.data?.data;
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: "https://final-game-two.vercel.app",
      siteName: "Lucky Draw",
      images: [
        {
          url: "https://final-game-two.vercel.app/assets/logo.png",
          width: 400,
          height: 400,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    metadataBase: new URL("https://final-game-two.vercel.app"),
  };
}

export default async function Home() {
  const { day, month, year } = currentDate();
  let winnerData = null;
  let contentData = null;
  let allAreas = [];
  let monthData = null;

  try {
    const monthResult = await axios.get(`${API_BASE_URL}/api/monthData`, {
      params: {
        month: month,
        year: year,
      },
    });

    monthResult?.data?.message === "successfully"
      ? (monthData = monthResult?.data?.data)
      : (monthData = []);

    const result = await axios.get(`${API_BASE_URL}/api/todayResult`, {
      params: { date: day },
    });
    const fetchContent = await axios.get(`${API_BASE_URL}/api/homeContent`);

    const areaResult = await axios.get(`${API_BASE_URL}/api/areas`);
    if (areaResult.data.message === "successful") {
      allAreas = areaResult.data?.data?.[0]?.areas || [];
    }

    if (result.data?.message === "successfully") {
      winnerData = result.data;
    }

    if (fetchContent.data?.success) {
      contentData = fetchContent.data?.data;
    }
  } catch (error) {
    console.error("Error fetching winner data:", error);
  }

  const uniqueAreas = Array.from(
    new Map(
      monthData.flatMap((entry) =>
        entry.results.map(({ area, areaId }) => [areaId, { area, areaId }])
      )
    ).values()
  );

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
        {monthData.length > 0 && (
          <TableSection
            data={monthData}
            areaData={uniqueAreas}
            selectedMonth={month}
            selectedYear={year}
          />
        )}
        <SearchSection
          selectedMonth={month}
          selectedYear={year}
          areaData={allAreas}
        />
      </main>
    </div>
  );
}
