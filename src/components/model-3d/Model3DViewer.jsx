import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material";

import { Controls } from "./Controls";

const DEFAULT_URL = import.meta.env.VITE_MODEL_INSPECTOR_URL;

const ContainerStyled = styled("div")(() => ({
  label: "model-iframe-container",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
}));

/**
 * @typedef {Object} Model3DViewerProps
 * @property {string} src - URL of the 3D model file (.glb or .gltf)
 * @property {'grid' | 'freelook'} [mode] - Choose between 'grid' or 'freelook' mode (default: 'freelook')
 * @property {string} viewerUrl - URL of the hosted viewer page (e.g., https://your-username.github.io/threejs-viewer/index.html)
 * @property {boolean} [isEditable] - Whether the model is editable (default: false). If false, the viewer will be in "showcase" mode with limited controls.
 * @property {(data: any) => void} [onCameraChange] - Callback when the camera moves or zooms
 * @property {(error: any) => void} [onError] - Callback when the viewer reports an error
 */

/**
 *
 * @param {Model3DViewerProps} props
 *
 * @returns
 */
function Model3DViewer({
  src,
  mode = "freelook",
  isEditable = false,
  viewerUrl = DEFAULT_URL,
  onCameraChange,
  onError,
}) {
  const { t } = useTranslation();
  const iframeRef = useRef(null);

  // Construct viewer iframe URL
  const freelook = !isEditable && Boolean(mode === "freelook");
  const controls = isEditable ? "translate,rotate" : "hide";
  const iframeSrc = `${viewerUrl}?file=${encodeURIComponent(src)}&freelook=${freelook}&controls=${controls}`;

  const postToViewer = useCallback((message) => {
    iframeRef.current?.contentWindow?.postMessage(message, "*");
  }, []);

  return (
    <ContainerStyled>
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        title={t("model_viewer.alt.viewer_title")}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: "8px",
          overflow: "hidden",
        }}
        allow="fullscreen"
      />
      {!freelook && (
        <Controls
          onCameraChange={onCameraChange}
          onError={onError}
          postToViewer={postToViewer}
        />
      )}
      {/* <div className="mt-2 flex gap-2">
        <button
          onClick={resetCamera}
          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Reset Camera
        </button>
      </div> */}
    </ContainerStyled>
  );
}

export default Model3DViewer;
