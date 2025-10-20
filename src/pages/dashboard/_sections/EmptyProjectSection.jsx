import { Stack, styled, Typography } from "@mui/material";

import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import useNavPaths from "@/hooks/useNavPaths";

const ContainerStyled = styled("section")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

function EmptyProjectSection({ hasNoMedia, hasNoTours }) {
  const { routes } = useNavPaths();

  const libraryLink = routes.library.index;
  const toursLink = routes.tours.index;

  // decide title and description based on what's missing
  let title = "Project is empty";
  let description =
    "This project doesn't have any content yet. You can populate the media library or start creating tours.";

  if (hasNoMedia && !hasNoTours) {
    title = "No media in the project";
    description =
      "Add images, videos and 3D models to the project's media library so you can attach them to POIs and tours.";
  } else if (!hasNoMedia && hasNoTours) {
    title = "No tours yet";
    description =
      "Start by creating your first tour and adding Points of Interest to map out the visitor experience.";
  }

  return (
    <ContainerStyled>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography
        color="textSecondary"
        sx={{ maxWidth: 640, textAlign: "center", mb: 3 }}
      >
        {description}
      </Typography>

      <Stack direction="row" spacing={2}>
        {hasNoMedia && (
          <Button
            variant="filled"
            startIcon={<EurekaIcon name="media" />}
            href={libraryLink}
          >
            Add media
          </Button>
        )}

        {hasNoTours && (
          <Button
            variant="outlined"
            startIcon={<EurekaIcon name="tour" />}
            href={toursLink}
          >
            Create first tour
          </Button>
        )}
      </Stack>
    </ContainerStyled>
  );
}

export default EmptyProjectSection;
