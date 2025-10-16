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
      <LabeledInput label="Quiz Links">
        <TextField placeholder="ex. https://quizlink.com/quiz/1" fullWidth />
      </LabeledInput>
      <LabeledInput label="External Sources and Links">
        <TextField
          placeholder="ex. https://archaeo-blogs.com/blog/1"
          fullWidth
        />
      </LabeledInput>
    </ContainerStyled>
  );
}

export default PoiDetailsTab;
