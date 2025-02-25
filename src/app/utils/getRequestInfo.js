import { headers } from "next/headers";
import { userAgent } from "next/server";

/**
 * this method is used to get data from server side
 */
export function getRequestInfo() {
  const headersList = headers();

  // Convert headersList to a plain object
  const allHeaders = {};
  headersList.forEach((value, key) => {
    allHeaders[key] = value;
  });
  const { device } = userAgent({ headers: headersList });
  const isMobile =
    device?.type === "mobile" || device?.type === "tablet" ? true : false;
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";
  const pathName = fullUrl ? new URL(fullUrl).pathname : "";
  return { domain, fullUrl, pathName, isMobile, allHeaders };
}
