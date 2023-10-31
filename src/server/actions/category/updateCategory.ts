import { Category } from "@wasp/entities";
import { UpdateCategory } from "@wasp/actions/types";
import HttpError from "@wasp/core/HttpError.js";

export const updateCategory: UpdateCategory<
  Pick<Category, "name" | "id">,
  Category
> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  // TODO: implement
  throw new HttpError(501, "Not implemented.");
};
