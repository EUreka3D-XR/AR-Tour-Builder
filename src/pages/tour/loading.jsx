import { keyframes } from "@emotion/react";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";

import CenteredArea from "@/components/centered/Centered";
import EurekaIcon from "@/components/icon/EurekaIcon";

const pulseAnim = keyframes`
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-6%) scale(1.06); }
  100% { transform: translateY(0) scale(1); }
`;

function TourPageLoading() {
  return (
    <CenteredArea>
      <Stack spacing={2} alignItems="center" sx={{ mt: -12 }}>
        <Box
          component="span"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transformOrigin: "center",
            animation: `${pulseAnim} 1.6s ease-in-out infinite`,
            // Respect reduced motion preference
            "@media (prefers-reduced-motion: reduce)": {
              animation: "none",
            },
          }}
        >
          <EurekaIcon name="tour" variant="filled" sx={{ fontSize: "120px" }} />
        </Box>
        <Stack spacing={4} alignItems="center">
          <Typography variant="h3" fontWeight={400}>
            Loading Tour...
          </Typography>
          <LinearProgress sx={{ flexShrink: 0, width: "100%" }} />
        </Stack>
      </Stack>
    </CenteredArea>
  );
}

export default TourPageLoading;
