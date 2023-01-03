/*
  Warnings:

  - You are about to drop the column `favoritedById` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_favoritedById_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `favoritedById`;
