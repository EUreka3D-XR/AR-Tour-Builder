import PDFViewer from "@/components/document/PDFViewer";
import DisplayStructure from "../../_common/DisplayStructure";

/**
 * Document display component
 * @param {Object} props
 * @param {import("@/types/jsdoc-types").PoiAsset} props.asset - The asset object containing document data.
 * @param {Function} props.onClose
 * @returns
 */
function DocumentDisplay({ asset, onClose }) {
  return (
    <DisplayStructure
      title={asset.title}
      description={asset.description}
      onClose={onClose}
    >
      <PDFViewer src={asset.contentUrl} />
    </DisplayStructure>
  );
}

export default DocumentDisplay;
