import { useParams } from "react-router";
import {
  Card,
  CardContent,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useConfirm } from "@/stores/confirmation-modal-stores";
import { useDeleteTourPoi } from "@/services/poiService";
import EurekaIcon from "@/components/icon/EurekaIcon";
import MediaCounter from "@/components/media-counter/MediaCounter";

const CardStyled = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
  "&:hover": {
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transform: "translateY(-2px)",
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
  marginTop: theme.spacing(1),
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
 * @param {Function} [props.onClick] - Callback for clicking on POI
 * @returns {React.ReactElement} Rendered POI item card
 */
function PoiItem({
  poi,
  index = 1,
  isOrderable,
  isMoveUpDisabled,
  isMoveDownDisabled,
  onMoveUp,
  onMoveDown,
  onEdit,
  onCopy,
  onRemove,
  onClick,
}) {
  const { t } = useTranslation();
  const { tourId } = useParams();
  const confirm = useConfirm();
  const { mutate: deletePoi } = useDeleteTourPoi(tourId, poi.id);

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: t("tour.pois.deleteConfirm.title"),
      message: t("tour.pois.deleteConfirm.message"),
      confirmText: t("tour.pois.deleteConfirm.confirmText"),
      action: deletePoi,
    });
    if (confirmed) onRemove(poi.id);
  };

  // Group assets by type and count them
  // const assetCounts =
  //   poi?.assets?.reduce((acc, asset) => {
  //     const type = asset.type || "image";
  //     acc[type] = (acc[type] || 0) + 1;
  //     return acc;
  //   }, {}) || {};

  return (
    <CardStyled className="poi-card" onClick={() => onClick(poi.id)}>
      <CardContent className="card-content">
        <ContentContainer>
          {/* First flex item: POI Number */}
          {isOrderable && <PoiNumber>{index}</PoiNumber>}

          {/* Second flex item: Title, Description, and Media Icons */}
          <ContentSection>
            <PoiTitle variant="h6" component="h3">
              {poi?.title.locales.en || t("tour.pois.item.untitled")}
            </PoiTitle>
            <PoiDescription variant="body2">
              {poi?.description.locales.en || t("tour.pois.item.noDescription")}
            </PoiDescription>

            <AssetsRow className="assets-row">
              <MediaCounter
                images={poi.stats.image}
                videos={poi.stats.video}
                documents={poi.stats.text}
                audios={poi.stats.audio}
                models={poi.stats.model3d}
                noColor
              />
            </AssetsRow>
          </ContentSection>
        </ContentContainer>
      </CardContent>
      <CardFooter>
        {/* Ordering buttons on the left */}
        <ActionButtons>
          {isOrderable && (
            <>
              <IconButtonCustom
                size="small"
                disabled={isMoveUpDisabled || !onMoveUp}
                onClick={onMoveUp}
              >
                <EurekaIcon name="arrowUp" fontSize="small" />
              </IconButtonCustom>
              <IconButtonCustom
                size="small"
                disabled={isMoveDownDisabled || !onMoveDown}
                onClick={onMoveDown}
              >
                <EurekaIcon name="arrowDown" fontSize="small" />
              </IconButtonCustom>
            </>
          )}
        </ActionButtons>

        {/* Action buttons on the right */}
        <ActionButtons>
          <IconButtonCustom size="small" onClick={() => onCopy(poi.id)}>
            <EurekaIcon name="copy" fontSize="small" />
          </IconButtonCustom>
          <IconButtonCustom size="small" onClick={() => onEdit(poi.id)}>
            <EurekaIcon name="edit" fontSize="small" />
          </IconButtonCustom>
          <IconButtonCustom size="small" onClick={handleDelete}>
            <EurekaIcon name="delete" fontSize="small" />
          </IconButtonCustom>
        </ActionButtons>
      </CardFooter>
    </CardStyled>
  );
}

export default PoiItem;

const IconButtonCustom = (props) => (
  <IconButton
    size="small"
    {...props}
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      props.onClick();
    }}
  />
);
