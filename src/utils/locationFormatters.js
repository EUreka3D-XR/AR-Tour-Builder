import { t } from "@/config/translations/i18next-config";

export const formatCoordinates = (coordinates) => {
  if (
    !coordinates ||
    typeof coordinates !== "object" ||
    Object.keys(coordinates).length !== 2
  ) {
    return t("common.errors.invalidCoordinates");
  }
  const { lat, long } = coordinates;
  return `${lat.toFixed(6)}, ${long.toFixed(6)}`;
};
