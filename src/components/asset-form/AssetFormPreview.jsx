import { useMemo } from "react";
import { styled } from "@mui/material";

import { allowedFileExtensions } from "@/utils/fileExtensions";
import MediaPreview from "../media-preview/MediaPreview";

const ContainerStyled = styled("div")(({ theme }) => ({
  label: "asset-form-preview-container",
  height: "400px",
  border: theme.shape.borderRadius,
  flexShrink: 0,
}));

function AssetFormPreview({ type, url }) {
  // const { routes, navigate } = useNavPaths();

  const isValidUrl = useMemo(() => {
    if (!url || typeof url !== "string") return false;

    // Check if valid URL
    try {
      new URL(url);
    } catch {
      return false;
    }

    // Check if has allowed extension
    const allowedExtensions = allowedFileExtensions[type];
    if (!allowedExtensions || allowedExtensions.length === 0) return false;

    const urlLower = url.toLowerCase();
    return allowedExtensions.some((ext) =>
      urlLower.endsWith(ext.value.toLowerCase()),
    );
  }, [type, url]);

  if (type === "text") return null;

  if (isValidUrl) {
    return (
      <ContainerStyled>
        <MediaPreview url={url} type={type} />
      </ContainerStyled>
    );
  }

  return null;
}

export default AssetFormPreview;
