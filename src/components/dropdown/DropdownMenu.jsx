import { useState } from "react";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { Menu, MenuItem, styled } from "@mui/material";

import EurekaIcon from "../icon/EurekaIcon";

/**
 * @typedef {Object} DropdownMenuItem
 * @property {string} label - The display label for the menu item
 * @property {function} [onClick] - The click handler function for the menu item
 * @property {string} [href] - Optional URL for the menu item
 * @property {boolean} [disabled] - Whether the menu item is disabled
 * @property {import("@/components/icon/icons").IconName} [iconName] - Optional icon to display alongside the label
 * @property {string} [iconVariant] - Variant of the icon ('outlined'|'filled')
 * @property {string} [className] - Optional additional class name for the menu item
 */

/**
 * @typedef {function({
 *   id: string,
 *   anchorEl: HTMLElement | null,
 *   "aria-controls"?: string,
 *   "aria-haspopup": string,
 *   "aria-expanded"?: string,
 *   isOpen: boolean,
 *   toggle: function,
 *   close: function,
 * }): React.ReactNode} DropdownMenuChildrenFn
 */

/**
 *
 * @param {Object} props
 * @param {DropdownMenuChildrenFn} props.children - Render prop for the dropdown trigger element
 * @param {string} props.id - Unique identifier for the dropdown menu
 * @param {DropdownMenuItem[]} [props.items] - Array of items to display in the dropdown menu
 * @param {function} [props.renderer] - Optional custom renderer function for menu items
 * @param {string} [props.className] - Optional additional class name for the menu
 * @param {string} [props.itemClassName] - Optional additional class name for each menu item
 * @returns
 */
function DropdownMenu({
  children,
  id,
  items = [],
  renderer,
  className,
  itemClassName,
}) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    if (item.href) {
      navigate(item.href);
    }
    handleClose();
  };

  return (
    <>
      {children({
        id,
        anchorEl,
        "aria-controls": open ? `${id}-menu` : undefined,
        "aria-haspopup": "true",
        "aria-expanded": open ? "true" : undefined,
        isOpen: open,
        toggle: handleClick,
        close: handleClose,
      })}
      <Menu
        id={`${id}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": `${id}-button`,
          },
        }}
        className={clsx("dropdown-menu", className)}
      >
        {items.map((item, index) =>
          renderer ? (
            renderer(item, index, handleClose)
          ) : (
            <MenuItemStyled
              key={index}
              disabled={item.disabled}
              className={clsx("dropdown-menu-item", itemClassName)}
              onClick={() => handleItemClick(item)}
            >
              {item.iconName && (
                <EurekaIcon name={item.iconName} variant={item.iconVariant} />
              )}
              {item.label}
            </MenuItemStyled>
          ),
        )}
      </Menu>
    </>
  );
}

export default DropdownMenu;

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  label: "dropdown-menu-item",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  minWidth: "200px",
}));
