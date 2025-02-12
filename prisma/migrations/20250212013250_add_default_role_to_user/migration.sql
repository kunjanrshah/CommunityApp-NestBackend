/*
  Warnings:

  - A unique constraint covering the columns `[member_code]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "User_member_code_key" ON "User"("member_code");
