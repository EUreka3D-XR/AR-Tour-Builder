import Yup from "@/utils/yupImporter";
import { localeText } from "./localeSchemas";

const projectLanguagesSchema = Yup.object().shape({
  locales: Yup.array()
    .of(Yup.string())
    .min(1, "At least one project language must be selected")
    .required("Project languages are required"),
});
const projectBasicInfoSchema = Yup.object()
  .shape({
    title: localeText("Project title is required"),
    description: localeText("Project description is required"),
  })
  .required();

const projectBrandingSchema = Yup.object().shape({
  logo: Yup.string().nullable(),
  coverPhoto: Yup.string().nullable(),
});

export {
  projectLanguagesSchema,
  projectBasicInfoSchema,
  projectBrandingSchema,
};
