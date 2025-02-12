-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "head_id" INTEGER,
    "member_code" TEXT,
    "email_address" TEXT,
    "mobile" TEXT,
    "plain_password" TEXT,
    "password" TEXT,
    "relationship_id" INTEGER,
    "sub_community_id" INTEGER,
    "local_community_id" INTEGER,
    "first_name" TEXT,
    "last_name_id" INTEGER,
    "father_name" TEXT,
    "mother_name" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "gender" TEXT,
    "phone" TEXT,
    "profile_pic" TEXT NOT NULL DEFAULT 'noimage.png',
    "region" TEXT,
    "is_expired" BOOLEAN NOT NULL DEFAULT false,
    "expire_date" TIMESTAMP(3),
    "education_id" INTEGER,
    "occupation_id" INTEGER,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "login_status" BOOLEAN,
    "last_login" TIMESTAMP(3),
    "profile_password" TEXT,
    "profile_percent" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
