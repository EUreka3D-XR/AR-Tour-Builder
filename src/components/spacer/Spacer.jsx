import clsx from "clsx";
import { Box } from "@mui/material";

function Spacer({ className, size }) {
  return (
    <Box
      sx={{ m: size, width: size, flexShrink: 0 }}
      className={clsx("spacer", className)}
    />
  );
}

export default Spacer;
