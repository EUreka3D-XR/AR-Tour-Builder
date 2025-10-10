import { InputLabel, styled } from "@mui/material";

const ContainerStyled = styled("div")(({ theme }) => ({
  "& label": {
    marginBottom: theme.spacing(1),
  },
}));

function LabeledInput({ label, children }) {
  return (
    <ContainerStyled className="input-label-container">
      <InputLabel>{label}</InputLabel>
      {children}
    </ContainerStyled>
  );
}

export default LabeledInput;
