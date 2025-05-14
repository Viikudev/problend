-- CreateEnum
CREATE TYPE "answer_status" AS ENUM ('pending', 'accepted', 'rejected');

-- CreateEnum
CREATE TYPE "area" AS ENUM ('Programming', 'Cooking', 'Electronics', 'Languages', 'Video Edition', 'Accounting', 'Mechanics', 'Graphic Design');

-- CreateEnum
CREATE TYPE "issue_status" AS ENUM ('active', 'resolved');

-- CreateTable
CREATE TABLE "Answer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT NOT NULL,
    "imageUrl" VARCHAR NOT NULL,
    "status" "answer_status" NOT NULL,
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
    "status" "issue_status" NOT NULL,
    "area" "area" NOT NULL,
    "imageUrl" VARCHAR,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hasAnswer" BOOLEAN NOT NULL DEFAULT false,

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
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_issue_id_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE NO ACTION ON UPDATE NO ACTION;
