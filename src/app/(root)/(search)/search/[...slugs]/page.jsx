import SearchSection from "@/app/components/search";
import ContentSection from "@/app/components/contentSection";
import TableSection from "@/app/components/tableSection";
import NotFound from "@/app/not-found";
import axios from "axios";
import style from "./../Search.module.css";

export default async function Search({ params }) {
  const pageSlugs = params?.slugs;

  let monthData = null;
  let contentData = null;

  const API_BASE_URL =
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_URL // Local API during development
      : process.env.PROD_URL; // Production API
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
        <SearchSection
          selectedMonth={pageSlugs[0]}
          selectedYear={pageSlugs[1]}
        />
        {monthData.length > 0 ? (
          <TableSection data={monthData} areaData={uniqueAreas} />
        ) : (
          <p className={style.notFound}>
            Sorry we can not find any result for this month
          </p>
        )}
        {contentData?.footerContent && (
          <ContentSection data={contentData?.footerContent} />
        )}
      </main>
    </div>
  );
}
