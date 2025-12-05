import Yup from "@/utils/yupImporter";

export const loginSchema = Yup.object().shape({
  login: Yup.string().required("Email or username is required"),
  password: Yup.string().required("Password is required"),
});
