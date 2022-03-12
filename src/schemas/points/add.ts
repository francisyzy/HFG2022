import * as yup from "yup";
import { emailSchema, moneySchema } from "@/schemas/index";

export const addPointsSchema = yup.object().shape({
  customerEmail: emailSchema.required(),
  amountSpent: moneySchema.required(),
});
