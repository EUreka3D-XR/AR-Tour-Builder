import { styled } from "@mui/material";

const ContainerStyled = styled("div")(({ theme }) => ({
  position: "absolute",
  zIndex: theme.zIndex.tooltip,
}));

function MapUIAreaUnstyled({ children, className }) {
  return <ContainerStyled className={className}>{children}</ContainerStyled>;
}

const MapUIArea = styled(MapUIAreaUnstyled)({});

export default MapUIArea;
