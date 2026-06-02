-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'USER', 'SUPERADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "rol" "Roles",
ALTER COLUMN "name" SET DEFAULT '';
