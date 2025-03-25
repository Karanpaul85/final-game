import SearchSection from "@/app/components/search";
import ContentSection from "@/app/components/contentSection";
import TableSection from "@/app/components/tableSection";
import NotFound from "@/app/not-found";
import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.LOCAL_URL // Local API during development
    : process.env.PROD_URL; // Production API

export async function generateMetadata() {
  const fetchContent = await axios.get(`${API_BASE_URL}/api/searchContent`);
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
          url: "https://final-game-two.vercel.app/_next/image?url=%2Fassets%2Flogo.png&w=256&q=75",
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

export default async function Search({ params }) {
  const pageSlugs = params?.slugs;

  let monthData = [];
  let contentData = null;
  let allAreas = [];

  try {
    const result = await axios.get(`${API_BASE_URL}/api/monthData`, {
      params: {
        month: pageSlugs[0],
        year: pageSlugs[1],
      },
    });

    const fetchContent = await axios.get(`${API_BASE_URL}/api/searchContent`);

    result?.data?.message === "successfully"
      ? (monthData = result?.data?.data)
      : (monthData = []);

    if (fetchContent.data?.success) {
      contentData = fetchContent.data?.data;
    }

    const areaResult = await axios.get(`${API_BASE_URL}/api/areas`);
    if (areaResult.data.message === "successful") {
      allAreas = areaResult.data?.data?.[0]?.areas || [];
    }
  } catch (error) {
    console.error("Error fetching winner data:", error);
  }

  if (pageSlugs.length > 2) {
    return NotFound();
  }

  const uniqueAreas = Array.from(
    new Map(
      monthData.flatMap((entry) =>
        entry.results.map(({ area, areaId }) => [areaId, { area, areaId }])
      )
    ).values()
  );

  return (
    <div className="wrapper">
      <main>
        {contentData?.topContent && (
          <ContentSection data={contentData?.topContent} />
        )}

        <TableSection
          data={monthData}
          areaData={uniqueAreas.length > 0 ? uniqueAreas : allAreas}
          selectedMonth={pageSlugs[0]}
          selectedYear={pageSlugs[1]}
        />

        <SearchSection
          selectedMonth={pageSlugs[0]}
          selectedYear={pageSlugs[1]}
          areaData={allAreas}
        />

        {contentData?.footerContent && (
          <ContentSection data={contentData?.footerContent} />
        )}
      </main>
    </div>
  );
}
