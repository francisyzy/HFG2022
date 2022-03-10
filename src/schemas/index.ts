import * as yup from "yup";

export const emailSchema = yup.string().email().label("Email");

export const nameSchema = yup.string().label("Name");
