import { Avatar, AvatarGroup } from "@mui/material";

import { getFlagUrl } from "@/utils/localesUtils";

/**
 *
 * @param {Object} props
 * @param {Array} props.locales
 * @param {number} props.show
 * @param {string | number} props.size - Size of each flag avatar
 * @param {"small" | "medium" | "large" | number} props.spacing - Same as AvatarGroup's spacing prop
 * @returns
 */
const FlagsGroup = ({
  locales = [],
  show = 2,
  spacing = "medium",
  size = "2rem",
}) => {
  return (
    <AvatarGroup
      spacing={spacing}
      total={locales.length}
      sx={{
        "& .MuiAvatar-root": {
          width: size,
          height: size,
          fontSize: "0.8rem",
        },
        // Ensures the "+N" surplus avatar matches the same size
        "& .MuiAvatarGroup-avatar": {
          width: size,
          height: size,
          fontSize: "0.8rem",
        },
      }}
    >
      {locales.slice(0, show).map((locale) => {
        return <Avatar key={locale} alt={locale} src={getFlagUrl(locale)} />;
      })}
    </AvatarGroup>
  );
};

export default FlagsGroup;
