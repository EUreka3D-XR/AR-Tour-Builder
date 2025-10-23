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
  "3d": [
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

export const allAllowedFileExtensions = Object.values(allowedFileExtensions)
  .flat()
  .map((ext) => ext.value);
