import { InputLabel, styled } from "@mui/material";

const ContainerStyled = styled("div")({});

function LabeledInput({ label, children }) {
  return (
    <ContainerStyled className="input-label-container">
      <InputLabel>{label}</InputLabel>
      {children}
    </ContainerStyled>
  );
}

export default LabeledInput;
