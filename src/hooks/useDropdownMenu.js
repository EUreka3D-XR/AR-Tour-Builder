import { useMemo, useState } from "react";

export const useDropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState();
  const isOpen = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const open = (event) => {
    event?.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const close = () => {
    setAnchorEl(null);
  };

  return { isOpen, anchorEl, open, close };
};
