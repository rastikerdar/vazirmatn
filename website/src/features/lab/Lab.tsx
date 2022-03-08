import { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
import Box from "@mui/material/Box";

import { store } from "./store";
import { Panels } from "./Panels";
import { TextArea } from "./TextArea";

export const Lab: FC = () => {
  return (
    <ReduxProvider store={store}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        overflow="hidden"
      >
        <Panels />
        <TextArea />
      </Box>
    </ReduxProvider>
  );
};
