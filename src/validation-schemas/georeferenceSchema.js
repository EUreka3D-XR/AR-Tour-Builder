import Yup from "@/utils/yupImporter";

export const coordinatesSchema = Yup.object().shape({
  lat: Yup.number().required("Latitude is required"),
  long: Yup.number().required("Longitude is required"),
});

export const georeferenceSchema = Yup.object().shape({
  coordinates: coordinatesSchema.required("Coordinates are required"),
});
