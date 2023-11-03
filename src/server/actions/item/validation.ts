import { z } from "zod";
import v from "validator";

export const sanitizer = {
  id: z.coerce.number(),
  name: z
    .string()
    .trim()
    .toLowerCase()
    .transform((val) => v.stripLow(v.escape(val))),
  note: z
    .preprocess(
      (val) => (typeof val === "string" ? val : ""),
      z.string().trim()
    )
    .transform((val) => (v.isEmpty(val) ? null : v.stripLow(v.escape(val)))),
  image: z
    .preprocess(
      (val) => (typeof val === "string" ? val : ""),
      z.string().trim()
    )
    .transform((val) => (v.isEmpty(val) ? null : val)),
  categoryId: z.coerce.number(),
};

export const validator = {
  id: z.number().min(0, "Invalid item ID."),
  name: z
    .string()
    .min(3, "The item name must contain at least 3 characters.")
    .max(100, "The item name must contain at most 100 characters."),
  note: z
    .string()
    .min(3, "The note must contain at least 3 characters.")
    .max(100, "The note must contain at most 100 characters.")
    .nullable(),
  image: z.string().refine(v.isURL, "Invalid image URL.").nullable(),
  categoryId: z.number().min(0, "Invalid category ID."),
};
