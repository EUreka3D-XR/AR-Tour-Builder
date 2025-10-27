import ImageDisplay from "../media-display/variants/image-display/ImageDisplay";
import VideoDisplay from "../media-display/variants/video-display/VideoDisplay";

/**
 * Media Modal Component
 * @param {Object} props
 * @param {import('@/types/jsdoc-types').Asset} props.asset
 * @param {Function} props.onClose
 * @returns
 */
function MediaModalDisplay({ asset, onClose }) {
  if (!asset) {
    return null;
  }
  const assetType = asset.type;

  if (assetType === "image") {
    return <ImageDisplay asset={asset} onClose={onClose} />;
  }

  if (assetType === "video") {
    return <VideoDisplay asset={asset} onClose={onClose} />;
  }

  return null;
}

export default MediaModalDisplay;
