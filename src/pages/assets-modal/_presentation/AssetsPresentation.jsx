import clsx from "clsx";
import { styled, Typography } from "@mui/material";

import MediaIcon from "@/components/icon/MediaIcon";
import MediaPreview from "@/components/media-preview/MediaPreview";

const PresentationStyled = styled("div")(({ theme }) => ({
  "&.grid-view": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: theme.spacing(2),
  },
  "&.list-view": {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
}));

const GridAssetItem = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  "&.selected": {
    borderColor: theme.palette.primary.main,
    boxShadow: theme.shadows[4],
  },
  "& .preview": {
    flex: 1,
    width: "100%",
  },
  "& .title": {
    flexShrink: 0,
    padding: theme.spacing(1),
  },
}));

const ListAssetItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  cursor: "pointer",
  "&.selected": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const assets = [];

/**
 *
 * @param {Object} props
 * @param {boolean} props.isListView - Toggle between list view and grid view
 * @param {boolean} props.allowMultiple - Allow multiple asset selection
 * @param {Function} props.setSelected - Function to set the selected assets
 * @param {Array<import("@/types/jsdoc-types").PoiAsset>} props.selected - List of currently selected assets
 * @param {Array<import("@/types/jsdoc-types").PoiAsset>} props.assets - List of assets to display
 * Each asset should have the following structure:
 * @returns
 */
function AssetsPresentation({
  isListView,
  setSelected,
  selected = [],
  allowMultiple,
}) {
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
    <PresentationStyled
      className={clsx("presentation-section", {
        "list-view": isListView,
        "grid-view": !isListView,
      })}
    >
      {isListView &&
        assets.map((asset) => {
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
              <Typography nowrap>{asset.title}</Typography>
            </ListAssetItem>
          );
        })}
      {!isListView &&
        assets.map((asset) => {
          const isSelected = selected.some((a) => a.id === asset.id);
          return (
            <GridAssetItem
              key={asset.id}
              className={clsx("grid-item", { selected: isSelected })}
              onClick={() => handleSelectAsset(asset)}
            >
              <div className="preview">
                <MediaPreview
                  type={asset.type}
                  url={asset.url}
                  title={asset.title}
                />
              </div>
              <Typography nowrap>{asset.title}</Typography>
            </GridAssetItem>
          );
        })}
    </PresentationStyled>
  );
}

export default AssetsPresentation;
