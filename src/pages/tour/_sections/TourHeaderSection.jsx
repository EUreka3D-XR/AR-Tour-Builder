import { useParams } from "react-router";
import { useFormContext, useWatch } from "react-hook-form";
import { IconButton, Stack, styled, Typography } from "@mui/material";

import { useConfirm } from "@/stores/confirmation-modal-stores";
import { useDeleteTour } from "@/services/toursService";
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
  const { projectId, tourId } = useParams();
  const isExisting = !!tourId;

  const { routes, navigate } = useNavPaths();

  const {
    formState: { isSubmitting },
  } = useFormContext();

  const tourTitle = useWatch({ name: "title" });
  const tourStatus = useWatch({ name: "status", defaultValue: "draft" });
  const createdAt = useWatch({ name: "createdAt" });
  const updatedAt = useWatch({ name: "updatedAt" });
  const lastModifiedAt = updatedAt ?? createdAt;

  const handleBackClick = () => {
    navigate(routes.tours.index);
  };

  const confirm = useConfirm();
  const { mutate: deleteTour } = useDeleteTour(projectId, tourId);

  // TODO: - implement publish handler
  const handlePublish = () => {};

  // TODO: - implement archive handler
  const handleArchive = () => {};

  const handleDelete = async () => {
    await confirm({
      title: "Delete Tour",
      message:
        "Are you sure you want to delete this tour? This action cannot be undone.",
      confirmText: "Delete",
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
          Editing Tour: <InjectedLocaleValue value={tourTitle} />
        </Typography>
      </div>
      {isExisting && (
        <div className="right-section">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              startIcon={<EurekaIcon name="save" />}
              type="submit"
              isLoading={isSubmitting}
            >
              Save Changes
            </Button>
            <Button
              startIcon={<EurekaIcon name="delete" />}
              color="error"
              onClick={handleDelete}
            >
              Delete Tour
            </Button>
            {tourStatus === "draft" && (
              <Button
                startIcon={<EurekaIcon name="publish" />}
                onClick={handlePublish}
              >
                Publish
              </Button>
            )}
            {tourStatus === "published" && (
              <Button
                startIcon={<EurekaIcon name="archive" />}
                onClick={handleArchive}
              >
                Archive
              </Button>
            )}
          </Stack>
          <Typography className="timestamps">
            {"Last modified: "}
            {dateFormatters.lastUpdatedLike(lastModifiedAt)}
          </Typography>
        </div>
      )}
    </ContainerStyled>
  );
}

export default TourHeaderSection;
