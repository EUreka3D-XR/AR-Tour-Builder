import Yup from "@/utils/yupImporter";

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  username: Yup.string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username must be a single word containing only letters, numbers, and underscores",
    ),
  name: Yup.string()
    .optional()
    .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
