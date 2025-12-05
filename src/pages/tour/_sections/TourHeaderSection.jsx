import { useParams } from "react-router";
import { useFormContext, useWatch } from "react-hook-form";
import { IconButton, Stack, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useConfirm } from "@/stores/confirmation-modal-stores";
import { useDeleteTour, usePublishTour } from "@/services/toursService";
import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import InjectedLocaleValue from "@/components/inject-locale-value/InjectLocaleValue";
import useNavPaths from "@/hooks/useNavPaths";
import { dateFormatters } from "@/utils/datetimeFormatters";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: theme.spacing(4),
  overflow: "hidden",
  "& .left-section": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    overflow: "hidden",
  },
  "& .right-section": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: theme.spacing(0.5),
    "& .timestamps": {
      fontStyle: "italic",
      color: theme.palette.text.secondary,
    },
  },
}));

function TourHeaderSection() {
  const { t } = useTranslation();
  const { projectId, tourId } = useParams();
  const isExisting = !!tourId;

  const { routes, navigate } = useNavPaths();

  const {
    formState: { isSubmitting, isDirty },
  } = useFormContext();

  const tourTitle = useWatch({ name: "title" });
  const createdAt = useWatch({ name: "createdAt" });
  const updatedAt = useWatch({ name: "updatedAt" });
  const lastModifiedAt = updatedAt ?? createdAt;

  const handleBackClick = () => {
    navigate(routes.tours.index);
  };

  const confirm = useConfirm();
  const { mutate: deleteTour } = useDeleteTour(projectId, tourId);

  const handleDelete = async () => {
    await confirm({
      title: t("tour.header.deleteConfirm.title"),
      message: t("tour.header.deleteConfirm.message"),
      confirmText: t("tour.header.deleteConfirm.confirmText"),
      action: deleteTour,
    });
    navigate(routes.tours.index);
  };

  return (
    <ContainerStyled>
      <div className="left-section">
        <IconButton size="small" onClick={handleBackClick}>
          <EurekaIcon name="back" fontSize="small" />
        </IconButton>
        <Typography variant="h4" component="h2" noWrap>
          {t("tour.header.editingTour")} <InjectedLocaleValue value={tourTitle} />
        </Typography>
      </div>
      {isExisting && (
        <div className="right-section">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              startIcon={<EurekaIcon name="save" />}
              type="submit"
              variant="filled"
              isDisabled={!isDirty}
              isLoading={isSubmitting}
            >
              {isSubmitting ? t("tour.header.saving") : t("tour.header.saveChanges")}
            </Button>
            <Button
              startIcon={<EurekaIcon name="delete" />}
              color="error"
              onClick={handleDelete}
            >
              {t("tour.header.deleteTour")}
            </Button>
            <PublishButton />
          </Stack>
          <Typography className="timestamps">
            {t("tour.header.lastModified", {
              date: dateFormatters.lastUpdatedLike(lastModifiedAt),
            })}
          </Typography>
        </div>
      )}
    </ContainerStyled>
  );
}

export default TourHeaderSection;

const PublishButton = () => {
  const { t } = useTranslation();
  const { tourId } = useParams();

  const tourStatus = useWatch({ name: "status", defaultValue: "draft" });

  const { setValue } = useFormContext();

  const { mutate: publishTour } = usePublishTour(tourId);

  const handlePublish = async () => {
    await publishTour({ publish: true });
    setValue("status", "published");
  };

  const handleArchive = async () => {
    await publishTour({ publish: false });
    setValue("status", "draft");
  };

  return (
    <>
      {tourStatus === "draft" && (
        <Button
          startIcon={<EurekaIcon name="publish" />}
          onClick={handlePublish}
        >
          {t("tour.header.publish")}
        </Button>
      )}
      {tourStatus === "published" && (
        <Button
          startIcon={<EurekaIcon name="archive" />}
          onClick={handleArchive}
        >
          {t("tour.header.archive")}
        </Button>
      )}
    </>
  );
};
