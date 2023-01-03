/*
  Warnings:

  - You are about to drop the column `age` on the `UserPreference` table. All the data in the column will be lost.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `age` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `UserPreference` DROP COLUMN `age`;
