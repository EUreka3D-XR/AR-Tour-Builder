import { useAssetModalState } from "@/stores/asset-modal-stores";
import AssetMediaModal from "./asset-media/AssetMediaModal";
import LibraryMediaModal from "./library-media/LibraryMediaModal";
import PoiMediaModal from "./poi-media/PoiMediaModal";

function MediaModal() {
  const { assetId, sourceType, url, isOpen, closeModal } = useAssetModalState();

  if (url) {
    return <AssetMediaModal url={url} onClose={closeModal} />;
  }

  if (!assetId || !isOpen) {
    return null;
  }

  if (sourceType === "poiAsset") {
    return <PoiMediaModal assetId={assetId} onClose={closeModal} />;
  }

  if (sourceType === "libraryAsset") {
    return <LibraryMediaModal assetId={assetId} onClose={closeModal} />;
  }

  return null;
}

export default MediaModal;
