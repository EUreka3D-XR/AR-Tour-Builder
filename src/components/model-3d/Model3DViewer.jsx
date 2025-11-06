import { useEffect, useRef } from "react";
import { styled } from "@mui/material";

const DEFAULT_URL = "https://leomav.github.io/model-inspector/";

const ContainerStyled = styled("div")(() => ({
  label: "model-iframe-container",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

/**
 * @typedef {Object} Model3DViewerProps
 * @property {string} src - URL of the 3D model file (.glb or .gltf)
 * @property {boolean} [showControls] - Whether to show viewer controls (default: true)
 * @property {string} viewerUrl - URL of the hosted viewer page (e.g., https://your-username.github.io/threejs-viewer/index.html)
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
  showControls,
  viewerUrl = DEFAULT_URL,
  onCameraChange,
  onError,
}) {
  const iframeRef = useRef(null);

  // Construct viewer iframe URL
  const iframeSrc = `${viewerUrl}?file=${encodeURIComponent(src)}&showControls=${Boolean(showControls)}`;

  // Listen for messages from the iframe
  useEffect(() => {
    const handleMessage = (event) => {
      // In production: validate origin (e.g., event.origin === viewerUrlOrigin)
      if (!event.data?.type) return;

      switch (event.data.type) {
        case "cameraChange":
          onCameraChange?.(event.data);
          break;
        case "viewerError":
          onError?.(event.data.error);
          break;
        default:
          // You can add more message types if needed
          break;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onCameraChange, onError]);

  // Send message to iframe (e.g., reset camera)
  // const postMessage = useCallback((message) => {
  //   if (!iframeRef.current) return;
  //   iframeRef.current.contentWindow?.postMessage(message, "*");
  // }, []);

  // Public helper to reset the camera (optional)
  // const resetCamera = useCallback(() => {
  //   postMessage({ type: "resetCamera" });
  // }, [postMessage]);

  // Optional UI buttons for testing interaction
  return (
    <ContainerStyled>
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        title="3D Viewer"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: "8px",
          overflow: "hidden",
        }}
        allow="fullscreen"
      />
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
