import { z } from "zod";
import v from "validator";

export const sanitizer = {
  id: z.coerce.number(),
  name: z
    .string()
    .trim()
    .toLowerCase()
    .transform((val) => v.stripLow(v.escape(val))),
};

export const validator = {
  id: z.number().min(1, "Invalid category ID."),
  name: z
    .string()
    .min(3, "The category name must contain at least 3 characters.")
    .max(100, "The category name must contain at most 100 characters."),
};
