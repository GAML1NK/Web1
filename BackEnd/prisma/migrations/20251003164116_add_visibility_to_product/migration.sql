-- AlterTable
ALTER TABLE `product` ADD COLUMN `allowedUserIds` VARCHAR(191) NULL,
    ADD COLUMN `visibility` VARCHAR(191) NOT NULL DEFAULT 'ALL';
