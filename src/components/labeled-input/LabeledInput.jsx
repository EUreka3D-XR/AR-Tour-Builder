import clsx from "clsx";
import { InputLabel, styled } from "@mui/material";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  "&.top": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  "&.left": {
    flexDirection: "row",
    alignItems: "center",
  },
}));

function LabeledInputUnstyled({
  children,
  id,
  label,
  className,
  labelPlacement = "top",
}) {
  return (
    <ContainerStyled
      className={clsx("input-label-container", labelPlacement, className)}
    >
      <InputLabel id={id}>{label}</InputLabel>
      {children}
    </ContainerStyled>
  );
}

const LabeledInput = styled(LabeledInputUnstyled)({});

export default LabeledInput;
