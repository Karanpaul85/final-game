import SearchSection from "@/app/components/search";
import style from "./Search.module.css";
import ContentSection from "@/app/components/contentSection";

export default function Search({ params }) {
  console.log(params, "params");
  return (
    <div className="wrapper">
      <main>
        <ContentSection />
        <SearchSection customCss={style.marginBottom} />
        <ContentSection />
      </main>
    </div>
  );
}
