import clsx from "clsx";
import { Avatar, styled } from "@mui/material";

import { getFlagUrl } from "@/utils/localesUtils";

const ImageStyled = styled("img")(({ theme }) => ({
  objectFit: "cover",
  width: "1rem",
  aspectRatio: "4/3",
  "&.round": {
    borderRadius: theme.shape.borderRadius,
  },
  "&.circle": {
    borderRadius: "999px",
  },
  "&.small": {
    width: "0.75rem",
  },
  "&.large": {
    width: "1.5rem",
  },
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: "1rem",
  height: "1rem",
  aspectRatio: "1",
  "&.round": {
    borderRadius: theme.shape.borderRadius,
  },
  "&.small": {
    height: "0.75rem",
    width: "0.75rem",
  },
  "&.large": {
    height: "1.5rem",
    width: "1.5rem",
  },
}));

/**
 *
 * @param {Object} props
 * @param {Array} props.locales
 * @param {'square' | 'round' | 'circle'} props.variant - Shape variant of each flag avatar{
 * @param {string | number} props.width - Width of each flag avatar
 * @param {string | number} props.height - Height of each flag avatar
 * @param {"small" | "medium" | "large"} props.size - Size of each flag avatar
 * @returns
 */
function FlagIcon({
  className,
  locale,
  size = "normal",
  variant = "square",
  width,
  height,
}) {
  if (variant === "circle") {
    return (
      <AvatarStyled
        src={getFlagUrl(locale)}
        alt={`flag-${locale}`}
        width={width}
        height={height}
        className={clsx(size, className)}
      />
    );
  }
  return (
    <ImageStyled
      src={getFlagUrl(locale)}
      alt={`flag-${locale}`}
      width={width}
      height={height}
      className={clsx(size, variant, className)}
    />
  );
}

export default FlagIcon;
