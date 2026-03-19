import { Stack, styled } from "@mui/material";

import MediaPreview from "@/components/media-preview/MediaPreview";
import EditModelTransformButton from "./EditModelTransformButton";

const ContainerStyled = styled("div")(({ theme }) => ({
  label: "asset-form-preview-container",
  height: "250px",
  width: "350px",
  border: theme.shape.borderRadius,
  flexShrink: 0,
}));

const mockTransform = {
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
};

function AssetFormPreview({ type, url }) {
  if (type === "text") return null;

  const showModelTransformButton = type === "model3d";

  return (
    <Stack
      direction="row"
      alignItems="flex-end"
      spacing={2}
      sx={{ width: "100%" }}
    >
      <ContainerStyled>
        <MediaPreview url={url} type={type} />
      </ContainerStyled>
      {showModelTransformButton && (
        <EditModelTransformButton url={url} initialTransform={mockTransform} />
      )}
    </Stack>
  );
}

export default AssetFormPreview;
