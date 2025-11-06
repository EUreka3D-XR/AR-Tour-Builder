import Model3DViewer from "@/components/model-3d/Model3DViewer";
import DisplayStructure from "../../_common/DisplayStructure";

/**
 * Model display component
 * @param {Object} props
 * @param {import("@/types/jsdoc-types").PoiAsset} props.asset - The asset object containing 3d model data.
 * @param {Function} props.onClose
 * @returns
 */
function ModelDisplay({ asset, onClose }) {
  return (
    <DisplayStructure
      title={asset.title}
      description={asset.description}
      onClose={onClose}
    >
      <Model3DViewer src={asset.contentUrl} showControls />
    </DisplayStructure>
  );
}

export default ModelDisplay;
