import { DeleteItemsList } from "@wasp/actions/types";
import { ItemsList } from "@wasp/entities";
import { sanitizer, validator } from "./validation.js";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const deleteSanitizer = z.object({
  id: sanitizer.id,
});

const deleteValidator = z.object({
  id: validator.id,
});

export const deleteItemsList: DeleteItemsList<
  Pick<ItemsList, "id">,
  ItemsList
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const sanitizedArgs = deleteSanitizer.parse(args);

  try {
    deleteValidator.parse(sanitizedArgs);
  } catch (error) {
    const firstErrorMessage =
      (error as ZodError).errors[0].message ?? "Invalid input.";

    throw new HttpError(400, firstErrorMessage);
  }

  const itemsListToDelete = await context.entities.ItemsList.findFirst({
    where: {
      id: sanitizedArgs.id,
      AND: { userId: { equals: context.user.id } },
    },
  });

  if (!itemsListToDelete) {
    throw new HttpError(404, "Items list not found.");
  }

  // delete list items related to the items list
  await context.entities.ListItem.deleteMany({
    where: {
      itemsListId: { equals: sanitizedArgs.id },
      AND: { userId: Number(context.user.id) },
    },
  });

  const deletedItemsList = await context.entities.ItemsList.delete({
    where: { id: sanitizedArgs.id },
  });

  return deletedItemsList;
};
