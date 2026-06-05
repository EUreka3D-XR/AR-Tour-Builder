import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Box, styled, Typography } from "@mui/material";

import NotFoundText from "../_common/NotFoundText";
import SectionTitle from "../_common/SectionTitle";
import MediaCardItem from "../../_common/_tabs/_media/MediaCardItem";
import { groupAssetsByType } from "../../_common/_tabs/_media/groupAssetsByType";

const TypeGroupStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const TypeAssetsListStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

function ViewPoiMedia({ mediaItems = [] }) {
  const { t } = useTranslation();
  const [, setSearchParams] = useSearchParams();

  console.log(mediaItems);

  const handleEditPoiAsset = (asset) => {
    setSearchParams((prev) => {
      prev.set("mediaForm", "edit");
      prev.set("mediaId", asset.id);
      return prev;
    });
  };

  const grouped = groupAssetsByType(mediaItems);
  const hasMedia = grouped.length > 0;

  return (
    <div className="poi-media-section">
      <SectionTitle>{`${t("poiSidebar.mediaTab.sectionTitle")} (${mediaItems.length})`}</SectionTitle>
      {hasMedia ? (
        <Box display="flex" flexDirection="column" gap={3}>
          {grouped.map(({ type, assets }) => (
            <TypeGroupStyled key={type}>
              <Typography variant="subtitle2" color="text.secondary">
                {t(`poiSidebar.mediaTab.types.${type}`)}
              </Typography>
              <TypeAssetsListStyled>
                {assets.map((asset) => (
                  <MediaCardItem
                    key={asset.id}
                    asset={asset}
                    onEdit={handleEditPoiAsset}
                  />
                ))}
              </TypeAssetsListStyled>
            </TypeGroupStyled>
          ))}
          {/* {nonCategorized.map((asset) => (
            <MediaCardItem
              key={asset.id}
              asset={asset}
              onEdit={handleEditPoiAsset}
            />
          ))} */}
        </Box>
      ) : (
        <NotFoundText>{t("poiSidebar.mediaTab.empty")}</NotFoundText>
      )}
    </div>
  );
}

export default ViewPoiMedia;
