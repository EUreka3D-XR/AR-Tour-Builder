import React from "react";
import clsx from "clsx";
import { Button as MuiButton, styled } from "@mui/material";

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

function ButtonNewUnstyled({
  children,
  variant, // "filled", "outlined", "text" , "unstyled"
  color, // "primary", "secondary", "error", "success", "warning", "info", "inherit"
  corners = "square", // "round", "square"
  isLoading,
  isDisabled,
  isFullwidth,
  type, // "button", "submit", "reset"
  startIcon,
  endIcon,
  size, // "small", "medium", "large"
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
