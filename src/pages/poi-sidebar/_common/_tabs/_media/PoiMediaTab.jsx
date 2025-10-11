import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getMockPoiAssets } from "@/api/mock/mock-data/assetsMocks";
import AssetsModal from "@/pages/assets-modal/modal";
import { Menu, MenuItem, styled, Typography } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import { useToggle } from "@/hooks/useToggle";
import MediaCardItem from "./MediaCardItem";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  "& .top-row": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& .media-list": {
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

function PoiMediaTab() {
  const [mockAssets, setMockAssets] = useState();

  useEffect(() => {
    setMockAssets(getMockPoiAssets(10));
  }, []);

  return (
    <ContainerStyled>
      <div className="top-row">
        <Typography component="h3" variant="h4">
          Current Media Assets
        </Typography>
        <AddMediaButton />
      </div>
      <div className="media-list">
        {/* Render media card items here */}
        {mockAssets &&
          mockAssets
            .filter((asset) => asset.type !== "audio")
            .map((asset) => <MediaCardItem key={asset.id} asset={asset} />)}
      </div>
    </ContainerStyled>
  );
}

export default PoiMediaTab;

function AddMediaButton() {
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
        Add
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
          Create New
        </MenuItemStyled>
        <MenuItemStyled onClick={handleBrowseLibrary}>
          <EurekaIcon name="browse" color="primary" />
          Browse Library
        </MenuItemStyled>
      </Menu>
      {isOpen && <AssetsModal allowMultiple onClose={close} />}
    </>
  );
}
