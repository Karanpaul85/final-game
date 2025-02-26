"use client";
import Link from "next/link";
import style from "./Admin.module.css";
import { adminPages } from "@/app/utils/constants";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { getCookie } from "@/app/utils/common";
import { useRouter } from "next/navigation";

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

const Admin = ({ params }) => {
  const slugs = params?.slugs;
  const router = useRouter();
  useEffect(() => {
    if (!getCookie("isUserLoggedIn")) {
      router.replace("/login");
    }
  }, []);

  const renderComponent = (slug) => {
    switch (slug) {
      case "admin":
        return <TodayDraw />;
      case "homeContent":
        return <HomeContent />;
      case "searchContent":
        return <SearchContent />;
      default:
        return NotFound();
    }
  };
  return (
    <div className="wrapper">
      <main className={style.adminSection}>
        <div className={style.leftSection}>
          <h2>Menu</h2>
          <ul>
            {adminPages.map((item) => (
              <li
                key={item.url}
                className={slugs[0] === item.url ? style.active : ""}
              >
                <Link href={`/dashboard/${item.url}`}>{item.content}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.rightSection}>{renderComponent(slugs[0])}</div>
      </main>
    </div>
  );
};
export default Admin;
