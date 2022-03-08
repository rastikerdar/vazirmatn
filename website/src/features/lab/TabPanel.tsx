import Box from "@mui/material/Box";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string | null;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <Box
      sx={{
        maxWidth: "100%",
        display: value !== index ? "none" : "flex",
        px: 0,
      }}
    >
      {value === index && <>{children}</>}
    </Box>
  );
}
