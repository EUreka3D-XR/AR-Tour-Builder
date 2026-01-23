import Yup from "@/utils/yupImporter";

export const coordinatesSchema = Yup.object().shape({
  lat: Yup.number()
    .typeError("Latitude is required")
    .required("Latitude is required"),
  long: Yup.number()
    .typeError("Longitude is required")
    .required("Longitude is required"),
});

export const georeferenceSchema = Yup.object().shape({
  coordinates: coordinatesSchema.required("Coordinates are required"),
});
