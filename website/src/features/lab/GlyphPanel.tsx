import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {
  createCombinationsText,
  createGlyphsText,
  getGlyphCollection,
  getGlyphCollections,
} from "./glyphsLib";
import { setText, setContentEditable, setSelectedCollection } from "./labSlice";
import { RootState } from "./reducers";
import { LabState } from "./labSlice";

export function GlyphPanel() {
  const theme = useTheme();
  const { t } = useTranslation(undefined, {keyPrefix: 'lab'});
  const dispatch = useDispatch();
  const labState: LabState = useSelector(
    (state: RootState) => state.labReducer,
    (prev, next) => prev.selectedCollection === next.selectedCollection,
  );
  const { selectedCollection } = labState;

  const handleGlyphClick = (g: string) => {
    dispatch(
      setText(
        createCombinationsText(getGlyphCollection(selectedCollection), g),
      ),
    );
    dispatch(setContentEditable(true));
  };

  const handleAllCombinationsClick = () => {
    let text = "";
    const gc = getGlyphCollection(selectedCollection);
    gc.letters.concat(gc.numbers.concat(gc.signs)).map((g: string) => {
      text += createCombinationsText(gc, g, true);
    });
    dispatch(setText(text));
    dispatch(setContentEditable(false));
  };

  const handleAllGlyphsClick = () => {
    let text = createGlyphsText(getGlyphCollection(selectedCollection));
    dispatch(setText(text));
    dispatch(setContentEditable(true));
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "auto",
        maxWidth: "100%",
        flexWrap: "wrap",
        mt: -0.5,
      }}
    >
      <Tabs
        value={selectedCollection}
        onChange={(event: React.SyntheticEvent, newValue: string) =>
          dispatch(setSelectedCollection(newValue))
        }
        variant="scrollable"
        textColor="inherit"
        indicatorColor="primary"
        scrollButtons="auto"
        sx={{ minHeight: "unset" }}
      >
        {Object.keys(getGlyphCollections()).map((collectionName: string) => (
          <Tab
            key={collectionName}
            label={t(collectionName)}
            value={collectionName}
            sx={{ minWidth: "unset", px: 2, minHeight: "unset" }}
          />
        ))}
      </Tabs>
      <Box // glyphs
        sx={{
          overflowY: "auto",
          maxHeight: "110px",
          textAlign: "center",
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(0, 0, 0, 0.04)"
              : "rgba(255, 255, 255, 0.08)",
          pt: 0.5,
          width: "100%",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Box maxWidth="lg">
          {getGlyphCollection(selectedCollection)
            .letters.concat(
              getGlyphCollection(selectedCollection).numbers.concat(
                getGlyphCollection(selectedCollection).signs,
              ),
            )
            .map((g: string) => (
              <Box
                key={Math.random()}
                component="button"
                onClick={() => handleGlyphClick(g)}
                sx={{
                  width: "40px",
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "16px",
                  color: theme.palette.text.primary,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: theme.palette.action.selected,
                  },
                }}
              >
                {g}
              </Box>
            ))}
          <Button color="inherit" variant="text" onClick={handleAllGlyphsClick}>
            {t("all_glyphs")}
          </Button>
          <Button
            color="inherit"
            variant="text"
            onClick={handleAllCombinationsClick}
          >
            {t("all_combinations")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
