import { DeleteListItem } from "@wasp/actions/types";
import { ListItem } from "@wasp/entities";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const sanitizer = z.object({
  id: z.preprocess(
    (value) => (!value ? undefined : Number(value)),
    z.union([z.number(), z.undefined()])
  ),
});

const validator = z.object({
  id: z.number().min(1, "Invalid list item ID."),
});

export const deleteListItem: DeleteListItem<
  Pick<ListItem, "id">,
  ListItem
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
