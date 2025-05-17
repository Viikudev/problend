/*
  Warnings:

  - You are about to drop the column `status` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `hasAnswer` on the `Issue` table. All the data in the column will be lost.
  - Changed the type of `status` on the `Issue` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('available', 'resolved', 'pending');

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "hasAnswer",
DROP COLUMN "status",
ADD COLUMN     "status" "status" NOT NULL;

-- DropEnum
DROP TYPE "answer_status";

-- DropEnum
DROP TYPE "issue_status";
