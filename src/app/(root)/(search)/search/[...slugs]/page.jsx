import SearchSection from "@/app/components/search";
import ContentSection from "@/app/components/contentSection";
import TableSection from "@/app/components/tableSection";

export default function Search({ params }) {
  console.log(params, "params");
  return (
    <div className="wrapper">
      <main>
        <ContentSection />
        <SearchSection />
        <TableSection />
        <ContentSection />
      </main>
    </div>
  );
}
