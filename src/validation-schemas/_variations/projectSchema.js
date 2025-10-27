import Yup from "../_utils/yupImporter";

const projectSchema = Yup.object({
  title: Yup.object().localesTextRequired("Project title is required"),
  description: Yup.object().localesTextRequired(
    "Project description is required",
  ),
}).required();

export default projectSchema;
