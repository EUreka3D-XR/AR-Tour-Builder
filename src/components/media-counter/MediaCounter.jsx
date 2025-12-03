import clsx from "clsx";
import { styled } from "@mui/material";

import MediaIcon from "../icon/MediaIcon";

const ContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  // marginTop: theme.spacing(1),
  "& .asset-counter": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
    "& .asset-icon": {
      fontSize: "1rem",
    },
  },
  "&.no-color": {
    "& .asset-counter": {
      color: theme.palette.text.secondary,
    },
  },
}));

function MediaCounter({
  images,
  videos,
  documents,
  audios,
  models,
  className,
  noColor,
}) {
  return (
    <ContainerStyled
      className={clsx(
        "assets-counter-container",
        { "no-color": noColor },
        className,
      )}
    >
      {images > 0 && (
        <div className="asset-counter">
          <MediaIcon type="image" noColor={noColor} className="asset-icon" />
          <span className="asset-count">{images}</span>
        </div>
      )}
      {videos > 0 && (
        <div className="asset-counter">
          <MediaIcon type="video" noColor={noColor} className="asset-icon" />
          <span className="asset-count">{videos}</span>
        </div>
      )}
      {documents > 0 && (
        <div className="asset-counter">
          <MediaIcon type="text" noColor={noColor} className="asset-icon" />
          <span className="asset-count">{documents}</span>
        </div>
      )}
      {models > 0 && (
        <div className="asset-counter">
          <MediaIcon type="model3d" noColor={noColor} className="asset-icon" />
          <span className="asset-count">{models}</span>
        </div>
      )}
      {audios > 0 && (
        <div className="asset-counter">
          <MediaIcon type="audio" noColor={noColor} className="asset-icon" />
          <span className="asset-count">{audios}</span>
        </div>
      )}
    </ContainerStyled>
  );
}

export default MediaCounter;
