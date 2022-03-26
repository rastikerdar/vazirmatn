export function setCookie(cname: string, cvalue: string, exdays: number) {
  if (typeof document === "undefined") {
    return;
  }
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  (document as any).cookie =
    cname + "=" + cvalue + ";" + expires + ";path=/" + ";SameSite=Strict";
}

export function getCookie(cname: string) {
  if (typeof document === "undefined") {
    return;
  }
  let name = cname + "=";
  let ca = (document as any).cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function replaceAll(
  str: string,
  find: string | RegExp,
  replace: string,
) {
  return str.replace(new RegExp(find, "g"), replace);
}

export function addStyle(styleString: string) {
  const style = document.createElement("style");
  style.textContent = styleString;
  document.head.append(style);
}

import { useState, useEffect } from "react";

// Define general type for useWindowSize hook, which includes width and height
interface Size {
  width: number | undefined;
  height: number | undefined;
}

// Hook
export function useWindowSize(): Size {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export function formatNumber(x: number, separator: string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function convertNumberToPersian(x: number | string) {
  var nums: any = {
    0: "۰",
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
  };
  return x.toString().replace(/[0-9]/gi, function (m) {
    return nums[m];
  });
}
