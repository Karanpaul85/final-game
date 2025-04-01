import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.LOCAL_URL // Local API during development
    : process.env.PROD_URL; // Production API

export default async function DashboardRootLayout({ children }) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("authCookie")?.value || "";
  const res = await axios.get(`${API_BASE_URL}/api/login`, {
    headers: {
      Cookie: `authCookie=${authCookie}`,
    },
  });
  if (!res?.data?.isLoggedIn) {
    redirect("/login");
  } else {
    redirect("/dashboard/admin");
  }
  return <>{children}</>;
}
