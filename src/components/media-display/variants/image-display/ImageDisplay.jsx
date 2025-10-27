import Image from "@/components/image/Image";
import DisplayStructure from "../../_common/DisplayStructure";

/**
 * Image display component
 * @param {Object} props
 * @param {import("@/types/jsdoc-types").PoiAsset} props.asset - The asset object containing image data.
 * @param {Function} props.onClose
 * @returns
 */
function ImageDisplay({ asset, onClose }) {
  return (
    <DisplayStructure
      title={asset.title}
      description={asset.description}
      onClose={onClose}
    >
      <Image
        src={asset.contentUrl}
        alt={asset.altText || "Image"}
        objectFit="contain"
        fillParent
      />
    </DisplayStructure>
  );
}

export default ImageDisplay;
