import { z } from "zod";

export const sanitizer = {
  id: z.preprocess(
    (value) => (!value ? undefined : Number(value)),
    z.union([z.number(), z.undefined()])
  ),
  amount: z.preprocess(
    (value) => (!value ? undefined : Number(value)),
    z.union([z.number(), z.undefined()])
  ),
  isDone: z.preprocess(
    (value) =>
      ["true", "false"].includes(String(value)) ? Boolean(value) : undefined,
    z.union([z.boolean(), z.undefined()])
  ),
  itemId: z.preprocess(
    (value) => (!value ? undefined : Number(value)),
    z.union([z.number(), z.undefined()])
  ),
  itemsListId: z.preprocess(
    (value) => (!value ? undefined : Number(value)),
    z.union([z.number(), z.undefined()])
  ),
};

export const validator = {
  id: z.number().min(1, "Invalid list item ID."),
  amount: z.number().min(1, "The minimum amount is 1."),
  isDone: z.boolean(),
  itemId: z.number().min(1, "Invalid item ID."),
  itemsListId: z.number().min(1, "Invalid items list ID."),
};
