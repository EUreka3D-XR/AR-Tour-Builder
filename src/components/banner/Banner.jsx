import { styled } from "@mui/material";

const BannerContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "300px",
  position: "relative",
  backgroundImage: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.paper} 100%)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "flex-end",
  overflow: "hidden",
  "& .content": {
    position: "relative",
    zIndex: 2,
  },
}));

const ShadowOverlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
});

/**
 * Banner component
 * @param {Object} props
 * @param {string} props.src - The banner image src
 * @param {React.ReactNode} props.children - The children elements
 * @returns {JSX.Element}
 */
function Banner({ children, src }) {
  const imageSrc = src ? `url(${src})` : "none";
  return (
    <BannerContainer style={{ backgroundImage: imageSrc }}>
      <ShadowOverlay />
      <div className="content">{children}</div>
    </BannerContainer>
  );
}

export default Banner;
