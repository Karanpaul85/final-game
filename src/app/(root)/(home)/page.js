import styles from "./page.module.css";
import WinnerList from "../../components/winnerList";
import SearchSection from "@/app/components/search";
import ContentSection from "@/app/components/contentSection";

export default function Home() {
  return (
    <div className="wrapper">
      <main>
        <ContentSection />
        <SearchSection />
        <WinnerList />
        <ContentSection />
      </main>
    </div>
  );
}
