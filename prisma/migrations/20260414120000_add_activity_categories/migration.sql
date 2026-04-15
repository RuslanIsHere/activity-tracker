-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN "categoryId" TEXT;

-- Backfill existing string categories into user-owned category rows.
INSERT INTO "Category" ("id", "name", "userId", "createdAt")
SELECT
    md5("userId" || ':' || trim("category")),
    trim("category"),
    "userId",
    CURRENT_TIMESTAMP
FROM "Activity"
WHERE "category" IS NOT NULL AND trim("category") <> ''
GROUP BY "userId", trim("category");

UPDATE "Activity"
SET "categoryId" = md5("userId" || ':' || trim("category"))
WHERE "category" IS NOT NULL AND trim("category") <> '';

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "category";

-- CreateIndex
CREATE UNIQUE INDEX "Category_userId_name_key" ON "Category"("userId", "name");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
