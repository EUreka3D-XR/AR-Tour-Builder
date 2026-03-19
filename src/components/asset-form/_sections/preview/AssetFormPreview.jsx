import { useTranslation } from "react-i18next";
import { useFormContext, useWatch } from "react-hook-form";
import { Stack, styled, Typography } from "@mui/material";

import MediaPreview from "@/components/media-preview/MediaPreview";
import EditModelTransformButton from "./EditModelTransformButton";

const ContainerStyled = styled("div")(({ theme }) => ({
  label: "asset-form-preview-container",
  height: "250px",
  width: "350px",
  border: theme.shape.borderRadius,
  flexShrink: 0,
}));

const TransformGridStyled = styled("div")({
  label: "transform-grid",
  display: "grid",
  gridTemplateColumns: "auto 1fr 1fr 1fr",
  gap: "2px 12px",
  alignItems: "center",
});

function AssetFormPreview({ type, url }) {
  const { t } = useTranslation();
  const transform = useWatch({ name: "modelTransform" });
  const { setValue } = useFormContext();

  if (type === "text") return null;

  const showModelTransform = type === "model3d";

  const handleTransformSave = (updatedTransform) => {
    // Update the form state with the new transform values
    setValue("modelTransform", updatedTransform);
  };

  const rows = transform
    ? [
        { label: t("model_viewer.controls.position"), vec: transform.position },
        { label: t("model_viewer.controls.rotation"), vec: transform.rotation },
        { label: t("model_viewer.controls.scale"), vec: transform.scale },
      ]
    : [];

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
      {showModelTransform && (
        <Stack spacing={1.5} alignItems="flex-start">
          <Typography variant="h5">
            {t("model_viewer.properties_title")}
          </Typography>
          {transform && (
            <TransformGridStyled>
              {/* header row */}
              <span />
              {["X", "Y", "Z"].map((axis) => (
                <Typography
                  key={axis}
                  // variant="caption"
                  color="text.secondary"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {axis}
                </Typography>
              ))}
              {/* data rows */}
              {rows.map(({ label, vec }) => (
                <>
                  <Typography
                    key={`${label}-label`}
                    // variant="caption"
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    {label}
                  </Typography>
                  {["x", "y", "z"].map((axis) => (
                    <Typography
                      key={`${label}-${axis}`}
                      // variant="caption"
                      color="text.secondary"
                      textAlign="center"
                    >
                      {vec ? Number(vec[axis]).toFixed(4) : "—"}
                    </Typography>
                  ))}
                </>
              ))}
            </TransformGridStyled>
          )}
          <EditModelTransformButton
            url={url}
            initialTransform={transform}
            onSave={handleTransformSave}
          />
        </Stack>
      )}
    </Stack>
  );
}

export default AssetFormPreview;
