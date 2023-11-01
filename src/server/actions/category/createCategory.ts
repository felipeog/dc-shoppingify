import { Category } from "@wasp/entities";
import { CreateCategory } from "@wasp/actions/types";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";
import v from "validator";

const sanitizer = z.object({
  name: z.string().trim().toLowerCase().refine(v.escape).refine(v.stripLow),
});

const validator = z.object({
  name: z
    .string()
    .min(3, "The category name must contain at least 3 characters.")
    .max(100, "The category name must contain at most 100 characters."),
});

export const createCategory: CreateCategory<
  Pick<Category, "name">,
  Category
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const sanitizedArgs = sanitizer.parse(args);

  try {
    validator.parse(sanitizedArgs);
  } catch (error) {
    const firstErrorMessage =
      (error as ZodError).errors[0].message ?? "Invalid input.";

    throw new HttpError(400, firstErrorMessage);
  }

  const existingCategory = await context.entities.Category.findFirst({
    where: {
      name: { equals: sanitizedArgs.name },
      AND: { userId: Number(context.user.id) },
    },
  });

  if (existingCategory) {
    throw new HttpError(400, "This category already exists.");
  }

  const createdCategory = await context.entities.Category.create({
    data: {
      name: sanitizedArgs.name,
      user: { connect: { id: Number(context.user.id) } },
    },
  });

  return createdCategory;
};
