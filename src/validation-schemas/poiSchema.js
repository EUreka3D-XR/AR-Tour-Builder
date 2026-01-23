import Yup from "@/utils/yupImporter";
import { coordinatesSchema } from "./georeferenceSchema";
import { localeLinksArray, localeText } from "./localeSchemas";

const poiLocationSchema = Yup.object().shape({
  coordinates: coordinatesSchema.required("Coordinates are required"),
});

const poiDetailsSchema = Yup.object().shape({
  title: localeText("POI title is required"),
  description: localeText("POI description is required"),
  radius: Yup.number()
    .typeError("Radius must be a number")
    .min(5, "Radius must be at least 5")
    .required("Radius is required"),
  thumbnail: Yup.string().nullable(),
});

const poiExternalLinksSchema = Yup.object().shape({
  externalLinks: localeLinksArray(),
  quizLinks: localeLinksArray(),
});

export { poiLocationSchema, poiDetailsSchema, poiExternalLinksSchema };
