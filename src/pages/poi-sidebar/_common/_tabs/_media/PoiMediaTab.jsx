import { useTranslation } from "react-i18next";
import { Skeleton, Stack, styled, Typography } from "@mui/material";

import AddMediaButton from "./AddMediaButton";
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

function PoiMediaTab({ mediaAssets = [], onEdit }) {
  const { t } = useTranslation();

  return (
    <ContainerStyled>
      <div className="top-row">
        <Typography component="h3" variant="h4">
          {t("poiSidebar.mediaTab.tabTitle")}
        </Typography>
        <AddMediaButton />
      </div>
      <div className="media-list">
        {/* Render media card items here */}
        {mediaAssets &&
          mediaAssets
            .filter((asset) => asset.type !== "audio")
            .map((asset) => (
              <MediaCardItem key={asset.id} asset={asset} onEdit={onEdit} />
            ))}
      </div>
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
