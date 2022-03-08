import { useTheme } from "@mui/material/styles";
import Head from "next/head";
import { SITE_NAME } from "../lib/constants";

export const Meta = () => {
  const theme = useTheme();

  return (
    <Head>
      <meta name="theme-color" content={theme.palette.background.default} />
      <meta name="description" content={`صفحه رسمی ${SITE_NAME}.`} />
    </Head>
  );
};
