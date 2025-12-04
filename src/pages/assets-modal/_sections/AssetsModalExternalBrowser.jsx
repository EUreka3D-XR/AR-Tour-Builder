import { MenuItem, Select, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import LabeledInput from "@/components/labeled-input/LabeledInput";

const BrowsingContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 2, 0, 4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  overflow: "hidden",
}));

function AssetsModalExternalBrowser() {
  const { t } = useTranslation();

  return (
    <BrowsingContent className="browsing-form">
      <LabeledInput
        id="external-source-label"
        label={t("assetsModal.externalBrowser.sourceLabel")}
        labelPlacement="left"
      >
        <Select
          labelId="external-source-label"
          id="external-source-select"
          displayEmpty
          value=""
        >
          <MenuItem value="">{t("assetsModal.externalBrowser.selectSourcePlaceholder")}</MenuItem>
        </Select>
      </LabeledInput>
      <Typography color="textSecondary" align="center" sx={{ mt: 20 }}>
        {t("assetsModal.externalBrowser.description")}
      </Typography>
    </BrowsingContent>
  );
}

export default AssetsModalExternalBrowser;
