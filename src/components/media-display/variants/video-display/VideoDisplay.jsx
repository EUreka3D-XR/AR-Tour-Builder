import ReactPlayer from "react-player";

import DisplayStructure from "../../_common/DisplayStructure";

/**
 * Image display component
 * @param {Object} props
 * @param {import("@/types/jsdoc-types").PoiAsset} props.asset - The asset object containing image data.
 * @param {Function} props.onClose
 * @returns
 */
function VideoDisplay({ asset, onClose }) {
  return (
    <DisplayStructure
      title={asset.title}
      description={asset.description}
      onClose={onClose}
    >
      <ReactPlayer src={asset.contentUrl} />
    </DisplayStructure>
  );
}

export default VideoDisplay;
