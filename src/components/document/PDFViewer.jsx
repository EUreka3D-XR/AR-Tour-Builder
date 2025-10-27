function PDFViewer({ src }) {
  return (
    <iframe
      src={src}
      width="100%"
      height="100%"
      style={{ border: "none" }}
      title="PDF Viewer"
    />
  );
}

export default PDFViewer;
