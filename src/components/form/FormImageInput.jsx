import { useFormContext } from "react-hook-form";

import ImageInput from "@/components/image-input/ImageInput";

/**
 * @param {Object} props
 * @param {string} props.idName - Form field name for the image ID
 * @param {string} props.urlName - Form field name for the image URL
 * @param {string} [props.placeholderText]
 * @param {string} [props.className]
 * @param {number} [props.height]
 * @param {number|string} [props.width]
 * @param {number} [props.maxFileSize]
 */
function FormImageInput({ idName, urlName, ...rest }) {
  const { watch, setValue } = useFormContext();
  const url = watch(urlName);

  return (
    <ImageInput
      value={url}
      onUpload={(uploadedUrl, id) => {
        setValue(idName, id, { shouldDirty: true });
        setValue(urlName, uploadedUrl);
      }}
      {...rest}
    />
  );
}

export default FormImageInput;
