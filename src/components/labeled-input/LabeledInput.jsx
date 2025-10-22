import clsx from "clsx";
import { InputLabel, styled } from "@mui/material";

import EurekaIcon from "../icon/EurekaIcon";
import { icons } from "../icon/icons";

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
      "& .label-icon": {
        color: theme.palette.text.secondary,
      },
    },
  },
}));

/**
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The input element to be labeled.
 * @param {string} props.id - The id for the input element.
 * @param {string } props.label - The text for the label.
 * @param {import("../icon/icons").IconName} [props.labelIcon] - The icon name for the label.
 * @param {boolean} [props.isMultilingual] - Whether to show the multilingual icon.
 * @param {string} [props.className] - Additional class names for the container.
 * @param {'top'|'left'} props.labelPlacement - Placement of the label relative to the input.
 * @returns
 */
function LabeledInputUnstyled({
  children,
  id,
  label,
  labelIcon: propIcon,
  className,
  isMultilingual,
  labelPlacement = "top",
}) {
  const labelIcon = isMultilingual ? icons.language : propIcon;

  return (
    <ContainerStyled
      className={clsx("input-label-container", labelPlacement, className)}
    >
      <InputLabel id={id}>
        <span className="label-wrapper">
          {labelIcon && (
            <div className="icon-wrapper">
              <EurekaIcon
                name={labelIcon}
                fontSize="small"
                className="label-icon"
              />
            </div>
          )}
          <span>{label}</span>
        </span>
      </InputLabel>
      {children}
    </ContainerStyled>
  );
}

const LabeledInput = styled(LabeledInputUnstyled)({});

export default LabeledInput;
