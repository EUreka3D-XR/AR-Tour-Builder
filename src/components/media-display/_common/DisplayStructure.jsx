import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography } from "@mui/material";

import ExpandableText from "@/components/expandable-text/ExpandableText";

export default function DisplayStructure({
  title,
  description,
  onClose,
  children,
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        bgcolor: "black",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top bar */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          zIndex: 2,
        }}
      >
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
        {onClose && (
          <IconButton onClick={onClose} size="large">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Display area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 8,
          pb: 80, // leave space for info area
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </Box>

      {/* Info area (bottom) */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: "background.default",
          px: 3,
          py: 2,
          boxShadow: 3,
          zIndex: 3,
        }}
      >
        <ExpandableText text={description}>
          {description + description + description + description}
        </ExpandableText>
      </Box>
    </Box>
  );
}
