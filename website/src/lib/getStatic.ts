import { getLanguages } from "../i18n";

export type GetStaticProps = {
  params: {
    lang: string;
  };
};

export async function getStaticProps({ params }: GetStaticProps) {
  return {
    props: { lang: params.lang },
  };
}

export const getStaticPaths = () => ({
  fallback: false,
  paths: getLanguages().map((lang) => ({
    params: {
      lang,
    },
  })),
});

// export async function getI18nProps(ctx:any, ns = ['common']) {
//   const locale = ctx?.params?.locale
//   let props = {
//     ...(await serverSideTranslations(locale, ns))
//   }
//   return props
// }

// export function makeStaticProps(ns = {}) {
//   return async function getStaticProps(ctx) {
//     return {
//       props: await getI18nProps(ctx, ns)
//     }
//   }
// }
