import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import Button from "@mui/material/Button";
import LanguageIcon from "@mui/icons-material/Translate";
import i18n, { getLanguages, getLocalCaption } from "../i18n";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import Link from "../Link";

export function LanguageMenu() {
  const theme = useTheme();
  const router = useRouter();
  const { pathname, query, asPath } = router;

  return (
    <PopupState variant="popover">
      {(popupState) => (
        <React.Fragment>
          <Button
            {...bindTrigger(popupState)}
            variant="text"
            startIcon={<LanguageIcon fontSize="small" />}
            sx={{ color: theme.palette.text.primary, ml: 1 }}
            title={"Select Language"}
          >
            {getLocalCaption(i18n.language)}
          </Button>
          <Menu
            elevation={0}
            {...bindMenu(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {getLanguages().map((lang: string) => (
              <Link
                key={lang}
                sx={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
                href={{ pathname, query }}
                as={asPath}
                lang={lang}
                onClick={() => {
                  popupState.close();
                }}
              >
                <MenuItem selected={i18n.language === lang}>
                  {getLocalCaption(lang)}
                </MenuItem>
              </Link>
            ))}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
