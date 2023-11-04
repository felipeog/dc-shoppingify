import { EItemsListState } from "@wasp/shared/types.js";
import { ItemsList } from "@wasp/entities";
import { sanitizer, validator } from "./validation.js";
import { UpdateItemsList } from "@wasp/actions/types";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const updateSanitizer = z.object({
  id: sanitizer.id,
  name: sanitizer.name,
  state: sanitizer.state,
});

const updateValidator = z.object({
  id: validator.id,
  name: validator.name,
  state: validator.state,
});

export const updateItemsList: UpdateItemsList<
  Pick<ItemsList, "name" | "id" | "state">,
  ItemsList
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const sanitizedArgs = updateSanitizer.parse(args);

  try {
    updateValidator.parse(sanitizedArgs);
  } catch (error) {
    const firstErrorMessage =
      (error as ZodError).errors[0].message ?? "Invalid input.";

    throw new HttpError(400, firstErrorMessage);
  }

  const itemsListToUpdate = await context.entities.ItemsList.findFirst({
    where: {
      id: sanitizedArgs.id,
      AND: { userId: { equals: context.user.id } },
    },
  });

  if (!itemsListToUpdate) {
    throw new HttpError(404, "Items list not found.");
  }

  if (!sanitizedArgs.state || sanitizedArgs.state === EItemsListState.ONGOING) {
    const existingOngoingItemsList = await context.entities.ItemsList.findFirst(
      {
        where: {
          state: { equals: EItemsListState.ONGOING },
          AND: { userId: Number(context.user.id) },
        },
      }
    );

    if (existingOngoingItemsList) {
      throw new HttpError(400, "An ongoing list already exists.");
    }
  }

  const updatedItemsList = await context.entities.ItemsList.update({
    where: { id: sanitizedArgs.id },
    data: {
      name: sanitizedArgs.name,
      state: sanitizedArgs.state,
    },
  });

  return updatedItemsList;
};
