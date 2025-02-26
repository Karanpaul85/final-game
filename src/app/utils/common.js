export const getLastFiveYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - i);
};

export const removeSpace = (value) => {
  const textArr = value.trim().split(/\s+/);
  const areaId = textArr
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
  return areaId;
};

export const setCookie = (name = "", value = "", days = 0, domain = "") => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  let domainString = domain ? `; domain=${domain}` : "";

  document.cookie = `${name}=${value}${expires}; path=/${domainString}`;
};

export const getCookie = (cname) => {
  if (typeof document === "undefined") return null;
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const currentDate = () => {
  const date = new Date();
  const cDate = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = `${cDate}-${month + 1}-${year}`;
  return { day, month: month + 1, year };
};

export const getCurrentTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const isAM_PM = hour < 12 ? "AM" : "PM";
  return `${hour}:${minutes}${isAM_PM}`;
};
