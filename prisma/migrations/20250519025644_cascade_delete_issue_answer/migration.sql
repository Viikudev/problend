-- CreateEnum
CREATE TYPE "area" AS ENUM ('programming', 'mechanics', 'mathematics', 'accounting', 'languages', 'electronics', 'cooking', 'videoEdition', 'graphicDesign', 'economy', 'other');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('available', 'resolved', 'pending');

-- CreateTable
CREATE TABLE "Answer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT NOT NULL,
    "imageUrl" VARCHAR,
    "issueId" UUID NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "status" NOT NULL,
    "imageUrl" VARCHAR,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "area" "area" NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clerkId" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR,
    "lastname" VARCHAR,
    "points" SMALLINT NOT NULL DEFAULT 0,
    "email" VARCHAR,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Answer_issueId_key" ON "Answer"("issueId");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_issue_id_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE NO ACTION;
