import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "../Link";

export function Footer() {
  return (
    <Box
      sx={(theme: Theme) => ({
        px: 1,
        py: 1,
        mt: "auto",
        backgroundColor: theme.palette.background.paper,
      })}
    >
      <Typography variant="body2" color="textSecondary" align="center">
        <Link href={`https://github.com/rastikerdar/vazirmatn`}>
          View on GitHub
        </Link>
      </Typography>
    </Box>
  );
}
