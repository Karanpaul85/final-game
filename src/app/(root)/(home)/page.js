import WinnerList from "../../components/winnerList";
import SearchSection from "@/app/components/search";
import ContentSection from "@/app/components/contentSection";
import axios from "axios";

export default async function Home() {
  let winnerData = null;
  const API_BASE_URL =
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_URL // Local API during development
      : process.env.PROD_URL; // Production API
  try {
    const result = await axios.get(`${API_BASE_URL}/api/todayResult`);
    winnerData = result.data;
  } catch (error) {
    console.error("Error fetching winner data:", error);
  }
  return (
    <div className="wrapper">
      <main>
        <ContentSection />
        <SearchSection />
        <WinnerList data={winnerData} />
        <ContentSection />
      </main>
    </div>
  );
}
