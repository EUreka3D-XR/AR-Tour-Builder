import MediaDisplay from "@/components/media-display/MediaDisplay";
import { findTypeFromFileExtension } from "@/utils/fileExtensions";
import MediaModal from "../layout";

function AssetMediaModal({ url, onClose }) {
  const type = findTypeFromFileExtension(url);

  return (
    <MediaModal isOpen onClose={onClose}>
      <MediaDisplay asset={{ contentUrl: url, type }} onClose={onClose} />
    </MediaModal>
  );
}

export default AssetMediaModal;
