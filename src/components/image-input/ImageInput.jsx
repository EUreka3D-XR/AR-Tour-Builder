import { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { CircularProgress, styled, Typography } from "@mui/material";

import { useUploadImage } from "@/services/imagesService";
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

/**
 * @param {Object} props
 * @param {string} [props.value] - Current image URL to display
 * @param {(url: string, id: number) => void} [props.onUpload] - Called after successful upload
 * @param {string} [props.placeholderText]
 * @param {string} [props.className]
 * @param {number} [props.height]
 * @param {number|string} [props.width]
 * @param {number} [props.maxFileSize]
 */
function ImageInput({
  value,
  onUpload,
  placeholderText,
  className,
  height = 200,
  width = "100%",
  maxFileSize = DEFAULT_FILE_SIZE,
}) {
  const { t } = useTranslation();
  const { mutate: uploadImage, fetchState } = useUploadImage();
  const [error, setError] = useState("");

  const isUploading = fetchState.isLoading;

  const defaultPlaceholder = placeholderText || t("image_input.placeholder.default");

  const onDrop = useCallback(
    async (acceptedFiles, fileRejections) => {
      setError("");
      if (fileRejections && fileRejections.length > 0) {
        const reason = fileRejections[0].errors[0];
        if (reason.code === "file-too-large") {
          setError(t("image_input.error.file_too_large", { maxSize: Math.round(maxFileSize) }));
        } else {
          setError(reason.message);
        }
        return;
      }
      const file = acceptedFiles[0];
      if (!file) return;

      const result = await uploadImage(file);
      if (onUpload) onUpload(result.url, result.id);
    },
    [uploadImage, onUpload, maxFileSize, t],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },
    multiple: false,
    maxSize: maxFileSize * 1024 * 1024,
    disabled: isUploading,
  });

  const helperText = useMemo(
    () => t("image_input.helper.accepted_formats", { maxSize: maxFileSize }),
    [maxFileSize, t],
  );

  return (
    <ContainerStyled
      {...getRootProps()}
      className={clsx(
        "image-input-container",
        { "active-drag": isDragActive },
        className,
      )}
      sx={{ height, width }}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <CenteredArea sx={{ height: "100%" }}>
          <CircularProgress size={32} />
        </CenteredArea>
      ) : value ? (
        <ImagePreview
          src={value}
          alt={t("common.alt.preview")}
          objectFit="cover"
          className="image-preview"
        />
      ) : (
        <PlaceholderStyled className="input-placeholder">
          <EurekaIcon name="uploadImage" size={48} color="disabled" />
          <Typography color="textSecondary">{defaultPlaceholder}</Typography>
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
