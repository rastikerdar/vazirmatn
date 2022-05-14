import Head from "next/head";
import { useTranslation } from "react-i18next";

import { Layout } from "../../components/Layout";
import { Lab } from "../../features/lab/Lab";

const LabPage = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "lab" });
  return (
    <Layout disableFooter>
      <Head>
        <title>{t("vazirmatn_font_labratory")}</title>
      </Head>
      <Lab />
    </Layout>
  );
};

export default LabPage;

export { getStaticProps, getStaticPaths } from "../../lib/getStatic";
