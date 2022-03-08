import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import { FontPanel } from "./FontPanel";
import { SettingsPanel } from "./SettingsPanel";
import { TextPanel } from "./TextPanel";
import { GlyphPanel } from "./GlyphPanel";

const PANELS: Array<[string, React.FC]> = [
  ["font", React.memo(FontPanel)],
  ["settings", React.memo(SettingsPanel)],
  ["text", React.memo(TextPanel)],
  ["glyph", React.memo(GlyphPanel)],
];

export const Panels: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation(undefined, {keyPrefix: 'lab'});
  const [tab, setTab] = useState<string | null>("settings");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newTab: string | null,
  ) => {
    setTab(newTab);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        // position: "sticky",
        // top: "56px",
        // zIndex: 1000,
        backgroundColor: theme.palette.background.default,
        pt: 1,
        borderBottom: 1,
        borderColor: theme.palette.divider,
        // overflowX: "auto",
      }}
    >
      <ToggleButtonGroup
        value={tab}
        onChange={handleChange}
        exclusive
        sx={{
          mb: 2,
          mx: 2,
          border: 1,
          borderColor: theme.palette.divider,
          overflow: "hidden",
          borderRadius: "25px",
        }}
      >
        {PANELS.map(([name]) => (
          <ToggleButton key={name} value={name} sx={{ border: "none" }}>
            {t(name)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {PANELS.map(([name, Component]) => (
        <Box
          key={name}
          sx={{
            display: name !== tab ? "none" : "flex",
            maxWidth: "100%",
          }}
        >
          <Component />
        </Box>
      ))}
    </Box>
  );
};
