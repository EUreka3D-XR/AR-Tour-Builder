import { styled } from "@mui/material";

import placeholderImage from "@/assets/images/image-placeholder.webp";

const ImageUnstyled = ({
  src,
  alt = "Media",
  width,
  height,
  objectFit,
  fillParent,
  className,
}) => {
  return (
    <img
      src={src || placeholderImage}
      alt={alt}
      className={className}
      width={fillParent ? "100%" : width}
      height={fillParent ? "100%" : height}
      style={{ objectFit }}
      onError={(e) => {
        e.target.onerror = null; // Prevent infinite loop
        e.target.src = placeholderImage;
      }}
    />
  );
};

const Image = styled(ImageUnstyled)({});

export default Image;
