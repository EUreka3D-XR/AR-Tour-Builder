import clsx from "clsx";
import { Button as MuiButton, styled } from "@mui/material";

import Link from "../link/Link";

/**
 * Props for ButtonNewUnstyled component
 * @typedef {Object} ButtonNewUnstyledProps
 * @property {React.ReactNode} children - Button content
 * @property {'filled'|'outlined'|'text'|'unstyled'} variant - Button style variant
 * @property {'primary'|'secondary'|'error'|'success'|'warning'|'info'|'inherit'} [color] - Button color theme
 * @property {'round'|'square'} [corners='square'] - Button corner style
 * @property {boolean} [disableGutters] - Button gutter style
 * @property {boolean} [isLoading] - Loading state
 * @property {boolean} [isDisabled] - Disabled state
 * @property {boolean} [isFullwidth] - Full width button
 * @property {'button'|'submit'|'reset'} [type] - HTML button type attribute
 * @property {string} [form] - HTML form attribute
 * @property {string} [href] - URL for link button
 * @property {string} [target] - Link target attribute
 * @property {string} [rel] - Link rel attribute
 * @property {React.ReactNode} [startIcon] - Icon at the start of button
 * @property {React.ReactNode} [endIcon] - Icon at the end of button
 * @property {'small'|'medium'|'large'} [size] - Button size
 * @property {Function} [onClick] - Click event handler
 * @property {string} [className] - Additional CSS classes
 */

const ButtonStyled = styled(MuiButton)(({ theme }) => ({
  borderRadius: "3rem",
  whiteSpace: "nowrap",
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  "&.square": {
    borderRadius: "0.25rem",
  },
  "&.btn-unstyled": {
    background: "none",
    color: "inherit",
    border: "none",
    padding: 0,
    font: "inherit",
    cursor: "pointer",
    outline: "inherit",
    "&:disabled": {
      cursor: "default",
      opacity: 0.5,
    },
  },
  "&.outlined": {
    backgroundColor: theme.palette.background.default,
  },
  "&.disable-gutters": {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const VARIANTS_DICT = {
  filled: "contained",
  outlined: "outlined",
  text: "text",
};

/**
 * Unstyled button component with comprehensive styling options
 * @param {ButtonNewUnstyledProps} props - Button props
 * @returns {React.ReactElement} Rendered button component
 */
function ButtonNewUnstyled({
  children,
  variant = "outlined",
  color,
  corners = "square",
  isLoading,
  isDisabled,
  isFullwidth,
  disableGutters,
  type,
  href,
  startIcon,
  endIcon,
  size,
  form,
  onClick,
  className,
}) {
  return (
    <ButtonStyled
      variant={VARIANTS_DICT[variant]}
      color={color}
      fullWidth={isFullwidth}
      loading={isLoading}
      disabled={isDisabled}
      type={type}
      startIcon={startIcon}
      size={size}
      form={form}
      endIcon={endIcon}
      className={clsx(className, variant, corners, {
        "btn-unstyled": variant === "unstyled",
        "disable-gutters": disableGutters,
      })}
      {...(href ? { component: Link, to: href } : {})}
      onClick={onClick}
    >
      {children}
    </ButtonStyled>
  );
}

const Button = styled(ButtonNewUnstyled)({});

export default Button;
