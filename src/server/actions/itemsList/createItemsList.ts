import { CreateItemsList } from "@wasp/actions/types";
import { EItemsListState } from "@wasp/shared/types.js";
import { ItemsList } from "@wasp/entities";
import { sanitizer, validator } from "./validation.js";
import { z, ZodError } from "zod";
import HttpError from "@wasp/core/HttpError.js";

const createSanitizer = z.object({
  name: sanitizer.name,
  state: sanitizer.state,
});

const createValidator = z.object({
  name: validator.name,
  state: validator.state,
});

export const createItemsList: CreateItemsList<
  Pick<ItemsList, "name" | "state">,
  ItemsList
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  const sanitizedArgs = createSanitizer.parse(args);

  try {
    createValidator.parse(sanitizedArgs);
  } catch (error) {
    const firstErrorMessage =
      (error as ZodError).errors[0].message ?? "Invalid input.";

    throw new HttpError(400, firstErrorMessage);
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

  const createdItemsList = await context.entities.ItemsList.create({
    data: {
      name: sanitizedArgs.name,
      state: sanitizedArgs.state,
      user: { connect: { id: Number(context.user.id) } },
    },
  });

  return createdItemsList;
};
