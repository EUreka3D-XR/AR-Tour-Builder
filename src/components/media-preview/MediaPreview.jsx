import PDFViewer from "../document/PDFViewer";
import Image from "../image/Image";
import Model3DViewer from "../model-3d/Model3DViewer";
import Video from "../video/Video";

function MediaPreview({ url, type }) {
  if (type === "image") {
    return <Image src={url} alt={"Image"} objectFit="contain" fillParent />;
  }

  if (type === "3d") {
    return <Model3DViewer src={url} showControls />;
  }

  if (type === "video") {
    return <Video src={url} />;
  }

  if (type === "text") {
    return <PDFViewer src={url} />;
  }
}

export default MediaPreview;
