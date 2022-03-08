import { useEffect, useState } from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import rtlPlugin from "stylis-plugin-rtl";
import CssBaseline from "@mui/material/CssBaseline";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useRouter } from "next/router";

import { createCustomMuiTheme } from "../theme";
import { ToggleThemeContext } from "../ToggleThemeContext";
import i18n, {
  getDefaultLang,
  getLanguageDirection,
  getLanguages,
} from "../i18n";
import useMediaQuery from "@mui/material/useMediaQuery";
import Head from "next/head";

const cacheLtr = createCache({
  key: "muiltr",
  prepend: true,
});

const cacheRtl = createCache({
  key: "muirtl",
  prepend: true,
  stylisPlugins: [rtlPlugin],
});

function getLangFromPath(path: string) {
  if (!path.startsWith("/")) {
    return "";
  }
  const parts = path.split("/");
  return getLanguages().includes(parts[1]) ? parts[1] : "";
}

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const router = useRouter();
  const lang = getLangFromPath(router.asPath) || getDefaultLang();

  useEffect(() => {
    const savedTheme =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("theme") === "dark"
          ? "dark"
          : "light"
        : prefersDarkMode
        ? "dark"
        : "light";
    setTheme(savedTheme);
  }, []);

  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  const muiTheme = createCustomMuiTheme(theme, getLanguageDirection(lang));

  const handleToggleTheme = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    }
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider
        value={getLanguageDirection(lang) === "rtl" ? cacheRtl : cacheLtr}
      >
        <ThemeProvider theme={muiTheme}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            <style>{`body{direction: ${getLanguageDirection(lang)}}`}</style>
          </Head>
          <CssBaseline />
          <ToggleThemeContext.Provider value={handleToggleTheme}>
            <Component {...pageProps} />
          </ToggleThemeContext.Provider>
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
};

export default App;
