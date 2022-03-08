import { createTheme, PaletteColor } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    download: PaletteColor;
  }
  interface PaletteOptions {
    download: PaletteColor;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    download: true;
  }
}

const FONT_FAMILY =
  '"Vazirmatn", "Roboto", "Tahoma", "Helvetica", "Arial", sans-serif';

const { palette } = createTheme();

export function createCustomMuiTheme(
  mode: "dark" | "light",
  direction: "rtl" | "ltr",
) {
  return createTheme({
    direction, // Both here and <body dir="rtl">
    // transitions: {
    //   create: () => "none", // disable all transitions
    // },
    palette: {
      mode,
      primary: mode === "light" ? { main: "#1976d2" } : { main: "#90caf9" },
      secondary: mode === "light" ? { main: "#00796b" } : { main: "#80cbc4" },
      download:
        mode === "light"
          ? palette.augmentColor({ color: { main: "#ffe9c7" } })
          : palette.augmentColor({ color: { main: "#8c2a61" } }),
      background:
        mode === "light" ? { default: "#fff" } : { default: "#151520" },
      text: {
        primary: mode === "light" ? "#212121" : "#ffffff",
      },
    },
    typography: {
      fontFamily: FONT_FAMILY,
    },
    components: {
      MuiPopover: {
        styleOverrides: {
          paper: {
            border: `1px solid ${mode === "light" ? "#9e9e9e" : "#424242"}`,
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            fontSize: "0.9rem",
          },
        },
      },
      MuiToggleButton: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            fontSize: "0.9rem",
          },
        },
      },
      MuiTab: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            fontSize: "0.9rem",
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: "none",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            WebkitFontSmoothing: "auto",
            "@media (min-width: 1200px)": {
              fontSize: 18,
            },
          },
          body: {
            lineHeight: 1.63,
          },
          textarea: {
            backgroundColor: "transparent",
            color: mode === "light" ? "black" : "white",
            border: `1px solid ${
              mode === "light"
                ? "rgba(0, 0, 0, 0.23)"
                : "rgba(255, 255, 255, 0.23)"
            }`,
            padding: "8px",
            fontSize: "1rem",
            fontFamily: FONT_FAMILY,
          },
          a: {
            color: mode === "light" ? "#0040ff" : "#9bc0fa",
            textDecoration: "none",
          },
          pre: {
            backgroundColor: mode === "light" ? "#00000010" : "#ffffff29",
          },
          button: {
            fontFamily: FONT_FAMILY,
          },
          input: {
            '&[type="range"]': {
              verticalAlign: "middle",
              appearance: "none",
              backgroundColor: mode === "light" ? "#00000010" : "#ffffff29",
            },
          },
          ".MuiButtonBase-root": {
            display: "none",
          },
        },
      },
    },
  });
}
