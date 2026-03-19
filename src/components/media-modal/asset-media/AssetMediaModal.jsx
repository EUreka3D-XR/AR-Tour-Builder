import MediaDisplay from "@/components/media-display/MediaDisplay";
import MediaModal from "../layout";

function AssetMediaModal({ url, type, onClose }) {
  return (
    <MediaModal isOpen onClose={onClose}>
      <MediaDisplay asset={{ contentUrl: url, type }} onClose={onClose} />
    </MediaModal>
  );
}

export default AssetMediaModal;
