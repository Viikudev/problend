-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_user_id_fkey";

-- DropIndex
DROP INDEX "Issue_userId_key";

-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "userId" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE NO ACTION;
