import clsx from "clsx";
import { Button as MuiButton, styled } from "@mui/material";

/**
 * Props for ButtonNewUnstyled component
 * @typedef {Object} ButtonNewUnstyledProps
 * @property {React.ReactNode} children - Button content
 * @property {'filled'|'outlined'|'text'|'unstyled'} variant - Button style variant
 * @property {'primary'|'secondary'|'error'|'success'|'warning'|'info'|'inherit'} [color] - Button color theme
 * @property {'round'|'square'} [corners='square'] - Button corner style
 * @property {boolean} [isLoading] - Loading state
 * @property {boolean} [isDisabled] - Disabled state
 * @property {boolean} [isFullwidth] - Full width button
 * @property {'button'|'submit'|'reset'} [type] - HTML button type attribute
 * @property {React.ReactNode} [startIcon] - Icon at the start of button
 * @property {React.ReactNode} [endIcon] - Icon at the end of button
 * @property {'small'|'medium'|'large'} [size] - Button size
 * @property {Function} [onClick] - Click event handler
 * @property {string} [className] - Additional CSS classes
 */

const ButtonStyled = styled(MuiButton)({
  borderRadius: "3rem",
  whiteSpace: "nowrap",
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
});

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
  variant,
  color,
  corners = "square",
  isLoading,
  isDisabled,
  isFullwidth,
  type,
  startIcon,
  endIcon,
  size,
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
      endIcon={endIcon}
      className={clsx(className, variant, corners, {
        "btn-unstyled": variant === "unstyled",
      })}
      onClick={onClick}
    >
      {children}
    </ButtonStyled>
  );
}

const Button = styled(ButtonNewUnstyled)({});

export default Button;
