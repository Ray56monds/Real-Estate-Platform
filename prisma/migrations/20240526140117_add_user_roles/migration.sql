-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TENANT', 'LANDLORD');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'TENANT';
