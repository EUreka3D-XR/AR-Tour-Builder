import { useMemo } from "react";
import clsx from "clsx";
import { styled } from "@mui/material";

const getLanguageImagePath = (code) => {
  return `/flags/${code}.webp`;
};

const ImageStyled = styled("img")({
  width: "1rem",
  "&.round": {
    borderRadius: "50%",
  },
  "&.small": {
    width: "0.75rem",
  },
  "&.large": {
    width: "1.5rem",
  },
});

/**
 *
 * @param {Object} props
 * @param {string} props.code - Language code (e.g., 'en', 'el')
 * @param {string} [props.className] - Additional CSS classes
 * @param {('square'|'round')} [props.variant='square'] - Icon shape variant
 * @param {('small'|'normal'|'large')} [props.size='normal'] - Icon size
 * @returns
 */
function LanguageIcon({
  code,
  className,
  variant = "square",
  size = "normal",
}) {
  const language = useMemo(
    () => ({
      name: code.toUpperCase(),
      image: getLanguageImagePath(code),
    }),
    [code],
  );

  return (
    <ImageStyled
      src={language.image}
      alt={language.name + " language"}
      className={clsx(variant, size, className)}
    />
  );
}

export default LanguageIcon;
