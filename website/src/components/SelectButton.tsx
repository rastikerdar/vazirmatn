import { styled, Theme, darken, lighten, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const SelectButton = styled(Button)(
  ({
    color,
    variant,
    selected,
    theme,
  }: {
    color: string;
    variant: string;
    selected: boolean;
    theme?: Theme;
  }) => {
    let backgroundColor = undefined;
    if (selected && theme) {
      if (color === "primary" || color === "secondary") {
          if (variant === "text" || variant === "outlined") {
            backgroundColor =
              theme.palette.mode === "light"
                ? lighten(theme.palette[color].main, 0.8)
                : darken(theme.palette[color].main, 0.6);
          } else {
            backgroundColor =
              theme.palette.mode === "dark"
                ? lighten(theme.palette[color].main, 0.6)
                : theme.palette[color].dark;
          }
      } else {
        backgroundColor = theme.palette.action.selected;
      }
    }
    return {
      backgroundColor,
      ":focus": { backgroundColor },
      ":hover": { backgroundColor },
    };
  },
);
