import { useEdit3dPropertiesModalState } from "@/stores/edit-3d-properties-modal-store";
import Model3DViewer from "@/components/model-3d/Model3DViewer";
import MediaModal from "../layout";

function Edit3dPropertiesModal({ src }) {
  const { isOpen, initialTransform, onCancel, onConfirm } =
    useEdit3dPropertiesModalState();

  const handleSave = (newTransform) => {
    onConfirm(newTransform);
  };

  return (
    <MediaModal isOpen={isOpen} onClose={onCancel}>
      {isOpen && initialTransform && (
        <Model3DViewer
          src={src}
          initialTransform={initialTransform}
          disableToggleModes
          isEditable
          onCancel={onCancel}
          onSave={handleSave}
        />
      )}
    </MediaModal>
  );
}

export default Edit3dPropertiesModal;
