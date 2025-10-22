import { LatLng } from "leaflet";

/**
 *
 * @param {import("@/types/jsdoc-types").Coordinates} latlong
 * @returns {import("leaflet").LatLng}
 */
export const convertToLeafletLatLng = (coordinates) => {
  if (!coordinates) {
    return null;
  }
  return [coordinates.lat, coordinates.long];
};

export const convertToLeafletLatLngClass = (coordinates) => {
  if (!coordinates || coordinates.lat === 0 || coordinates.long === 0) {
    return null;
  }
  return new LatLng(coordinates.lat, coordinates.long);
};

/**
 *
 * @param {import("leaflet").LatLng} latlng
 * @returns {import("@/types/jsdoc-types").Coordinates}
 */
export const convertToCoordinates = (latlng) => {
  if (!latlng) {
    return null;
  }

  if (latlng instanceof LatLng) {
    return {
      lat: latlng.lat,
      long: latlng.lng,
    };
  }

  return {
    lat: latlng[0],
    long: latlng[1],
  };
};

/**
 * @param {import("@/types/jsdoc-types").Coordinates[]} boundBox
 * @returns {import("leaflet").LatLngBounds}
 */
export const convertToLeafletBounds = (boundBox) => {
  if (!boundBox || boundBox.length !== 2) {
    return null;
  }

  const southWest = convertToLeafletLatLng(boundBox[0]);
  const northEast = convertToLeafletLatLng(boundBox[1]);
  return [southWest, northEast];
};
