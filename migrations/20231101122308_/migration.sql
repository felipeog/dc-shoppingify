/*
  Warnings:

  - A unique constraint covering the columns `[itemId,itemsListId,userId]` on the table `ListItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ListItem_itemId_itemsListId_userId_key" ON "ListItem"("itemId", "itemsListId", "userId");
