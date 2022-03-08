import { FC } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { useTheme, alpha as alphaFunc } from "@mui/material/styles";

import { RootState } from "./reducers";
import { LabState } from "./labSlice";

export const TextArea: FC = () => {
  const theme = useTheme();
  const labState: LabState = useSelector(
    (state: RootState) => state.labReducer,
    (prev, next) =>
      prev.font === next.font &&
      prev.text === next.text &&
      prev.contentEditable === next.contentEditable &&
      prev.font === next.font &&
      prev.justify === next.justify &&
      prev.tnum === next.tnum &&
      prev.calt === next.calt &&
      prev.size === next.size &&
      prev.weight === next.weight &&
      prev.alpha === next.alpha &&
      prev.isVariable === next.isVariable,
  );
  const {
    font,
    isVariable,
    justify,
    tnum,
    calt,
    size,
    weight,
    alpha,
    text,
    contentEditable,
  } = labState;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        flexGrow: 1,
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          fontFamily: font.cssFamily,
          "& *": {
            fontFamily: `${font.cssFamily} !important`,
            // fontSize: `${size}px !important`,
            // fontWeight: `${isVariable ? "400" : String(weight)} !important`,
          },
          fontSize: `${size}px`,
          fontWeight: isVariable ? "400" : String(weight),
          color: alphaFunc(theme.palette.text.primary, alpha / 100),
          "@media (max-width: 480px)": {
            width: "100%",
          },
          p: 2,
          fontVariationSettings: `"wght" ${weight}`,
          lineHeight: "1.63",
          textAlign: justify ? "justify" : "unset",
          fontFeatureSettings: `"calt" ${calt ? "on" : "off"}, "tnum" ${
            tnum ? "on" : "off"
          }`,
          // overflowX: "auto",
          // width: "100%",
        }}
        maxWidth="lg"
      >
        <div
          contentEditable={contentEditable}
          suppressContentEditableWarning={true}
          spellCheck="false"
          dir="auto"
          dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, "<br>") }}
        />
      </Box>
    </Box>
  );
};
