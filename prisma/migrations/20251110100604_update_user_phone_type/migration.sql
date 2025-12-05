/*
  Warnings:

  - You are about to alter the column `userPhone` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPhone" BIGINT NOT NULL,
    "userProfile" TEXT,
    "userType" TEXT NOT NULL,
    "userStatus" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "userEmail", "userId", "userName", "userPhone", "userProfile", "userStatus", "userType") SELECT "createdAt", "userEmail", "userId", "userName", "userPhone", "userProfile", "userStatus", "userType" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;
