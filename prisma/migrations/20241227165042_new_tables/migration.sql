/*
  Warnings:

  - You are about to drop the column `infoId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `postsinfo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[contentId]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contentId` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_infoId_fkey`;

-- DropIndex
DROP INDEX `posts_infoId_key` ON `posts`;

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `infoId`,
    ADD COLUMN `contentId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `userName`,
    ADD COLUMN `profileId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `postsinfo`;

-- CreateTable
CREATE TABLE `profiles` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `birthday` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postscontent` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `textContent` VARCHAR(1000) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `postedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `posts_contentId_key` ON `posts`(`contentId`);

-- CreateIndex
CREATE UNIQUE INDEX `users_profileId_key` ON `users`(`profileId`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_contentId_fkey` FOREIGN KEY (`contentId`) REFERENCES `postscontent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
