import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

import Model3DViewer from "@/components/model-3d/Model3DViewer";

const fileUrl = "https://leomav.github.io/demo-assets/pc14/2015_34_1121_32.glb";

function DevPage() {
  const [url, setUrl] = useState(fileUrl);

  return (
    <Box
      sx={{
        p: 3,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "700px",
      }}
    >
      <Typography variant="h5">Dev - Model3DViewer</Typography>
      <TextField
        label="Model URL"
        placeholder="https://example.com/model.glb"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
      />
      <Box sx={{ height: "500px" }}>
        {url && (
          <Model3DViewer
            src={url}
            showControls
            initialTransform={{
              position: { x: 1, y: 1, z: 1 },
              rotation: { x: 0, y: 0, z: 0 },
              scale: { x: 1.5, y: 1, z: 1 },
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default DevPage;
