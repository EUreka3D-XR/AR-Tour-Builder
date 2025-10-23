import { useParams } from "react-router";
import { useFormContext, useWatch } from "react-hook-form";
import { IconButton, styled, Typography } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import useNavPaths from "@/hooks/useNavPaths";
import { dateFormatters } from "@/utils/datetimeFormatters";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  display: "flex",
  alignItems: "center",
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
    alignItems: "center",
    gap: theme.spacing(1),
  },
}));

function TourHeaderSection({ onSave, onPublish, onArchive }) {
  const { tourId } = useParams();
  const isExisting = !!tourId;

  const { routes, navigate } = useNavPaths();

  const {
    formState: { isSubmitting },
  } = useFormContext();

  const tourStatus = useWatch({ name: "status", defaultValue: "draft" });
  const createdAt = useWatch({ name: "createdAt" });
  const updatedAt = useWatch({ name: "updatedAt" });
  const lastModifiedAt = updatedAt ?? createdAt;

  const handleBackClick = () => {
    navigate(routes.tours.index);
  };

  return (
    <ContainerStyled>
      <div className="left-section">
        <IconButton size="small" onClick={handleBackClick}>
          <EurekaIcon name="back" fontSize="small" />
        </IconButton>
        <Typography variant="h4" component="h2" noWrap>
          Editting Tour
        </Typography>
      </div>
      {isExisting && (
        <div className="right-section">
          {"Last modified: "}
          {dateFormatters.lastUpdatedLike(lastModifiedAt)}
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
            onClick={onSave}
          >
            Delete Tour
          </Button>
          {tourStatus === "draft" && (
            <Button
              startIcon={<EurekaIcon name="publish" />}
              onClick={onPublish}
            >
              Publish
            </Button>
          )}
          {tourStatus === "published" && (
            <Button
              startIcon={<EurekaIcon name="archive" />}
              onClick={onArchive}
            >
              Archive
            </Button>
          )}
        </div>
      )}
    </ContainerStyled>
  );
}

export default TourHeaderSection;
