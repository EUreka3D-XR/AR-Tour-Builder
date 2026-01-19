import Yup from "@/utils/yupImporter";

export const europeanaExtractUrlSchema = Yup.object().shape({
  europeanaUrl: Yup.string()
    .required("URL is required")
    .url("Please enter a valid URL"),
});
