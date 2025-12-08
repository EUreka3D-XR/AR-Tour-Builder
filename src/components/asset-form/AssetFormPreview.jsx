import { styled } from "@mui/material";

import MediaPreview from "../media-preview/MediaPreview";

const ContainerStyled = styled("div")(({ theme }) => ({
  label: "asset-form-preview-container",
  height: "250px",
  width: "350px",
  border: theme.shape.borderRadius,
  flexShrink: 0,
}));

function AssetFormPreview({ type, url }) {
  if (type === "text") return null;

  return (
    <ContainerStyled>
      <MediaPreview url={url} type={type} />
    </ContainerStyled>
  );
}

export default AssetFormPreview;
