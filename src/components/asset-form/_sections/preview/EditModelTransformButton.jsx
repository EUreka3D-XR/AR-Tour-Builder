import { useTranslation } from "react-i18next";

import { useEdit3dPropertiesModal } from "@/stores/edit-3d-properties-modal-store";
import Button from "@/components/button/Button";
import EurekaIcon from "@/components/icon/EurekaIcon";
import Edit3dPropertiesModal from "@/components/media-modal/edit-3d-properties/Edit3dPropertiesModal";

/**
 * @typedef {Object} EditModelTransformButtonProps
 * @property {string} url - URL of the 3D model file
 * @property {import('@/types/jsdoc-types').ModelTransform} [initialTransform] - Initial transform for the model
 * @property {(transform: import('@/types/jsdoc-types').ModelTransform) => void} [onSave] - Callback with the updated transform on save
 */

/**
 * @param {EditModelTransformButtonProps} props
 */
function EditModelTransformButton({ url, initialTransform, onSave }) {
  const { t } = useTranslation();
  const open = useEdit3dPropertiesModal();

  const handleClick = async () => {
    const result = await open(initialTransform);
    if (result) {
      onSave?.(result);
    }
  };
  return (
    <>
      <Button startIcon={<EurekaIcon name="edit3D" />} onClick={handleClick}>
        {t("model_viewer.edit_properties")}
      </Button>
      <Edit3dPropertiesModal src={url} />
    </>
  );
}

export default EditModelTransformButton;
