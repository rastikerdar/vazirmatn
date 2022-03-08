import { ReactNode } from "react";
import Box from "@mui/material/Box";

import { Footer } from "./Footer";
import { Meta } from "./Meta";
import { Header } from "./Header";

type LayoutProps = {
  children?: ReactNode;
  disableFooter?: boolean;
};

export const Layout = ({ children, disableFooter }: LayoutProps) => {
  return (
    <>
      <Meta />
      <Box
        id="back-to-top-anchor"
        sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Header />
        {children}
        {!disableFooter && <Footer />}
      </Box>
    </>
  );
};
