import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { getAllDocs } from "../../lib/api";
import { SITE_NAME } from "../../lib/constants";
import { Doc } from "../../types";
import Link from "../../Link";
import { Layout } from "../../components/Layout";
import { GetStaticProps } from "../../lib/getStatic";

type Props = {
  allDocs: Doc[];
  lang: string;
};

const Index = ({ allDocs, lang }: Props) => {
  const theme = useTheme();

  return (
    <Layout>
      <Head>
        <title>صفحات راهنما | {SITE_NAME}</title>
      </Head>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          maxWidth="md"
          sx={{
            mt: 2,
            px: 2,
            maxWidth: {
              xs: "100%", // theme.breakpoints.up('xs')
              md: 900,
            },
            minWidth: {
              xs: "100%", // theme.breakpoints.up('xs')
              sm: 600,
            },
          }}
        >
          <article>
            {allDocs.map((doc) => (
              <div key={doc.slug}>
                <Typography
                  variant="subtitle1"
                  component="h2"
                  color="text"
                  sx={{
                    borderBottom: 1,
                    borderBottomColor: theme.palette.divider,
                    mb: 2,
                  }}
                  dir="auto"
                >
                  <Link
                    href={`/docs/${doc.slug}`}
                    lang={lang}
                    sx={{ color: "inherit" }}
                  >
                    {doc.title}
                  </Link>
                </Typography>
              </div>
            ))}
          </article>
        </Box>
      </Box>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ params }: GetStaticProps) {
  const allDocs = getAllDocs(["title", "date", "slug", "author", "locale"]);
  return {
    props: { lang: params.lang, allDocs },
  };
}

export { getStaticPaths } from "../../lib/getStatic";
