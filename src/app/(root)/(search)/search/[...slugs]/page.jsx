import SearchSection from "@/app/components/search";
import ContentSection from "@/app/components/contentSection";
import TableSection from "@/app/components/tableSection";
import NotFound from "@/app/not-found";

export default function Search({ params }) {
  const pageSulgs = params?.slugs;
  console.log(pageSulgs);
  if (pageSulgs.length > 2) {
    return NotFound();
  }
  return (
    <div className="wrapper">
      <main>
        <ContentSection />
        <SearchSection
          selectedMonth={pageSulgs[0]}
          selectedYear={pageSulgs[1]}
        />
        <TableSection />
        <ContentSection />
      </main>
    </div>
  );
}
