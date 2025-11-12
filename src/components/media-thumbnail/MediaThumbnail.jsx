import { styled } from "@mui/material";

import CenteredArea from "../centered/Centered";
import MediaIcon from "../icon/MediaIcon";
import Image from "../image/Image";

const MediaThumbnailStyled = styled(CenteredArea)(({ theme }) => ({
  borderRadius: theme.spacing(0.5),
  backgroundColor: theme.palette.grey[200],
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  "& .media-icon": {
    fontSize: theme.spacing(5),
  },
}));

function MediaThumbnail({ type, url, title, className }) {
  return (
    <MediaThumbnailStyled className={className}>
      {type === "image" ? (
        <Image src={url} alt={title?.locales?.en || "Media"} />
      ) : (
        <MediaIcon type={type} className="media-icon" />
      )}
    </MediaThumbnailStyled>
  );
}

export default MediaThumbnail;
