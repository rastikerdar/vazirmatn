import { useRouter } from "next/router";
import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import DocIcon from "@mui/icons-material/MenuBookOutlined";
import LabIcon from "@mui/icons-material/ScienceOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";

import { Layout } from "../../components/Layout";
import Link from "../../Link";
import { DOWNLOAD_URL, SITE_NAME, TAG_NAME } from "../../lib/constants";
import { DonationView } from "../../components/DonationView";
import { getLanguages, getLocalCaption } from "../../i18n";
import { HeroTitle } from "../../components/HeroTitle";

export function IndexLayout() {
  const theme = useTheme();
  const { t, i18n } = useTranslation(undefined, { keyPrefix: "index" });

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Grid
          container
          mt={1}
          mb={4}
          px={2}
          wrap="wrap"
          maxWidth="md"
          alignItems="center"
          rowGap={2}
        >
          <Grid item lg={6} md={6} xs={12}>
            <Box
              my={2}
              sx={{
                mb: 2,
                "@media (max-width: 480px)": { mb: 0 },
                textAlign: "center",
              }}
            >
              <HeroTitle />
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "200" }}
              >
                {t("hero_tail")}
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <Box sx={{ textAlign: "center" }}>
              <Button
                sx={{
                  mt: 1,
                  fontSize: "1.2rem",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light" ? "#fff4e8" : undefined,
                  },
                  border: "1px solid black",
                }}
                variant="contained"
                color="download"
                href={DOWNLOAD_URL}
                endIcon={<DownloadIcon fontSize="small" />}
                size="large"
              >
                {t("downlod_full_package")}
              </Button>
              <Typography
                component="h6"
                // gutterBottom
                sx={{ fontWeight: "normal", mt: 1 }}
              >
                {/* {t("version")} {TAG_NAME} */}
                {t("version")} v33.003
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box maxWidth="md" px={2}>
          {t("font_description")}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "center",
            my: 2,
          }}
        >
          <Link href="/docs">
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<DocIcon fontSize="small" />}
              size="large"
              sx={{ color: theme.palette.text.primary }}
            >
              {t("docs")}
            </Button>
          </Link>
          <Link href="/lab">
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<LabIcon fontSize="small" />}
              size="large"
              sx={{ color: theme.palette.text.primary }}
            >
              {t("lab")}
            </Button>
          </Link>
          <Link href="https://github.com/rastikerdar/vazirmatn" noLinkStyle>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<GitHubIcon fontSize="small" />}
              size="large"
              sx={{ color: theme.palette.text.primary }}
            >
              {t("github")}
            </Button>
          </Link>
        </Box>
        <Box
          maxWidth="md"
          sx={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Box
            sx={{
              mx: 2,
              width: "100%",
            }}
          >
            <DonationView />
          </Box>
        </Box>
        <Box
          maxWidth="md"
          sx={{
            width: "100%",
            p: 2,
            textAlign: "center",
            wordWrap: "break-word",
            fontSize: "0.8rem",
          }}
        >
          {t("other_free_fonts")}:&nbsp;
          <a href="https://rastikerdar.github.io/sahel-font/" target="_blank">
            ساحل
          </a>
          ،&nbsp;
          <a
            href="https://rastikerdar.github.io/parastoo-font/"
            target="_blank"
          >
            پرستو
          </a>
          ،&nbsp;
          <a href="https://rastikerdar.github.io/samim-font/" target="_blank">
            صمیم
          </a>
          ،&nbsp;
          <a href="https://rastikerdar.github.io/tanha-font/" target="_blank">
            تنها
          </a>
          ،&nbsp;
          <a href="https://rastikerdar.github.io/gandom-font/" target="_blank">
            گندم
          </a>
          ،&nbsp;
          <a href="https://rastikerdar.github.io/shabnam-font/" target="_blank">
            شبنم
          </a>
          ،&nbsp;
          <a href="https://rastikerdar.github.io/nahid-font/" target="_blank">
            ناهید
          </a>
          ،&nbsp;
          <a
            href="https://rastikerdar.github.io/vazir-code-font/"
            target="_blank"
          >
            وزیرکد
          </a>
          <br />
          {t("from_other_designers")}:&nbsp;
          <a href="http://libre.font-store.ir/NikaFont/" target="_blank">
            نیکا
          </a>
          ،&nbsp;
          <a href="https://aminabedi68.github.io/Estedad/" target="_blank">
            استعداد
          </a>
          ،&nbsp;
          <a href="https://pfont.github.io/" target="_blank">
            پی‌فونت
          </a>
        </Box>
        <Box
          maxWidth="md"
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: "0.8rem",
          }}
        >
          {getLanguages().map((lang: string) => (
            <Link
              key={lang}
              href=""
              lang={lang}
              noLinkStyle
            >
              {getLocalCaption(lang)}{" "}
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
}

const Index = () => {
  return (
    <Layout>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>
      <IndexLayout />
    </Layout>
  );
};

export default Index;

export { getStaticProps, getStaticPaths } from "../../lib/getStatic";
