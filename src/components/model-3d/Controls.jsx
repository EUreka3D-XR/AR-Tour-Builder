import { useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Collapse, Stack, Typography } from "@mui/material";

import { useToggle } from "@/hooks/useToggle";
import NumberInput from "../number-input/NumberInput";
import { useReadModel3DTransform, useWriteModel3DTransform } from "./utils";

const keysToLabels = {
  x: "X",
  y: "Y",
  z: "Z",
  height: "H",
  width: "W",
  depth: "D",
};

const panelSx = {
  position: "absolute",
  top: 16,
  right: 16,
  width: 140,
  backgroundColor: "rgba(255,255,255,0.6)",
  borderRadius: 1,
  overflow: "hidden",
  userSelect: "none",
};

const sectionHeaderSx = {
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  pl: 0.5,
  py: 0.5,
  cursor: "pointer",
};

const labelSx = {
  fontSize: 14,
  fontWeight: 600,
  color: "#000000",
  lineHeight: 1,
  mb: 0.25,
};

const inputSx = {
  width: "100%",
  backgroundColor: "rgba(255,255,255,0.08)",
  borderRadius: 0.5,

  mb: 0.5,
  fontSize: 14,
  color: "#000",
  "& input": { p: 0, px: 0.75, py: 0.25, textAlign: "right" },
};

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Box sx={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <Box sx={sectionHeaderSx} onClick={() => setOpen((v) => !v)}>
        {open ? (
          <ExpandLessIcon sx={{ fontSize: 14, color: "#000" }} />
        ) : (
          <ExpandMoreIcon sx={{ fontSize: 14, color: "#000" }} />
        )}
        <Typography sx={{ fontSize: 14, color: "#000", fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      <Collapse in={open}>
        <Stack gap={0.25} sx={{ px: 1, pb: 0.75 }}>
          {children}
        </Stack>
      </Collapse>
    </Box>
  );
}

function VecField({ label, value, isDisabled, onChange }) {
  const handleChange = (value) => {
    if (!isNaN(value)) onChange?.(value);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography sx={labelSx}>{label}</Typography>
      <NumberInput
        value={value ?? 0}
        min={-Infinity}
        max={Infinity}
        step={0.01}
        draggable={!isDisabled}
        disabled={isDisabled}
        sx={inputSx}
        onChange={handleChange}
      />
    </Stack>
  );
}

function Vec3Fields({ value = {}, variant = "input", onChange }) {
  const keys = Object.keys(value);

  const handle = (axis) => (num) => {
    if (!isNaN(num)) onChange?.({ ...value, [axis]: num });
  };

  return keys.map((axis) => (
    <VecField
      key={axis}
      label={keysToLabels[axis] || axis.toUpperCase()}
      value={value[axis]}
      isDisabled={variant === "display"}
      onChange={handle(axis)}
    />
  ));
}

export const Controls = ({ onCameraChange, onError, postToViewer }) => {
  const { isOpen, open, close } = useToggle();
  const { updateTransform, updatePosition, updateRotation, updateScale } =
    useWriteModel3DTransform();
  const { position, rotation, scale, dimensions } = useReadModel3DTransform();

  // Listen for messages from the iframe
  useEffect(() => {
    const handleMessage = (event) => {
      // In production: validate origin (e.g., event.origin === viewerUrlOrigin)
      if (!event.data?.type) return;

      switch (event.data.type) {
        case "modelLoaded":
          open();
          updateTransform(event.data.transform);
          break;
        case "cameraChange":
          onCameraChange?.(event.data);
          break;
        case "viewerError":
          close();
          onError?.(event.data.error);
          break;
        case "transformChange": {
          const { position, rotation, scale, dimensions } = event.data;
          updateTransform({ position, rotation, scale, dimensions });
          break;
        }
        default:
          break;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onCameraChange, onError, updateTransform, open, close]);

  const handlePositionChange = (vec) => {
    updatePosition(vec);
    postToViewer?.({ type: "setPosition", ...vec });
  };

  const handleRotationChange = (vec) => {
    updateRotation(vec);
    postToViewer?.({ type: "setRotation", ...vec });
  };

  const handleScaleChange = (vec) => {
    const newScale = { x: vec, y: vec, z: vec };
    updateScale(newScale);
    postToViewer?.({ type: "setScale", ...newScale });
  };

  if (!isOpen) return null;

  return (
    <Box sx={panelSx}>
      <Section title="Position">
        <Vec3Fields value={position} onChange={handlePositionChange} />
      </Section>
      <Section title="Rotation">
        <Vec3Fields value={rotation} onChange={handleRotationChange} />
      </Section>
      <Section title="Scale">
        <VecField label="F" value={scale?.x} onChange={handleScaleChange} />
      </Section>
      <Section title="Dimensions (m)">
        <Vec3Fields value={dimensions} variant="display" />
      </Section>
    </Box>
  );
};
