/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcryptjs";
import prisma from "./prismaClient";
import { UserRole } from "@prisma/client";

export const seedSuperAdmin = async () => {
  try {
    const email = process.env.SUPER_ADMIN_EMAIL!;
    const password = process.env.SUPER_ADMIN_PASSWORD!;
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUND || 10);

    // 1️⃣ Check if Super Admin already exists
    const isSuperAdminExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isSuperAdminExist) {
      console.log("✅ Super Admin already exists!");
      return;
    }

    console.log("🚀 Creating Super Admin...");

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3️⃣ Create Super Admin
    await prisma.user.create({
      data: {
        name: "Super Admin",
        email,
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        isPremium: true,
      },
    });

    console.log("🎉 Super Admin created successfully!");
  } catch (error) {
    console.error("❌ Error creating Super Admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};
