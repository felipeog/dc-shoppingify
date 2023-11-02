import { z } from "zod";
import v from "validator";

export const sanitizer = {
  id: z.number(),
  name: z.string().trim().toLowerCase().refine(v.escape).refine(v.stripLow),
};

export const validator = {
  id: z.number().min(0, "Invalid ID."),
  name: z
    .string()
    .min(3, "The category name must contain at least 3 characters.")
    .max(100, "The category name must contain at most 100 characters."),
};
