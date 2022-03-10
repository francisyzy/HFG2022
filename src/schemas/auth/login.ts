import * as yup from "yup";
import { emailSchema } from "@/schemas/index";

export const loginSchema = yup.object().shape({
  email: emailSchema.required(),
  password: yup.string().min(8).required().label("Password"),
});
