import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import { fonts as initialFonts, Font } from "./fonts";
import { setFont, setIsVariable } from "./labSlice";
import { RootState } from "./reducers";
import { LabState } from "./labSlice";
import { SelectButton } from "../../components/SelectButton";
import { addStyle } from "../../lib/utils";

let idNum = 0;
export const generateId = () => `c${++idNum}`;

export const fileTypes: {
  [key: string]: string;
} = {
  ttf: "truetype",
  woff: "woff",
  woff2: "woff2",
  otf: "opentype",
} as const;

// TODO: add a feature for uploading custom fonts
export function FontPanel() {
  const { t } = useTranslation(undefined, {keyPrefix: 'lab'});
  const dispatch = useDispatch();
  const [fonts, setFonts] = useState<Array<Font>>(initialFonts);
  const labState: LabState = useSelector(
    (state: RootState) => state.labReducer,
    (prev, next) => prev.font === next.font,
  );
  const { font: selectedFont } = labState;
  const inputFontFile = useRef<HTMLInputElement>(null);

  const handleInputFontFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let file: globalThis.File | null = null;
    if (e.target !== null && e.target.files !== null && e.target.files.length) {
      file = e.target.files[0];
    }
    if (!file) {
      return;
    }

    const url = window.URL.createObjectURL(file);
    const familyParts = file.name.split(".");
    familyParts.splice(-1, 0, generateId());
    const family = familyParts.join("-");

    const fileExt = String(file.name.split(".").pop());
    const fileType = fileTypes[fileExt];
    if (Object.keys(fileTypes).indexOf(fileExt) === -1) {
      alert("Wrong file type!");
      return;
    }

    addStyle(`
    @font-face {
      font-family: '${family}';
      src: url('${url}') format("${fileType}");
      font-weight: 400;
      font-style: normal;
    }
    `);

    const font = {
      family: family,
      cssFamily: family,
      cssURL: "",
      isVariable: false,
    };
    setFonts([font, ...fonts]);
    dispatch(setFont(font));
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href={selectedFont.cssURL}
          key={selectedFont.cssURL}
        />
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          overflowX: "auto",
          maxWidth: "100%",
          pb: 1,
          px: 2,
        }}
      >
        <IconButton
          color="primary"
          sx={{ mr: 1 }}
          onClick={() => {
            if (inputFontFile.current !== null) {
              inputFontFile.current.click();
            }
          }}
          size="large"
          title="Add a font"
        >
          <AddIcon fontSize="small" />
        </IconButton>
        {fonts.map((font) => (
          <SelectButton
            key={font.family}
            selected={font.family === selectedFont.family}
            variant="text"
            color="inherit"
            onClick={() => {
              dispatch(setFont(font));
              dispatch(setIsVariable(font.isVariable));
            }}
            sx={{
              whiteSpace: "nowrap",
              minWidth: "max-content",
              px: 2,
            }}
          >
            {t(font.family)}
          </SelectButton>
        ))}
      </Box>
      <input
        type="file"
        id="file"
        ref={inputFontFile}
        style={{ display: "none" }}
        onChange={handleInputFontFileChange}
        accept={Object.keys(fileTypes).reduce(
          (result, type) => result + `.${type},`,
          "",
        )}
      />
    </>
  );
}
