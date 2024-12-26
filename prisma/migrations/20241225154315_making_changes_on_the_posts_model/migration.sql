/*
  Warnings:

  - Added the required column `posted` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `posted` BOOLEAN NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;
