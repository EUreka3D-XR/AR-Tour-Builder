import {
  poiDetailsSchema,
  poiExternalLinksSchema,
  poiLocationSchema,
} from "@/validation-schemas/poiSchema";

export const SchemaPerPoiTab = {
  location: poiLocationSchema,
  details: poiDetailsSchema,
  "external-links": poiExternalLinksSchema,
  media: null,
};
