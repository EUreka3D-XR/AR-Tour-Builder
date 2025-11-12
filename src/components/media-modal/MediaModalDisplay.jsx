import MediaDisplay from "../media-display/MediaDisplay";

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
  return <MediaDisplay asset={asset} onClose={onClose} />;
}

export default MediaModalDisplay;
