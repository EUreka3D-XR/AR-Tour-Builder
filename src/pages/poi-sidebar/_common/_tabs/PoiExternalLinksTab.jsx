import { styled, TextField } from "@mui/material";

import LabeledInput from "@/components/labeled-input/LabeledInput";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  "& .language-selector": {
    alignSelf: "flex-end",
  },
}));

function PoiExternalLinksTab() {
  return (
    <ContainerStyled>
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

export default PoiExternalLinksTab;
