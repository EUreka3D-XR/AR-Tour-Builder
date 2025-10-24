export const formatCoordinates = (coordinates) => {
  if (
    !coordinates ||
    typeof coordinates !== "object" ||
    Object.keys(coordinates).length !== 2
  ) {
    return "Invalid coordinates";
  }
  const { lat, long } = coordinates;
  return `${lat.toFixed(6)}, ${long.toFixed(6)}`;
};
