import { Stack, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { routes } = useNavPaths();

  const libraryLink = routes.library.index;
  const toursLink = routes.tours.index;

  // decide title and description based on what's missing
  let title = t("dashboard.emptyProject.allEmpty.title");
  let description = t("dashboard.emptyProject.allEmpty.description");

  if (hasNoMedia && !hasNoTours) {
    title = t("dashboard.emptyProject.noMedia.title");
    description = t("dashboard.emptyProject.noMedia.description");
  } else if (!hasNoMedia && hasNoTours) {
    title = t("dashboard.emptyProject.noTours.title");
    description = t("dashboard.emptyProject.noTours.description");
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
            {t("dashboard.emptyProject.buttons.addMedia")}
          </Button>
        )}

        {hasNoTours && (
          <Button
            variant="outlined"
            startIcon={<EurekaIcon name="tour" />}
            href={toursLink}
          >
            {t("dashboard.emptyProject.buttons.createFirstTour")}
          </Button>
        )}
      </Stack>
    </ContainerStyled>
  );
}

export default EmptyProjectSection;
