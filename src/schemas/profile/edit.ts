import * as yup from "yup";
import { nameSchema } from "@/schemas/index";

export const editProfileSchema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  name: nameSchema.required(),
});
