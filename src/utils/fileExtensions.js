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
    { value: ".bmp", label: "BMP - Bitmap" },
    { value: ".tiff", label: "TIFF - Tagged Image File Format" },
    { value: ".webp", label: "WebP" },
  ],
  video: [
    { value: ".mp4", label: "MP4 - MPEG-4 Part 14" },
    { value: ".m4v", label: "M4V" },
    { value: ".mov", label: "QuickTime - MOV" },
    { value: ".3gp", label: "3GPP - 3GP" },
    { value: ".3g2", label: "3GPP2 - 3G2" },
    { value: ".mkv", label: "Matroska - MKV" },
    { value: ".webm", label: "WebM" },
    { value: ".ts", label: "MPEG-TS - TS" },
    { value: ".m2ts", label: "M2TS - BDAV / MPEG-TS" },
    { value: ".mpg", label: "MPEG - MPG" },
    { value: ".mpeg", label: "MPEG" },
  ],
  audio: [
    { value: ".mp3", label: "MP3 - MPEG-1 Audio Layer III" },
    { value: ".wav", label: "WAV - Waveform Audio File Format" },
    { value: ".ogg", label: "OGG - Ogg container" },
    { value: ".aac", label: "AAC - Advanced Audio Codec" },
    { value: ".flac", label: "FLAC - Free Lossless Audio Codec" },
  ],
  model3d: [
    // { value: ".gltf", label: "glTF - GL Transmission Format" },
    { value: ".glb", label: "glTF Binary - GLB" },
    { value: ".zip", label: "ZIP archive containing 3D model files" },
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
export const _findTypeFromFileExtension = (url) => {
  const extension = url.split(".").pop().split(/#|\?/)[0].toLowerCase();
  for (const [type, extensions] of Object.entries(allowedFileExtensions)) {
    if (extensions.some((ext) => ext.value.slice(1) === extension)) {
      return type;
    }
  }
  return null;
};

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

export const getExtensionsHelperForType = (type, showLabel) => {
  const allowed = allowedFileExtensions[type] || [];
  return allowed
    .map((ext) =>
      showLabel
        ? `${ext.value.toUpperCase()} (${ext.label})`
        : ext.value.toUpperCase(),
    )
    .join(", ");
};

/**
 * Maps MIME type prefixes and specific MIME types to asset types.
 * Prefix keys end with "/" and are matched via startsWith.
 * @type {Record<string, import("@/types/jsdoc-types").AssetType>}
 */
export const mimeTypeToAssetType = {
  "image/": "image",
  "video/": "video",
  "audio/": "audio",
  "model/gltf-binary": "model3d",
  "model/gltf+json": "model3d",
  "application/pdf": "text",
};

/**
 * Derive the asset type from a MIME type string.
 *
 * @param {string} mimeType
 * @returns {import("@/types/jsdoc-types").AssetType|null}
 */
export const findTypeFromMimeType = (mimeType) => {
  if (!mimeType) return null;
  const mime = mimeType.toLowerCase().split(";")[0].trim();
  for (const [key, type] of Object.entries(mimeTypeToAssetType)) {
    if (key.endsWith("/") ? mime.startsWith(key) : mime === key) {
      return type;
    }
  }
  return null;
};

/** 3D model file extensions that are valid inside a zip archive. */
const VALID_3D_EXTENSIONS_IN_ZIP = [".glb", ".gltf", ".obj"];

/**
 * Inspect a zip archive at the given URL using HTTP Range requests (via unzipit)
 * so that only the zip central directory is fetched — not the full file.
 * Returns true if the zip contains at least one supported 3D model file.
 *
 * @param {string} url
 * @returns {Promise<boolean>}
 */
const zipContains3DModel = async (url) => {
  try {
    const { unzip } = await import("unzipit");
    const { entries } = await unzip(url);
    return Object.keys(entries).some((name) =>
      VALID_3D_EXTENSIONS_IN_ZIP.some((ext) =>
        name.toLowerCase().endsWith(ext),
      ),
    );
  } catch {
    return false;
  }
};

/**
 * Validate a URL by fetching its Content-Type via a HEAD request.
 * Falls back to extension-based detection if the server does not return a
 * usable Content-Type or if the request fails (e.g. CORS).
 *
 * Special handling for model3d: a zip URL is inspected (using HTTP Range
 * requests) to confirm it contains a supported 3D file (.glb, .gltf, .obj)
 * without downloading the full archive.
 *
 * @param {string} url
 * @param {import("@/types/jsdoc-types").AssetType} expectedType
 * @returns {Promise<{ valid: boolean, detectedType: import("@/types/jsdoc-types").AssetType|null }>}
 */
export const validateUrlContentType = async (url, expectedType) => {
  if (!url || typeof url !== "string")
    return { valid: false, detectedType: null };

  try {
    new URL(url);
  } catch {
    return { valid: false, detectedType: null };
  }

  let detectedType = null;
  let isZip = false;

  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type");
    const mime = contentType?.toLowerCase().split(";")[0].trim() ?? "";

    isZip =
      mime === "application/zip" ||
      mime === "application/x-zip-compressed" ||
      (mime === "application/octet-stream" &&
        url.toLowerCase().endsWith(".zip"));

    if (!isZip) {
      detectedType = findTypeFromMimeType(contentType);
    }
  } catch {
    // CORS or network error — fall back below
  }

  // If HEAD gave no type, try extension
  if (!detectedType && !isZip) {
    const extLower = url.toLowerCase();
    isZip = extLower.endsWith(".zip");
    if (!isZip) {
      detectedType = _findTypeFromFileExtension(url);
    }
  }

  // Zip path: inspect the archive entries
  if (isZip) {
    if (expectedType !== "model3d") {
      return { valid: false, detectedType: null };
    }
    const has3D = await zipContains3DModel(url);
    return { valid: has3D, detectedType: has3D ? "model3d" : null };
  }

  return {
    valid: !!detectedType && detectedType === expectedType,
    detectedType,
  };
};
