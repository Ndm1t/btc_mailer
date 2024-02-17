-- CreateEnum
CREATE TYPE "Subscription" AS ENUM ('subscribed', 'unsubscribed');

-- CreateTable
CREATE TABLE "Email" (
    "email" TEXT NOT NULL,
    "status" "Subscription" DEFAULT 'subscribed',
    "cratedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Email_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Rate" (
    "id" SERIAL NOT NULL,
    "currentRate" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rate_pkey" PRIMARY KEY ("id")
);
