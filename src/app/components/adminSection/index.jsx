import dynamic from "next/dynamic";
import { useMemo } from "react";

const NotFound = dynamic(() => import("@/app/not-found"), { ssr: false });
const TodayDraw = dynamic(() => import("@/app/components/TodayDraw"), {
  ssr: false,
});
const HomeContent = dynamic(() => import("@/app/components/homeContent"), {
  ssr: false,
});
const SearchContent = dynamic(() => import("@/app/components/searchContent"), {
  ssr: false,
});

const EditArea = dynamic(() => import("@/app/components/editAreas"), {
  ssr: false,
});

const AdminSection = ({ slug }) => {
  const renderComponent = useMemo(() => {
    switch (slug) {
      case "admin":
        return <TodayDraw />;
      case "homeContent":
        return <HomeContent />;
      case "searchContent":
        return <SearchContent />;
      case "editArea":
        return <EditArea />;
      default:
        return <NotFound />;
    }
  }, []);
  return renderComponent;
};
export default AdminSection;
