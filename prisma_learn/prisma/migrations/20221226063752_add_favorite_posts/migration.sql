/*
  Warnings:

  - Added the required column `favoritedById` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `favoritedById` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_favoritedById_fkey` FOREIGN KEY (`favoritedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
