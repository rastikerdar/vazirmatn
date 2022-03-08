import { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { FixedSizeList as List } from "react-window";
import { useTranslation } from "react-i18next";

import { getLanguageDirection } from "../i18n";
import {
  convertNumberToPersian,
  formatNumber,
  useWindowSize,
} from "../lib/utils";
import { Donation } from "../types";

type Props = {
  donations: Donation[];
};

export const DonationList = (props: Props) => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const _ = useWindowSize(); // rerender on resize
  const { donations } = props;

  const listRef = useRef<HTMLDivElement | null>(null);
  const wiewWidth = listRef.current?.scrollWidth || 0;
  const itemWidth = 65;
  const itemHeight = 140;
  const itemsPerRow = Math.floor(wiewWidth / itemWidth);
  const rowCount = Math.ceil(donations.length / itemsPerRow);
  const listHeight = 300;

  return (
    <Box
      ref={listRef}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 0,
        mt: 1,
        height: `${listHeight}px`,
        border: 1,
        borderColor: theme.palette.divider,
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      <List
        height={listHeight}
        itemCount={rowCount}
        itemSize={itemHeight}
        width={wiewWidth}
        direction={getLanguageDirection(i18n.language)}
        overscanCount={4}
      >
        {({ index, style }) => {
          const items = donations.slice(
            index * itemsPerRow,
            index * itemsPerRow + itemsPerRow,
          );
          return (
            <Box style={style}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {items.map((d) => (
                  <div
                    style={{
                      width: `${itemWidth}px`,
                      fontSize: "0.7rem",
                      lineHeight: 1.3,
                      float: "right",
                      overflow: "hidden",
                      paddingTop: 8,
                    }}
                  >
                    <a
                      href={d.web ? d.web : undefined}
                      title={`${d.date}\n${d.name}`}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "center",
                        paddingTop: 8,
                        height: `${itemHeight}px`,
                        color: !d.web ? theme.palette.text.primary : undefined,
                      }}
                      target="__blank"
                    >
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                        src={
                          d.img
                            ? d.img
                            : `https://s.gravatar.com/avatar/${d.date.replace(
                                /(\s)|(:)|(\/)/g,
                                "",
                              )}?noemail&s=50&d=wavatar`
                        }
                        // loading="lazy"
                      />
                      <div
                        style={{
                          paddingTop: "4px",
                          overflow: "hidden",
                        }}
                      >
                        {d.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.6rem",
                          color: theme.palette.text.primary,
                          opacity: 0.5,
                        }}
                      >
                        {i18n.language === "fa"
                          ? convertNumberToPersian(formatNumber(d.amount, "٬"))
                          : formatNumber(d.amount, ",")}
                      </div>
                    </a>
                  </div>
                ))}
              </Box>
            </Box>
          );
        }}
      </List>
    </Box>
  );
};
