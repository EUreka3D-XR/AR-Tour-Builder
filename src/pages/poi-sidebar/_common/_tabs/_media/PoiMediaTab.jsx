import { useTranslation } from "react-i18next";
import { Box, Skeleton, Stack, styled, Typography } from "@mui/material";

import AddMediaButton from "./AddMediaButton";
import MediaCardItem from "./MediaCardItem";
import { groupAssetsByType } from "./groupAssetsByType";

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

function PoiMediaTab({ mediaAssets = [], onEdit, onMove }) {
  const { t } = useTranslation();
  const grouped = groupAssetsByType(mediaAssets);

  return (
    <ContainerStyled>
      <div className="top-row">
        <Typography component="h3" variant="h4">
          {t("poiSidebar.mediaTab.tabTitle")}
        </Typography>
        <AddMediaButton />
      </div>
      <Box display="flex" flexDirection="column" gap={3}>
        {grouped.map(({ type, assets }) => (
          <Box key={type} display="flex" flexDirection="column" gap={1}>
            <Typography variant="subtitle2" color="text.secondary">
              {t(`poiSidebar.mediaTab.types.${type}`)}
            </Typography>
            <div className="media-list">
              {assets.map((asset, index) => (
                <MediaCardItem
                  key={asset.id}
                  asset={asset}
                  onEdit={onEdit}
                  isOrderable
                  isMoveUpDisabled={index === 0}
                  isMoveDownDisabled={index === assets.length - 1}
                  onMoveUp={() => onMove(type, assets, index, index - 1)}
                  onMoveDown={() => onMove(type, assets, index, index + 1)}
                />
              ))}
            </div>
          </Box>
        ))}
      </Box>
    </ContainerStyled>
  );
}

const PoiMediaTabSkeleton = () => {
  return (
    <ContainerStyled>
      <Stack spacing={10}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="rectangular" width={100} height={36} />
        </Stack>
        <Stack spacing={4}>
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
        </Stack>
      </Stack>
    </ContainerStyled>
  );
};

export default PoiMediaTab;
PoiMediaTab.Skeleton = PoiMediaTabSkeleton;
