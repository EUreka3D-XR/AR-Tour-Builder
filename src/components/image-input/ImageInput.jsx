import { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { styled, Typography } from "@mui/material";

import CenteredArea from "../centered/Centered.jsx";
import EurekaIcon from "../icon/EurekaIcon.jsx";
import Image from "../image/Image.jsx";

const DEFAULT_FILE_SIZE = 5; // 5MB

const ContainerStyled = styled("div")(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  textAlign: "center",
  cursor: "pointer",
  "&.active-drag": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const PlaceholderStyled = styled(CenteredArea)(({ theme }) => ({
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const ImagePreview = styled(Image)(() => ({
  height: "100%",
  width: "100%",
}));

function ImageInput({
  placeholderText = "Click to upload photo",
  onChange,
  className,
  height = 200,
  width = "100%",
  maxFileSize = DEFAULT_FILE_SIZE,
}) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      setError("");
      if (fileRejections && fileRejections.length > 0) {
        const reason = fileRejections[0].errors[0];
        if (reason.code === "file-too-large") {
          setError(
            "File is too large. Max size is " + Math.round(maxFileSize) + "MB.",
          );
        } else {
          setError(reason.message);
        }
        return;
      }
      const imgFile = acceptedFiles[0];
      setPreview(URL.createObjectURL(imgFile));
      if (onChange) onChange(imgFile);
    },
    [onChange, maxFileSize],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },
    multiple: false,
    maxSize: maxFileSize * 1024 * 1024,
  });

  const helperText = useMemo(
    () => `PNG, JPG up to ${maxFileSize}MB`,
    [maxFileSize],
  );

  return (
    <ContainerStyled
      {...getRootProps()}
      className={clsx(
        "image-input-container",
        { "active-drag": isDragActive },
        className,
      )}
      sx={{
        height: height,
        width: width,
      }}
    >
      <input {...getInputProps()} />
      {preview ? (
        <ImagePreview
          src={preview}
          alt="Preview"
          objectFit="cover"
          className="image-preview"
        />
      ) : (
        <PlaceholderStyled className="input-placeholder">
          <EurekaIcon name="uploadImage" size={48} color="disabled" />
          <Typography color="textSecondary">{placeholderText}</Typography>
          <Typography variant="caption" color="textSecondary">
            {helperText}
          </Typography>
          {error && (
            <Typography color="error" variant="subtitle2">
              {error}
            </Typography>
          )}
        </PlaceholderStyled>
      )}
    </ContainerStyled>
  );
}

export default ImageInput;
