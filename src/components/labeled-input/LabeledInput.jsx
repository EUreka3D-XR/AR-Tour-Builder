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
  "& .label-wrapper": {
    display: "flex",
    alignItems: "center",
    "& .icon-wrapper": {
      marginRight: "0.25rem",
      display: "flex",
      alignItems: "center",
    },
  },
}));

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The input element to be labeled.
 * @param {string} props.id - The id for the input element.
 * @param {string } props.label - The text for the label.
 * @param {React.ReactNode} [props.labelIcon] - The icon for the label.
 * @param {string} [props.className] - Additional class names for the container.
 * @param {'top'|'left'} props.labelPlacement - Placement of the label relative to the input.
 * @returns
 */
function LabeledInputUnstyled({
  children,
  id,
  label,
  labelIcon,
  className,
  labelPlacement = "top",
}) {
  return (
    <ContainerStyled
      className={clsx("input-label-container", labelPlacement, className)}
    >
      <InputLabel id={id}>
        <span className="label-wrapper">
          {labelIcon && <div className="icon-wrapper">{labelIcon}</div>}
          <span>{label}</span>
        </span>
      </InputLabel>
      {children}
    </ContainerStyled>
  );
}

const LabeledInput = styled(LabeledInputUnstyled)({});

export default LabeledInput;
