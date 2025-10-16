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

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The input element to be labeled.
 * @param {string} props.id - The id for the input element.
 * @param {string} props.label - The text for the label.
 * @param {string} [props.className] - Additional class names for the container.
 * @param {'top'|'left'} props.labelPlacement - Placement of the label relative to the input.
 * @returns
 */
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
