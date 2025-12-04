import { useState } from "react";
import { useSearchParams } from "react-router";
import AssetsModal from "@/pages/assets-modal/modal";
import { Menu, MenuItem, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import { useToggle } from "@/hooks/useToggle";

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

function AddMediaButton() {
  const { t } = useTranslation();
  const [, setSearchParams] = useSearchParams();
  const { isOpen, open, close } = useToggle();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCreateNew = () => {
    setSearchParams((prev) => {
      prev.set("mediaForm", "new");
      return prev;
    });
    handleMenuClose();
  };

  const handleBrowseLibrary = () => {
    handleMenuClose();
    open();
  };

  const handleBrowserClose = (selectedAssets = []) => {
    if (selectedAssets.length) {
      const selectedAssetId = selectedAssets[0].id;
      setSearchParams((prev) => {
        prev.set("mediaForm", "new");
        prev.set("libraryMedia", selectedAssetId);
        return prev;
      });
    }
    close();
  };
  return (
    <>
      <Button
        disableGutters
        startIcon={<EurekaIcon name="add" />}
        onClick={handleButtonClick}
        aria-controls={isMenuOpen ? "add-media-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
      >
        {t("poiSidebar.addMediaButton.add")}
      </Button>
      <Menu
        id="add-media-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: { mt: 1 },
          },
        }}
      >
        <MenuItemStyled onClick={handleCreateNew}>
          <EurekaIcon name="add" color="success" />
          {t("poiSidebar.addMediaButton.createNew")}
        </MenuItemStyled>
        <MenuItemStyled onClick={handleBrowseLibrary}>
          <EurekaIcon name="browse" color="primary" />
          {t("poiSidebar.addMediaButton.browseLibrary")}
        </MenuItemStyled>
      </Menu>
      {isOpen && <AssetsModal onClose={handleBrowserClose} />}
    </>
  );
}
export default AddMediaButton;
