import { useNavigate } from "react-router";
import { useWatch } from "react-hook-form";
import { IconButton, styled, Typography } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import useNavPaths from "@/hooks/useNavPaths";

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
  const navigate = useNavigate();
  const { routes } = useNavPaths();

  const tourTitle = useWatch({
    name: "title",
    compute: (title) => title?.locales?.en || "Untitled Tour",
  });
  const tourStatus = useWatch({ name: "status", defaultValue: "draft" });
  const createdAt = useWatch({ name: "createdAt" });
  const updatedAt = useWatch({ name: "updatedAt" });
  const lastModifiedAt = updatedAt ?? createdAt;
  const isEditing = Boolean(lastModifiedAt);

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
          {tourTitle}
        </Typography>
      </div>
      <div className="right-section">
        {isEditing ? (
          <>
            {lastModifiedAt}
            <Button startIcon={<EurekaIcon name="save" />} onClick={onSave}>
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
          </>
        ) : (
          <Button variant="filled" onClick={onSave}>
            Create Tour
          </Button>
        )}
      </div>
    </ContainerStyled>
  );
}

export default TourHeaderSection;
