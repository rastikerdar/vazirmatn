import Head from "next/head";

import { Layout } from "../../components/Layout";
import { Lab } from "../../features/lab/Lab";
import { getLanguages } from "../../i18n";

const LabPage = () => {
  return (
    <Layout disableFooter>
      <Head>
        <title>آزمایشگاه فونت وزیرمتن Vazirmatn Font Labratory</title>
      </Head>
      <Lab />
    </Layout>
  );
};

export default LabPage;

export { getStaticProps, getStaticPaths } from "../../lib/getStatic";
