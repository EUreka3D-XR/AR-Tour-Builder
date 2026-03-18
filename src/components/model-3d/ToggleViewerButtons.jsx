import { useTranslation } from "react-i18next";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function ToggleViewerButtons({ mode, setMode }) {
  const { t } = useTranslation();
  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={(_, newMode) => {
        if (newMode !== null) setMode(newMode);
      }}
      sx={{
        "& .MuiToggleButton-root": {
          backgroundColor: "rgba(255,255,255,0.7)",
          color: "#000",
          transition: "background-color 0.3s",
          "&.Mui-selected": {
            backgroundColor: "rgba(255,255,255,0.9)",
            color: "#000",
            fontWeight: 700,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.85)",
            },
          },
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.85)",
          },
        },
      }}
    >
      <ToggleButton value="freelook">
        {t("model_viewer.mode.freelook")}
      </ToggleButton>
      <ToggleButton value="grid">{t("model_viewer.mode.grid")}</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ToggleViewerButtons;
