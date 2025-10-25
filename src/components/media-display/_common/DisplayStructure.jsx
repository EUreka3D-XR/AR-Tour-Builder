import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Typography } from "@mui/material";

export default function DisplayStructure({
  title,
  description,
  onClose,
  children,
}) {
  const [expanded, setExpanded] = useState(false);

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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body2"
            sx={{
              flex: 1,
              whiteSpace: expanded ? "normal" : "nowrap",
              overflow: "hidden",
              textOverflow: expanded ? "clip" : "ellipsis",
              maxHeight: expanded ? "none" : 24,
              transition: "max-height 0.2s",
            }}
          >
            {description}
          </Typography>
          {description && (
            <Button
              size="small"
              onClick={() => setExpanded((v) => !v)}
              sx={{ ml: 2, minWidth: 80 }}
            >
              {expanded ? "Show less" : "Show more"}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
