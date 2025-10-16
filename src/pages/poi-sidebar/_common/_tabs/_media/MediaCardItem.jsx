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

import EurekaIcon from "@/components/icon/EurekaIcon";
import MediaPreview from "@/components/media-preview/MediaPreview";

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

const MediaPreviewStyled = styled(MediaPreview)({
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
 * @param {Function} [props.onClick] - Card click handler
 * @param {Function} [props.onEdit] - Edit button click handler
 * @param {Function} [props.onDelete] - Delete button click handler
 * @returns {React.ReactElement} Rendered media card item
 */
function MediaCardItem({ asset, onEdit, onDelete, onClick }) {
  // Check if asset should show AR pill
  const showArPill =
    asset?.type === "3d" && asset?.modelAssetAttributes?.viewInAr;

  // Check if asset should show Georeferenced pill
  const showGeoferencedPill =
    asset?.type === "3d" && asset?.modelAssetAttributes?.georeference;

  return (
    <CardStyled onClick={onClick}>
      <CardContentStyled>
        {/* Media Preview */}
        <MediaPreviewStyled
          type={asset?.type}
          url={asset?.contentUrl}
          title={asset?.title?.locales?.en}
        />

        {/* Content Section */}
        <ContentSection>
          <HeaderRow>
            <TitleSection>
              <MediaTitle variant="subtitle2" component="h4">
                {asset?.title?.locales?.en || "Untitled Asset"}
              </MediaTitle>
              {asset?.description?.locales?.en && (
                <MediaDescription variant="body2" color="text.secondary">
                  {asset.description.locales.en}
                </MediaDescription>
              )}
            </TitleSection>

            <ActionButtons>
              <IconButton size="small" onClick={() => onEdit?.(asset)}>
                <EurekaIcon name="edit" fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => onDelete?.(asset)}>
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
