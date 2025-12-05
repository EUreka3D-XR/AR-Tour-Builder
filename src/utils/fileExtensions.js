/**
 * @typedef {Object} FileExtensionEntry
 * @property {string} value - The file extension including the leading dot (e.g. ".jpg").
 * @property {string} label - Human-friendly label or description for the extension.
 */

import { t } from "@/config/translations/i18next-config";

/**
 * Mapping of asset types to their allowed file extensions.
 * Keys are of type AssetType.
 * Each value is an array of FileExtensionEntry objects.
 *
 * @type {Record<AssetType, FileExtensionEntry[]>}
 */
export const allowedFileExtensions = {
  image: [
    { value: ".jpg", label: "JPEG" },
    { value: ".jpeg", label: "JPEG" },
    { value: ".png", label: "PNG" },
    { value: ".bmp", label: "BMP (Bitmap)" },
    { value: ".tiff", label: "TIFF (Tagged Image File Format)" },
    { value: ".webp", label: "WebP" },
  ],
  video: [
    { value: ".mp4", label: "MP4 (MPEG-4 Part 14)" },
    { value: ".m4v", label: "M4V" },
    { value: ".mov", label: "QuickTime (MOV)" },
    { value: ".3gp", label: "3GPP (3GP)" },
    { value: ".3g2", label: "3GPP2 (3G2)" },
    { value: ".mkv", label: "Matroska (MKV)" },
    { value: ".webm", label: "WebM" },
    { value: ".ts", label: "MPEG-TS (TS)" },
    { value: ".m2ts", label: "M2TS (BDAV / MPEG-TS)" },
    { value: ".mpg", label: "MPEG (MPG)" },
    { value: ".mpeg", label: "MPEG" },
  ],
  audio: [
    { value: ".mp3", label: "MP3 (MPEG-1 Audio Layer III)" },
    { value: ".wav", label: "WAV (Waveform Audio File Format)" },
    { value: ".ogg", label: "OGG (Ogg container)" },
    { value: ".aac", label: "AAC (Advanced Audio Codec)" },
    { value: ".flac", label: "FLAC (Free Lossless Audio Codec)" },
  ],
  model3d: [
    // { value: ".gltf", label: "glTF (GL Transmission Format)" },
    { value: ".glb", label: "glTF Binary (GLB)" },
    // { value: ".obj", label: "OBJ" },
    // { value: ".fbx", label: "FBX" },
  ],
  text: [
    { value: ".pdf", label: "PDF" },
    // { value: ".doc", label: "DOC" },
    // { value: ".docx", label: "DOCX" },
    // { value: ".txt", label: "TXT" },
  ],
};

/**
 * Determine the asset type for a given URL or filename by inspecting its extension.
 *
 * - The function extracts the substring after the last '.' in the provided url.
 * - It strips any URL fragment (#...) or query string (?...) from the extracted part.
 * - Comparison is performed case-insensitively against allowedFileExtensions entries
 *   (entries store extensions with a leading dot; the comparison strips that dot).
 *
 * @param {string} url - The URL or filename to inspect (may include query/hash).
 * @returns {import("@/types/jsdoc-types").AssetType|null} The matching asset type if found; otherwise null.
 */
export const findTypeFromFileExtension = (url) => {
  const extension = url.split(".").pop().split(/#|\?/)[0].toLowerCase();
  for (const [type, extensions] of Object.entries(allowedFileExtensions)) {
    if (extensions.some((ext) => ext.value.slice(1) === extension)) {
      return type;
    }
  }
  return null;
};

/**
 * Flattened list of all allowed file extension values (each including the leading dot).
 *
 * @type {string[]}
 */
export const allAllowedFileExtensions = Object.values(allowedFileExtensions)
  .flat()
  .map((ext) => ext.value);

/**
 * List of all supported asset types.
 * @type {Array<{value: import("@/types/jsdoc-types").AssetType, label: string}>}
 */
export const fileTypes = [
  {
    value: "image",
    label: t("fileTypes.image"),
  },
  {
    value: "video",
    label: t("fileTypes.video"),
  },
  {
    value: "audio",
    label: t("fileTypes.audio"),
  },
  {
    value: "model3d",
    label: t("fileTypes.model3d"),
  },
  {
    value: "text",
    label: t("fileTypes.document"),
  },
];

export const getExtensionsHelperForType = (type) => {
  const allowed = allowedFileExtensions[type] || [];
  return allowed.map((ext) => String(ext.value).toUpperCase()).join(", ");
};

export const checkAssetUrlValidity = (url) => {
  if (!url || typeof url !== "string") return false;

  try {
    new URL(url);
  } catch {
    return false;
  }
  const type = findTypeFromFileExtension(url);

  const allowedExtensions = allowedFileExtensions[type];
  if (!allowedExtensions || allowedExtensions.length === 0) return false;

  const urlLower = url.toLowerCase();
  return allowedExtensions.some((ext) =>
    urlLower.endsWith(ext.value.toLowerCase()),
  );
};
