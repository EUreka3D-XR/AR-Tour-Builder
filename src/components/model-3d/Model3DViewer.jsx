import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Stack, styled } from "@mui/material";

import { Controls } from "./Controls";
import ControlsPanel from "./ControlsPanel";
import SaveActionButtons from "./SaveActionButtons";
import ToggleViewerButtons from "./ToggleViewerButtons";

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
 * @property {import("@/types/jsdoc-types").ModelTransform} [initialTransform] - Initial transform for the model (position, rotation, scale)
 * @property {boolean} [isEditable] - Whether the model is editable (default: false). If false, the viewer will be in "showcase" mode with limited controls.
 * @property {boolean} [disableToggleModes] - Whether to disable the toggle mode buttons (default: false)
 * @property {(data: any) => void} [onCameraChange] - Callback when the camera moves or zooms
 * @property {(error: any) => void} [onError] - Callback when the viewer reports an error
 * @property {() => void} [onCancel] - Callback when the user cancels editing (only shown if isEditable is true)
 * @property {(transform: import("@/types/jsdoc-types").ModelTransform) => void} [onSave] - Callback when the user saves changes, receives the new model transform (only shown if isEditable is true)
 */

/**
 *
 * @param {Model3DViewerProps} props
 *
 * @returns
 */
function Model3DViewer({
  src,
  initialTransform,
  mode: propsMode = "freelook",
  disableToggleModes = false,
  isEditable = false,
  viewerUrl = DEFAULT_URL,
  onCameraChange,
  onError,
  onCancel,
  onSave,
}) {
  const { t } = useTranslation();
  const iframeRef = useRef(null);

  const [mode, setMode] = useState(isEditable ? "grid" : propsMode);

  // Construct viewer iframe URL
  const freelook = Boolean(mode === "freelook");
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
      <ControlsPanel>
        <Stack spacing={1} alignItems="flex-end">
          {!disableToggleModes && (
            <ToggleViewerButtons mode={mode} setMode={setMode} />
          )}

          {!freelook && isEditable && (
            <Controls
              initialTransform={initialTransform}
              postToViewer={postToViewer}
              onCameraChange={onCameraChange}
              onError={onError}
            />
          )}
        </Stack>
      </ControlsPanel>
      {isEditable && (
        <Box sx={{ position: "absolute", bottom: "16px", right: "16px" }}>
          <SaveActionButtons onSave={onSave} onCancel={onCancel} />
        </Box>
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
