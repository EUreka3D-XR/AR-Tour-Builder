import { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { lighten, styled, Typography } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import MediaIcon from "@/components/icon/MediaIcon";
import AssetMediaModal from "@/components/media-modal/asset-media/AssetMediaModal";
import MediaThumbnail from "@/components/media-thumbnail/MediaThumbnail";

const PresentationStyled = styled("div")(({ theme }) => ({
  "&.grid-view": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: theme.spacing(2),
  },
  "&.list-view": {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.5),
  },
}));

const GridAssetItem = styled("div")(({ theme }) => ({
  height: "180px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  transition: theme.transitions.create(["background-color", "box-shadow"], {
    duration: "0.1s",
    easing: theme.transitions.easing.easeOut,
  }),
  "&:hover": {
    boxShadow: theme.shadows[1],
  },
  "&.selected": {
    backgroundColor: lighten(theme.palette.primary.light, 0.8),
    boxShadow: theme.shadows[4],
  },
  "& .preview": {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    "& .media-preview-transparent": {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: theme.palette.background.default,
    },
  },
  "& .title-area": {
    flexShrink: 0,
    padding: theme.spacing(1),
  },
}));

const ListAssetItem = styled("div")(({ theme }) => ({
  padding: theme.spacing(0.5, 1.5),
  borderRadius: theme.shape.borderRadius,
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  cursor: "pointer",
  transition: theme.transitions.create(["background-color", "box-shadow"], {
    duration: "0.1s",
    easing: theme.transitions.easing.easeOut,
  }),
  "&:hover:not(.selected)": {
    backgroundColor: theme.palette.action.selected,
  },
  "&.selected": {
    backgroundColor: lighten(theme.palette.primary.light, 0.8),
  },

  "& .item-content": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(4),
    overflow: "hidden",
  },
  "& .preview-btn": {
    flexShrink: 0,
    opacity: 0,
    transition: "opacity 0.1s ease",
  },
  "&:hover .preview-btn": {
    opacity: 1,
  },
}));

/**
 *
 * @param {Object} props
 * @param {boolean} props.isListView - Toggle between list view and grid view
 * @param {boolean} props.allowMultiple - Allow multiple asset selection
 * @param {Function} props.setSelected - Function to set the selected assets
 * @param {{searchTerm: string; type: string; sortBy: 'title-asc' | 'title-desc'}} props.filters - Filters applied to the asset list
 * @param {Array<import("@/types/jsdoc-types").PoiAsset>} props.selected - List of currently selected assets
 * @param {Array<import("@/types/jsdoc-types").PoiAsset>} props.assets - List of assets to display
 * Each asset should have the following structure:
 * @returns
 */
function AssetsPresentation({
  isListView,
  setSelected,
  selected = [],
  assets = [],
  fetchState,
  allowMultiple,
}) {
  const { t } = useTranslation();
  const [previewAsset, setPreviewAsset] = useState(null);

  if (fetchState.isLoading) {
    return <div>{t("assetsModal.presentation.loading")}</div>;
  }

  if (fetchState.isError) {
    return <div>{t("assetsModal.presentation.error")}</div>;
  }

  if (!assets || assets.length === 0) {
    return <div>{t("assetsModal.presentation.noAssets")}</div>;
  }

  const filteredAssets = assets;

  const handleSelectAsset = (asset) => {
    if (allowMultiple) {
      setSelected((prevSelected) => {
        if (prevSelected.find((a) => a.id === asset.id)) {
          return prevSelected.filter((a) => a.id !== asset.id);
        } else {
          return [...prevSelected, asset];
        }
      });
    } else {
      setSelected([asset]);
    }
  };

  return (
    <>
      {previewAsset && (
        <AssetMediaModal
          url={previewAsset.contentUrl}
          type={previewAsset.type}
          onClose={() => setPreviewAsset(null)}
        />
      )}
      <PresentationStyled
        className={clsx("presentation-section", {
          "list-view": isListView,
          "grid-view": !isListView,
        })}
      >
        {isListView &&
          filteredAssets.map((asset) => {
            const isSelected = selected.some((a) => a.id === asset.id);
            return (
              <ListAssetItem
                key={asset.id}
                className={clsx("list-item", {
                  selected: isSelected,
                })}
                onClick={() => handleSelectAsset(asset)}
              >
                <MediaIcon type={asset.type} />
                <div className="item-content">
                  <Typography noWrap>{asset.title}</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    disableGutters
                    startIcon={
                      <EurekaIcon name="visibility" fontSize="small" />
                    }
                    className="preview-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewAsset(asset);
                    }}
                  >
                    Preview
                  </Button>
                </div>
              </ListAssetItem>
            );
          })}
        {!isListView &&
          filteredAssets.map((asset) => {
            const isSelected = selected.some((a) => a.id === asset.id);
            return (
              <GridAssetItem
                key={asset.id}
                className={clsx("grid-item", { selected: isSelected })}
                onClick={() => handleSelectAsset(asset)}
              >
                <div className="preview">
                  <MediaThumbnail
                    type={asset.type}
                    url={asset.url}
                    title={asset.title}
                    className="media-preview-transparent"
                  />
                </div>
                <div className="title-area">
                  <Typography noWrap>{asset.title}</Typography>
                </div>
              </GridAssetItem>
            );
          })}
      </PresentationStyled>
    </>
  );
}

export default AssetsPresentation;
