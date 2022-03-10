import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

export const withValidate = (schema: yup.AnySchema) => async (
  req: NextApiRequest,
  res: NextApiResponse,
  next
) => {
  try {
    schema.validateSync(req.body, { abortEarly: false });
    req["data"] = schema.cast(req.body);
    next();
  } catch (e) {
    console.log("Error in validation:");
    console.log(e);
    return res.status(400).json({
      messages: e.errors,
    });
  }
};
