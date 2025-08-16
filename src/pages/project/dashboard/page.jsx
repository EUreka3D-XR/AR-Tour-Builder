import { Box, styled, Typography } from "@mui/material";

const BannerContainer = styled(Box)({
  width: "100%",
  height: "400px",
  position: "relative",
  backgroundImage: "linear-gradient(135deg, #8B7355 0%, #A0916B 100%)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "flex-end",
  overflow: "hidden",
});

const ShadowOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
});

const ContentContainer = styled(Box)({
  position: "relative",
  zIndex: 2,
  padding: "2rem",
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
  width: "100%",
});

const LogoContainer = styled(Box)({
  width: "80px",
  height: "80px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  flexShrink: 0,
});

const TextContainer = styled(Box)({
  color: "white",
  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
});

function ProjectBanner() {
  return (
    <BannerContainer>
      <ShadowOverlay />
      <ContentContainer>
        <LogoContainer>🏛️</LogoContainer>
        <TextContainer>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Archaeological Site Explorer
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              opacity: 0.95,
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            }}
          >
            Explore ancient ruins and historical artifacts through immersive
            guided tours
          </Typography>
        </TextContainer>
      </ContentContainer>
    </BannerContainer>
  );
}

export default ProjectBanner;
