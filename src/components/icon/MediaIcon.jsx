import clsx from "clsx";
import { styled } from "@mui/material";

import EurekaIcon from "./EurekaIcon";

const EurekaIconStyled = styled(EurekaIcon)(({ theme }) => ({
  "&.icon-image": {
    color: theme.palette.primary.light,
  },
  "&.icon-video": {
    color: theme.palette.secondary.light,
  },
  "&.icon-audio": {
    color: theme.palette.error.light,
  },
  "&.icon-text": {
    color: theme.palette.success.light,
  },
  "&.icon-3d": {
    color: theme.palette.warning.light,
  },
  "&.no-color": {
    color: "inherit",
  },
}));

const MediaIconsNames = {
  image: "image",
  video: "video",
  "3d": "model",
  audio: "audio",
  text: "document",
};

/**
 * MediaIcon component props
 * @typedef {Omit<import("./EurekaIcon").EurekaIconProps, 'name'> & {
 *   type: 'image'|'video'|'3d'|'audio'|'text',
 *   noColor?: boolean
 * }} MediaIconProps
 */

/**
 * @param {MediaIconProps} props
 * @returns {JSX.Element}
 */
function MediaIcon({ type, noColor, className, ...props }) {
  return (
    <EurekaIconStyled
      {...props}
      name={MediaIconsNames[type]}
      className={clsx(`icon-${type}`, { "no-color": noColor }, className)}
    />
  );
}

export default MediaIcon;
