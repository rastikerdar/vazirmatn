import Head from "next/head";

import { SITE_BASE_PATH } from "../lib/constants";
import { getDefaultLang } from "../i18n";
import DefaultIndex from "./[lang]/index";

export default function Index() {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${SITE_BASE_PATH}/${getDefaultLang()}`} />
      </Head>
      <DefaultIndex />
    </>
  );
}
