/*
  Warnings:

  - Added the required column `itemId` to the `ListItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ListItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL,
    "itemId" INTEGER NOT NULL,
    "itemsListId" INTEGER NOT NULL,
    CONSTRAINT "ListItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ListItem_itemsListId_fkey" FOREIGN KEY ("itemsListId") REFERENCES "ItemsList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ListItem" ("id", "isDone", "itemsListId", "name") SELECT "id", "isDone", "itemsListId", "name" FROM "ListItem";
DROP TABLE "ListItem";
ALTER TABLE "new_ListItem" RENAME TO "ListItem";
CREATE UNIQUE INDEX "ListItem_name_key" ON "ListItem"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");
