import { useRouter } from "next/router";
import Head from "next/head";
import ErrorPage from "next/error";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";

import { getDocBySlug, getAllDocs } from "../../../lib/api";
import Link from "../../../Link";
import { Doc } from "../../../types";
import markdownToHtml from "../../../lib/markdownToHtml";
import { SITE_NAME } from "../../../lib/constants";
import { Layout } from "../../../components/Layout";
import i18n, { getLanguages } from "../../../i18n";
import { ScrollTop } from "../../../components/ScrollTop";
import { SITE_BASE_PATH } from "../../../lib/constants";
import { getDefaultLang } from "../../../i18n";

const MarkdownContent = styled("div")`
  pre {
    /* @noflip */
    direction: ltr;
  }
`;

type Props = {
  doc: Doc;
  locale: string;
};

const Doc = ({ doc }: Props) => {
  const router = useRouter();
  const theme = useTheme();

  if (!router.isFallback && !doc?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      {i18n.language !== getDefaultLang() && (
        <Head>
          <link
            rel="canonical"
            href={`${SITE_BASE_PATH}/${getDefaultLang()}/docs/${doc.slug}`}
          />
        </Head>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            px: 2,
            mt: 2,
            maxWidth: {
              xs: "100%", // theme.breakpoints.up('xs')
              md: 900,
            },
            minWidth: {
              xs: "100%", // theme.breakpoints.up('xs')
              sm: 600,
            },
            overflowX: "auto",
          }}
        >
          {router.isFallback ? (
            "Loading…"
          ) : (
            <>
              <article dir="auto">
                <Head>
                  <title>
                    {doc.title} | {SITE_NAME}
                  </title>
                </Head>
                <Typography
                  variant="h5"
                  component="h1"
                  color="text"
                  sx={{
                    borderBottom: 1,
                    borderBottomColor: theme.palette.divider,
                    mb: 2,
                    width: "100%",
                    display: "block",
                  }}
                >
                  <Link href={`/docs/${doc.slug}`} sx={{ color: "inherit" }}>
                    {doc.title}
                  </Link>
                </Typography>
                <Box
                  sx={{
                    // "& h3": { color: theme.palette.secondary.main },
                    "& pre": { px: 2, maxHeight: "300px", overflow: "auto" },
                  }}
                  data-nosnippet
                >
                  <MarkdownContent
                    dangerouslySetInnerHTML={{ __html: doc.content }}
                  />
                </Box>
              </article>
              <ScrollTop />
            </>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Doc;

type GetStaticProps = {
  params: {
    slug: string;
    lang: string;
  };
};

export async function getStaticProps({ params }: GetStaticProps) {
  const doc = getDocBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
  ]);
  const content = await markdownToHtml(doc.content || "");

  return {
    props: {
      doc: {
        ...doc,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const docs = getAllDocs(["slug"]);
  const paths = [];

  for (const lang of getLanguages()) {
    for (const doc of docs) {
      paths.push({
        params: { lang, slug: doc.slug },
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
}
