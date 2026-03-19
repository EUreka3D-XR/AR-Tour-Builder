import React from "react";
import { useTranslation } from "react-i18next";
import { styled, Typography } from "@mui/material";

const TransformGridStyled = styled("div")({
  label: "transform-grid",
  display: "grid",
  gridTemplateColumns: "auto 1fr 1fr 1fr",
  gap: "2px 12px",
  alignItems: "center",
});

function PropertiesShowcase({ transform }) {
  const { t } = useTranslation();

  if (!transform) return null;

  const rows = transform
    ? [
        { label: t("model_viewer.controls.position"), vec: transform.position },
        { label: t("model_viewer.controls.rotation"), vec: transform.rotation },
        { label: t("model_viewer.controls.scale"), vec: transform.scale },
      ]
    : [];
  return (
    <div>
      <Typography variant="h5">{t("model_viewer.properties_title")}</Typography>
      {transform && (
        <TransformGridStyled>
          {/* header row */}
          <span />
          {["X", "Y", "Z"].map((axis) => (
            <Typography
              key={axis}
              color="text.secondary"
              fontWeight="bold"
              textAlign="center"
            >
              {axis}
            </Typography>
          ))}
          {/* data rows */}
          {rows.map(({ label, vec }) => (
            <React.Fragment key={`${label}-label`}>
              <Typography color="text.secondary" fontWeight="bold">
                {label}
              </Typography>
              {["x", "y", "z"].map((axis) => (
                <Typography
                  key={`${label}-${axis}`}
                  color="text.secondary"
                  textAlign="center"
                >
                  {vec ? Number(vec[axis]).toFixed(4) : "—"}
                </Typography>
              ))}
            </React.Fragment>
          ))}
        </TransformGridStyled>
      )}
    </div>
  );
}

export default PropertiesShowcase;
