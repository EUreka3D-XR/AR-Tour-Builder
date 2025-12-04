import { useTranslation } from "react-i18next";

function PDFViewer({ src }) {
  const { t } = useTranslation();

  return (
    <iframe
      src={src}
      width="100%"
      height="100%"
      style={{ border: "none" }}
      title={t("document.alt.pdf_viewer")}
    />
  );
}

export default PDFViewer;
