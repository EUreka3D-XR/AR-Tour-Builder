import { useParams } from "react-router";
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  lighten,
  styled,
  Typography,
} from "@mui/material";

import { useAssetModal } from "@/stores/asset-modal-stores";
import { useConfirm } from "@/stores/confirmation-modal-stores";
import { useDeletePoiAsset } from "@/services/assetsService";
import EurekaIcon from "@/components/icon/EurekaIcon";
import InjectedLocaleValue from "@/components/inject-locale-value/InjectLocaleValue";
import MediaThumbnail from "@/components/media-thumbnail/MediaThumbnail";
import { useLocale } from "@/hooks/useLocale";
import { localeValue } from "@/utils/inputLocale";

const CardStyled = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
  cursor: "pointer",
  "&:hover": {
    boxShadow: theme.shadows[2],
  },
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(1),
  "&:last-child": {
    paddingBottom: theme.spacing(1),
  },
  display: "flex",
  gap: theme.spacing(2),
}));

const MediaThumbnailStyled = styled(MediaThumbnail)({
  width: 80,
  height: 80,
});

const PillStyled = styled(Chip)(({ theme }) => ({
  fontSize: "0.75rem",
  height: 20,
  fontWeight: 600,
  "&.ar-pill": {
    backgroundColor: lighten(theme.palette.secondary.light, 0.7),
    color: theme.palette.secondary.dark,
  },
  "&.georeference-pill": {
    backgroundColor: lighten(theme.palette.info.light, 0.7),
    color: theme.palette.info.dark,
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: theme.spacing(1, 1, 1, 0),
}));

const HeaderRow = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 8,
}));

const TitleSection = styled(Box)(() => ({
  flex: 1,
  minWidth: 0, // Allow text truncation
}));

const ActionButtons = styled(Box)(() => ({
  display: "flex",
  gap: 1,
  flexShrink: 0,
}));

const PillsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  flexWrap: "wrap",
}));

const MediaTitle = styled(Typography)(() => ({
  fontWeight: 600,
  lineHeight: 1.2,
}));

const MediaDescription = styled(Typography)(() => ({
  lineHeight: 1.3,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

/**
 * Media Card Item component for displaying POI assets
 * @param {Object} props - Component props
 * @param {import('@/types/jsdoc-types').PoiAsset} props.asset - POI asset data
 * @param {Function} [props.onEdit] - Edit button click handler
 * @param {Function} [props.onDelete] - Delete button click handler
 * @returns {React.ReactElement} Rendered media card item
 */
function MediaCardItem({ asset, onEdit }) {
  const { openPoiMediaModal } = useAssetModal();
  const locale = useLocale();

  const { projectId, tourId, poiId } = useParams();
  const { mutate: deletePoiAsset } = useDeletePoiAsset(
    projectId,
    tourId,
    poiId,
    asset.id,
  );
  const confirm = useConfirm();

  // Check if asset should show AR pill
  const showArPill =
    asset?.type === "3d" && asset?.modelAssetAttributes?.viewInAr;

  // Check if asset should show Georeferenced pill
  const showGeoferencedPill =
    asset?.type === "3d" && asset?.modelAssetAttributes?.georeference;

  const handleClick = () => {
    openPoiMediaModal({ assetId: asset.id, projectId, tourId, poiId });
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onEdit?.(asset);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    await confirm({
      title: "Delete Media Asset",
      message: "Are you sure you want to delete this media asset?",
      confirmText: "Delete",
      action: deletePoiAsset,
    });
  };

  return (
    <CardStyled onClick={handleClick}>
      <CardContentStyled>
        {/* Media Thumbnail */}
        <MediaThumbnailStyled
          type={asset?.type}
          url={localeValue(asset?.contentUrl, locale)}
          title={<InjectedLocaleValue value={asset?.title} />}
        />

        {/* Content Section */}
        <ContentSection>
          <HeaderRow>
            <TitleSection>
              <MediaTitle variant="subtitle2" component="h4">
                <InjectedLocaleValue value={asset?.title || "Untitled Media"} />
              </MediaTitle>
              <MediaDescription variant="body2" color="text.secondary">
                <InjectedLocaleValue value={asset?.description} />
              </MediaDescription>
            </TitleSection>

            <ActionButtons>
              {onEdit && (
                <IconButton size="small" onClick={handleEdit}>
                  <EurekaIcon name="edit" fontSize="small" />
                </IconButton>
              )}
              <IconButton size="small" onClick={handleDelete}>
                <EurekaIcon name="delete" fontSize="small" />
              </IconButton>
            </ActionButtons>
          </HeaderRow>

          {/* Pills Row */}
          <PillsRow>
            {showArPill && (
              <PillStyled
                label="AR"
                size="small"
                variant="filled"
                className="ar-pill"
              />
            )}
            {showGeoferencedPill && (
              <PillStyled
                label="Georeferenced"
                size="small"
                variant="filled"
                className="georeference-pill"
              />
            )}
          </PillsRow>
        </ContentSection>
      </CardContentStyled>
    </CardStyled>
  );
}

export default MediaCardItem;
