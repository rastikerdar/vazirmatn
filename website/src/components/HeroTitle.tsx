import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";

export const HeroTitle = () => {
  const { t, i18n } = useTranslation(undefined, { keyPrefix: "index" });
  const [font, setFont] = useState("vazirmatn");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFont(font === "vazirmatn" ? "vazirmatn rd" : "vazirmatn");
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [font, setFont]);

  return (
    <Typography
      variant="h3"
      component="h1"
      gutterBottom
      sx={{ fontWeight: "900", mb: 1, fontFamily: font }}
    >
      {t(
        "hero_title",
        i18n.language == "en"
          ? {
              lng: "fa",
            }
          : undefined,
      )}
    </Typography>
  );
};
