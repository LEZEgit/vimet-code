-- AlterTable
ALTER TABLE "folders" ADD COLUMN     "isRoot" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parentId" UUID;

-- AlterTable
ALTER TABLE "notes" ALTER COLUMN "content" SET DEFAULT '[]'::jsonb;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
