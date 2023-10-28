/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `itemId` on the `ListItem` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "Item_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Category";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Item";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ListItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL,
    "itemsListId" INTEGER NOT NULL,
    CONSTRAINT "ListItem_itemsListId_fkey" FOREIGN KEY ("itemsListId") REFERENCES "ItemsList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ListItem" ("id", "isDone", "itemsListId", "name") SELECT "id", "isDone", "itemsListId", "name" FROM "ListItem";
DROP TABLE "ListItem";
ALTER TABLE "new_ListItem" RENAME TO "ListItem";
CREATE UNIQUE INDEX "ListItem_name_key" ON "ListItem"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
