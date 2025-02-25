import SearchSection from "@/app/components/search";
import ContentSection from "@/app/components/contentSection";
import TableSection from "@/app/components/tableSection";
import NotFound from "@/app/not-found";

export default function Search({ params }) {
  const pageSlugs = params?.slugs;
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
        <TableSection />
        <ContentSection />
      </main>
    </div>
  );
}
