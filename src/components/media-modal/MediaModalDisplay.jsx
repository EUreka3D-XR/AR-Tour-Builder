import { useAssetModalState } from "@/stores/asset-modal-stores";
import LibraryMediaModal from "./library-media/LibraryMediaModal";
import PoiMediaModal from "./poi-media/PoiMediaModal";

function MediaModalDisplay() {
  const { assetId, projectId, tourId, poiId, sourceType, isOpen, closeModal } =
    useAssetModalState();
  if (!assetId || !isOpen) {
    return null;
  }

  if (sourceType === "poiAsset") {
    return (
      <PoiMediaModal
        projectId={projectId}
        tourId={tourId}
        poiId={poiId}
        assetId={assetId}
        onClose={closeModal}
      />
    );
  }

  if (sourceType === "libraryAsset") {
    return <LibraryMediaModal projectId={projectId} assetId={assetId} />;
  }

  return null;
}

export default MediaModalDisplay;
