import {
  Card,
  CardContent,
  IconButton,
  styled,
  Typography,
} from "@mui/material";

import EurekaIcon from "@/components/icon/EurekaIcon";

const CardStyled = styled(Card)(({ theme }) => ({
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  "&:hover": {
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  },
  "& .card-content": {
    padding: theme.spacing(2, 1.5, 0),
    "&:last-child": {
      paddingBottom: theme.spacing(0),
    },
  },
}));

const ContentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-center",
  gap: theme.spacing(2),
}));

const ContentSection = styled("div")(() => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
}));

const PoiNumber = styled("div")(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: "50%",
  backgroundColor: theme.palette.action.hover,
  color: theme.palette.text.secondary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 600,
  flexShrink: 0,
}));

const PoiTitle = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "1rem",
}));

const PoiDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
  lineHeight: 1.4,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const AssetsRow = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
  "& .asset-item": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    "& .asset-icon": {
      fontSize: "1rem",
    },
  },
}));

const CardFooter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: theme.spacing(1),
  padding: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const ActionButtons = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
}));

/**
 * POI Item Card component
 * @param {Object} props - Component props
 * @param {import("@/types/jsdoc-types").Poi} props.poi - POI data object
 * @param {boolean} [props.isOrderable=false] - Whether POI can be reordered
 * @param {number} [props.index] - POI index/number to display
 * @param {Function} [props.onMoveUp] - Callback for moving POI up
 * @param {Function} [props.onMoveDown] - Callback for moving POI down
 * @param {Function} [props.onEdit] - Callback for editing POI
 * @param {Function} [props.onDelete] - Callback for deleting POI
 * @returns {React.ReactElement} Rendered POI item card
 */
function PoiItem({
  poi,
  index = 1,
  isOrderable = true,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
  onCopy,
}) {
  // Get asset type counts for display
  const getAssetTypeIcon = (type) => {
    switch (type) {
      case "image":
        return "image";
      case "video":
        return "video";
      case "3d":
        return "model";
      case "audio":
        return "file";
      default:
        return "file";
    }
  };

  // Group assets by type and count them
  const assetCounts =
    poi?.assets?.reduce((acc, asset) => {
      const type = asset.type || "image";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {}) || {};

  return (
    <CardStyled className="poi-card">
      <CardContent className="card-content">
        <ContentContainer>
          {/* First flex item: POI Number */}
          {isOrderable && <PoiNumber>{index}</PoiNumber>}

          {/* Second flex item: Title, Description, and Media Icons */}
          <ContentSection>
            <PoiTitle variant="h6" component="h3">
              {poi?.title.locales.en || "Untitled POI"}
            </PoiTitle>
            <PoiDescription variant="body2">
              {poi?.description.locales.en || "No description available"}
            </PoiDescription>

            {/* Assets indicators */}
            {Object.keys(assetCounts).length > 0 && (
              <AssetsRow className="assets-row">
                {Object.entries(assetCounts).map(([type, count]) => (
                  <div key={type} className="asset-item">
                    <EurekaIcon
                      name={getAssetTypeIcon(type)}
                      className="asset-icon"
                    />
                    <Typography variant="caption">{count}</Typography>
                  </div>
                ))}
              </AssetsRow>
            )}
          </ContentSection>
        </ContentContainer>
      </CardContent>
      <CardFooter>
        {/* Ordering buttons on the left */}
        <ActionButtons>
          {isOrderable && (
            <>
              <IconButton size="small" disabled={!onMoveUp} onClick={onMoveUp}>
                <EurekaIcon name="arrowUp" fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                disabled={!onMoveDown}
                onClick={onMoveDown}
              >
                <EurekaIcon name="arrowDown" fontSize="small" />
              </IconButton>
            </>
          )}
        </ActionButtons>

        {/* Action buttons on the right */}
        <ActionButtons>
          <IconButton size="small" onClick={() => onCopy(poi.id)}>
            <EurekaIcon name="copy" fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onEdit(poi.id)}>
            <EurekaIcon name="edit" fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(poi.id)}>
            <EurekaIcon name="delete" fontSize="small" />
          </IconButton>
        </ActionButtons>
      </CardFooter>
    </CardStyled>
  );
}

export default PoiItem;
