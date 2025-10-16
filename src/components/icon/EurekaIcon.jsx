import { Icon as MuiIcon, styled } from "@mui/material";

import { icons } from "./icons";

const VARIANTS = {
  filled: "material-icons",
  outlined: "material-icons-outlined",
};

/**
 * EurekaIcon component props
 * @typedef {Object} EurekaIconProps
 * @property {'outlined'|'filled'} [variant] - Icon variant style
 * @property {string} [className] - CSS class name
 * @property {'inherit'|'action'|'disabled'|'primary'|'secondary'|'error'|'info'|'success'|'warning'} [color] - Icon color
 * @property {'inherit'|'large'|'medium'|'small'} [fontSize] - Icon font size
 * @property {import("@/components/icon/icons").IconName} name - Icon name from icons collection
 */

/**
 * @param {EurekaIconProps} props
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
      {icons[name]}
    </MuiIcon>
  );
}

const EurekaIcon = styled(IconUnstyled)({});

export default EurekaIcon;
