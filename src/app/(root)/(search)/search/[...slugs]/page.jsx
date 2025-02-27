import SearchSection from "@/app/components/search";
import ContentSection from "@/app/components/contentSection";
import TableSection from "@/app/components/tableSection";
import NotFound from "@/app/not-found";
import axios from "axios";

export default async function Search({ params }) {
  const pageSlugs = params?.slugs;

  let monthData = null;
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
    result?.data?.message === "successfully"
      ? (monthData = result?.data?.data?.results)
      : (monthData = []);
  } catch (error) {
    console.error("Error fetching winner data:", error);
  }

  if (pageSlugs.length > 2) {
    return NotFound();
  }
  return (
    <div className="wrapper">
      <main>
        <ContentSection />
        <SearchSection
          selectedMonth={pageSlugs[0]}
          selectedYear={pageSlugs[1]}
        />
        <TableSection data={monthData} />
        <ContentSection />
      </main>
    </div>
  );
}
