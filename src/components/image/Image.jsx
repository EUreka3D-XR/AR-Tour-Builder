import { styled } from "@mui/material";

import placeholderImage from "@/assets/images/image-placeholder.webp";

const ImageUnstyled = ({
  src,
  alt = "Media",
  width,
  height,
  objectFit,
  className,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
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
