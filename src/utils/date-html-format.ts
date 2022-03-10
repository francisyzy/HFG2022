import { format } from "date-fns";

export const htmlInputFormat = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};
