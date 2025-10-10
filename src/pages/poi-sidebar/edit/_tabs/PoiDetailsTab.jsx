import { styled, TextField } from "@mui/material";

import LabeledInput from "@/components/labeled-input/LabeledInput";
import LanguageDropdown from "@/components/language-dropdown/LanguageDropdown";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  "& .language-selector": {
    alignSelf: "flex-end",
  },
}));
function PoiDetailsTab() {
  return (
    <ContainerStyled>
      <LanguageDropdown className="language-selector" />
      <LabeledInput label="Title">
        <TextField placeholder="Enter title" fullWidth />
      </LabeledInput>
      <LabeledInput label="Description">
        <TextField
          placeholder="Enter description"
          fullWidth
          multiline
          rows={4}
        />
      </LabeledInput>
    </ContainerStyled>
  );
}

export default PoiDetailsTab;
