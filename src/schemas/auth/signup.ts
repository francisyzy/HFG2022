import * as yup from "yup";
import { emailSchema, nameSchema } from "@/schemas/index";

export const signupSchema = yup.object().shape({
  email: emailSchema.required(),
  password: yup.string().min(8).required().label("Password"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "The passwords do not match")
    .label("Password confirmation"),
});
