"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSuperAdmin = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prismaClient_1 = __importDefault(require("./prismaClient"));
const client_1 = require("@prisma/client");
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = process.env.SUPER_ADMIN_EMAIL;
        const password = process.env.SUPER_ADMIN_PASSWORD;
        const saltRounds = Number(process.env.BCRYPT_SALT_ROUND || 10);
        // 1️⃣ Check if Super Admin already exists
        const isSuperAdminExist = yield prismaClient_1.default.user.findUnique({
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
        const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
        // 3️⃣ Create Super Admin
        yield prismaClient_1.default.user.create({
            data: {
                name: "Super Admin",
                email,
                password: hashedPassword,
                role: client_1.UserRole.SUPER_ADMIN,
                isPremium: true,
            },
        });
        console.log("🎉 Super Admin created successfully!");
    }
    catch (error) {
        console.error("❌ Error creating Super Admin:", error);
    }
    finally {
        yield prismaClient_1.default.$disconnect();
    }
});
exports.seedSuperAdmin = seedSuperAdmin;
