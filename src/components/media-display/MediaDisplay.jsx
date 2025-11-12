import MediaPreview from "../media-preview/MediaPreview";
import DisplayStructure from "./_common/DisplayStructure";

/**
 * Document display component
 * @param {Object} props
 * @param {import("@/types/jsdoc-types").PoiAsset} props.asset - The asset object containing document data.
 * @param {Function} props.onClose
 * @returns
 */
function MediaDisplay({ asset, onClose }) {
  if (!asset) return null;

  return (
    <DisplayStructure
      title={asset.title}
      description={asset.description}
      onClose={onClose}
    >
      <MediaPreview url={asset.contentUrl} type={asset.type} />
    </DisplayStructure>
  );
}

export default MediaDisplay;
