import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { IconButton, styled, Typography } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import useNavPaths from "@/hooks/useNavPaths";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "& .left-section": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  "& .right-section": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
}));

function TourHeaderSection({
  tourTitle = "Downtown Heritage Walking Tour",
  tourStatus,
  lastModified,
  onSave,
  onPublish,
  onArchive,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { routes } = useNavPaths();

  const isEditing = lastModified ? "edit" : "create";

  const handleBackClick = () => {
    navigate(routes.tours.index);
  };

  useEffect(() => {
    // If there's no hash in the URL, add #info
    if (!location.hash) {
      navigate(`${location.pathname}${location.search}#info`, {
        replace: true,
      });
    }
  }, [location.hash, location.pathname, location.search, navigate]);

  return (
    <ContainerStyled>
      <div className="left-section">
        <IconButton size="small" onClick={handleBackClick}>
          <EurekaIcon name="back" fontSize="small" />
        </IconButton>
        <Typography variant="h4" component="h2">
          {tourTitle}
        </Typography>
      </div>
      <div className="right-section">
        {isEditing ? (
          <>
            {lastModified}
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
