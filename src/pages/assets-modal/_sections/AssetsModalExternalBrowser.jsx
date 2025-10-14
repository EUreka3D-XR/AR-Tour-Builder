import { MenuItem, Select, styled, Typography } from "@mui/material";

import LabeledInput from "@/components/labeled-input/LabeledInput";

const BrowsingContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 2, 0, 4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  overflow: "hidden",
}));

function AssetsModalExternalBrowser() {
  return (
    <BrowsingContent className="browsing-form">
      <LabeledInput
        id="external-source-label"
        label="External Source"
        labelPlacement="left"
      >
        <Select
          labelId="external-source-label"
          id="external-source-select"
          displayEmpty
          value=""
        >
          <MenuItem value="">Select a source</MenuItem>
        </Select>
      </LabeledInput>
      <Typography color="textSecondary" align="center" sx={{ mt: 20 }}>
        Select an external source to
        <br />
        browse available assets
      </Typography>
    </BrowsingContent>
  );
}

export default AssetsModalExternalBrowser;
