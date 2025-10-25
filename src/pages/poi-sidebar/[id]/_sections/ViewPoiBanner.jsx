import { styled } from "@mui/material";

import Image from "@/components/image/Image";

const ContainerStyled = styled("div")(({ theme }) => ({
  height: theme.spacing(32),
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  "& img": {
    borderRadius: theme.shape.borderRadius,
  },
}));

function ViewPoiBanner({ photoUrl }) {
  return (
    <ContainerStyled className="poi-banner">
      <Image src={photoUrl} alt="Poi Banner" fillParent objectFit="cover" />
    </ContainerStyled>
  );
}

export default ViewPoiBanner;
