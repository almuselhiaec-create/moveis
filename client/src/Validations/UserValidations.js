import * as yup from "yup";

export const userSchemaValidation = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  address: yup.string().required("Address is required"),
  role: yup.string().oneOf(["admin", "user"]).required("Role is required"),
});
