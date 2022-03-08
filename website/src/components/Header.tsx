import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import NightIcon from "@mui/icons-material/DarkModeOutlined";
import DayIcon from "@mui/icons-material/LightModeOutlined";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import DocIcon from "@mui/icons-material/MenuBookOutlined";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TestPageIcon from "@mui/icons-material/ScienceOutlined";

import Link from "../Link";
import { LanguageMenu } from "./LanguageMenu";
import { useToggleTheme } from "../ToggleThemeContext";

export const Header = () => {
  const { t } = useTranslation(undefined, {keyPrefix: 'header'});
  const theme = useTheme();
  const toggleTheme = useToggleTheme();

  return (
    <AppBar
      sx={{
        backgroundColor: theme.palette.background.default,
        backgroundImage: "none",
        boxShadow: "none",
        borderBottomColor: theme.palette.divider,
        top: "0 !important",
      }}
      position="sticky"
      elevation={0}
    >
      <Toolbar
        sx={{
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Link href={"/"}>
          <IconButton
            size="large"
            sx={{ color: theme.palette.text.primary }}
            title={t("home")}
          >
            <HomeIcon fontSize="small" />
          </IconButton>
        </Link>
        <Link href="/docs">
          <IconButton
            size="large"
            sx={{ color: theme.palette.text.primary }}
            title={t("docs")}
          >
            <DocIcon fontSize="small" />
          </IconButton>
        </Link>
        <Link href="/lab">
          <IconButton
            size="large"
            sx={{ color: theme.palette.text.primary }}
            title={t("lab")}
          >
            <TestPageIcon fontSize="small" />
          </IconButton>
        </Link>
        <IconButton
          onClick={() => toggleTheme()}
          size="large"
          sx={{ color: theme.palette.text.primary }}
          title={
            theme.palette.mode === "light" ? t("night_mode") : t("day_mode")
          }
        >
          {theme.palette.mode === "light" && <NightIcon fontSize="small" />}
          {theme.palette.mode === "dark" && <DayIcon fontSize="small" />}
        </IconButton>
        <LanguageMenu />
      </Toolbar>
    </AppBar>
  );
};
