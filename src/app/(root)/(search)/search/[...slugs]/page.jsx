import SearchSection from "@/app/components/search";
import ContentSection from "@/app/components/contentSection";
import TableSection from "@/app/components/tableSection";
import NotFound from "@/app/(root)/not-found/not-found";

export default function Search({ params }) {
  const pageSulgs = params?.slugs;
  if (pageSulgs.length > 2) {
    return NotFound();
  }
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
