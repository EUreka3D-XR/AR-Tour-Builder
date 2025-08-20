import { Icon as MuiIcon, styled } from "@mui/material";

const VARIANTS = {
  filled: "material-icons",
  outlined: "material-icons-outlined",
};

/**
 * @param {Object} props
 * @param {'outlined'|'filled'} props.variant
 * @param {string} props.className
 * @param {'inherit'|'action'|'disabled'|'primary'|'secondary'|'error'|'info'|'success'|'warning'} props.color
 * @param {'inherit'|'large'|'medium'|'small'} props.fontSize
 * @param {import("@/components/icon/icons").IconName} props.name
 * @returns {JSX.Element}
 */
function IconUnstyled({ variant, className, color, fontSize, name }) {
  return (
    <MuiIcon
      color={color}
      fontSize={fontSize}
      baseClassName={VARIANTS[variant]}
      className={className}
    >
      {name}
    </MuiIcon>
  );
}

const EurekaIcon = styled(IconUnstyled)({});

export default EurekaIcon;
