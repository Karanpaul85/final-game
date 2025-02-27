import Link from "next/link";
import style from "./Admin.module.css";
import { adminPages } from "@/app/utils/constants";
import AdminSection from "@/app/components/adminSection";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getRequestInfo } from "@/app/utils/getRequestInfo";

const Admin = ({ params }) => {
  const slugs = params?.slugs;
  const { isMobile } = getRequestInfo();

  // Get cookies on the server side
  const cookieStore = cookies();
  const isUserLoggedIn = cookieStore.get("isUserLoggedIn")?.value;

  // Redirect if not logged in
  if (!isUserLoggedIn) {
    redirect("/login");
  }

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

        <div className={style.rightSection}>
          <AdminSection slug={slugs[0]} />
        </div>
      </main>
    </div>
  );
};
export default Admin;
