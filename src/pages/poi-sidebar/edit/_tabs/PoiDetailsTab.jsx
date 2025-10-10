import { styled, TextField } from "@mui/material";

import LabeledInput from "@/components/labeled-input/LabeledInput";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
}));
function PoiDetailsTab() {
  return (
    <ContainerStyled>
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
