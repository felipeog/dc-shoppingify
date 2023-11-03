import { EItemsListState } from "@wasp/shared/types.js";
import { z } from "zod";
import v from "validator";

export const sanitizer = {
  name: z
    .preprocess(
      (val) => (typeof val === "string" ? val : ""),
      z.string().trim()
    )
    .transform((val) =>
      v.isEmpty(val) ? undefined : v.stripLow(v.escape(val))
    ),
  state: z
    .preprocess(
      (val) => (typeof val === "string" ? val : ""),
      z.string().trim()
    )
    .transform((val) =>
      v.isEmpty(val) ? undefined : v.stripLow(v.escape(val))
    ),
};

export const validator = {
  name: z
    .string()
    .min(3, "The items list name must contain at least 3 characters.")
    .max(100, "The items list name must contain at most 100 characters.")
    .optional(),
  state: z
    .nativeEnum(EItemsListState, {
      errorMap: () => ({ message: "Invalid state." }),
    })
    .optional(),
};
