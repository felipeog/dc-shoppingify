import { DeleteListItem } from "@wasp/actions/types";
import { ListItem } from "@wasp/entities";
import { sanitizer, validator } from "./validation.js";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const deleteSanitizer = z.object({
  id: sanitizer.id,
});

const deleteValidator = z.object({
  id: validator.id,
});

export const deleteListItem: DeleteListItem<
  Pick<ListItem, "id">,
  ListItem
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

  const listItemToDelete = await context.entities.ListItem.findFirst({
    where: {
      id: sanitizedArgs.id,
      userId: context.user.id,
    },
  });

  if (!listItemToDelete) {
    throw new HttpError(404, "List item not found.");
  }

  const deletedListItem = await context.entities.ListItem.delete({
    where: { id: sanitizedArgs.id },
  });

  return deletedListItem;
};
