import { useFormContext, useWatch } from "react-hook-form";
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

function AssetFormPreview({ type, url }) {
  const transform = useWatch({ name: "modelTransform" });
  const isGeoreferenced = useWatch({ name: "isGeoreferenced" });
  const { setValue } = useFormContext();

  if (type === "text") return null;

  const showModelTransformButton = isGeoreferenced && type === "model3d";

  const handleTransformSave = (updatedTransform) => {
    // Update the form state with the new transform values
    setValue("modelTransform", updatedTransform);
  };

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
        <EditModelTransformButton
          url={url}
          initialTransform={transform}
          onSave={handleTransformSave}
        />
      )}
    </Stack>
  );
}

export default AssetFormPreview;
