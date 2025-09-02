import { Box, styled, Typography } from "@mui/material";

import EurekaIcon from "../../components/icon/EurekaIcon";

const ContainerStyled = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const IconContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.spacing(2),
  width: 80,
  height: 80,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
}));

const TitleSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

function LibraryPage() {
  return (
    <ContainerStyled>
      <HeaderSection>
        <IconContainer>
          <EurekaIcon
            name="media"
            sx={{
              color: "white",
              fontSize: 40,
            }}
          />
        </IconContainer>

        <TitleSection>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="700"
            color="text.primary"
          >
            Asset Library
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1.125rem" }}
          >
            Manage and organize your project assets
          </Typography>
        </TitleSection>
      </HeaderSection>
      {/* Rest of your page content goes here */}
      page
    </ContainerStyled>
  );
}

export default LibraryPage;
