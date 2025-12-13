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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.softDeleteUser = exports.verifyPremiumPayment = void 0;
const client_1 = require("@prisma/client");
const date_fns_1 = require("date-fns");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const premiumUser_1 = require("./premiumUser");
const prisma = new client_1.PrismaClient();
const RegisterUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user service", payload);
    const passwordHash = yield bcrypt_1.default.hash(payload.password, 10);
    const result = yield prisma.user.create({
        data: {
            email: payload.email,
            image: payload.image,
            name: payload.name,
            password: passwordHash,
            role: payload.role,
        },
    });
    const { password } = result, userWithoutPassword = __rest(result, ["password"]);
    return userWithoutPassword;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // console.log("service login", payload);
    const existingUser = yield prisma.user.findUnique({
        where: { email },
    });
    if (!existingUser) {
        throw new Error("User not found");
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, existingUser.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const accessToken = jsonwebtoken_1.default.sign({
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
        image: existingUser.image,
        name: existingUser.name,
        isPremium: existingUser.isPremium,
    }, process.env.ACCESS_TOKEN_SECRET || "access-secret", {
        expiresIn: "7d", // shorter expiry for access token
    });
    const refreshToken = jsonwebtoken_1.default.sign({
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
        image: existingUser.image,
        name: existingUser.name,
        isPremium: existingUser.isPremium,
    }, process.env.REFRESH_TOKEN_SECRET || "refresh-secret", {
        expiresIn: "7d",
    });
    return {
        accessToken,
        refreshToken,
    };
});
const premiumUser = (client_ip, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma.user.findUnique({
        where: { id: user.id },
        include: { subscription: true },
    });
    if (existingUser === null || existingUser === void 0 ? void 0 : existingUser.isPremium) {
        throw new Error("User is already a Premium member");
    }
    // Step 1: Create or update subscription (if already exists)
    const subscription = yield prisma.subscription.upsert({
        where: { userId: user.id },
        update: {
            paymentStatus: false,
            paymentMethod: "ShurjoPay",
            subscriptedAt: new Date(),
            updatedAt: new Date(),
        },
        create: {
            userId: user.id,
            paymentStatus: false,
            paymentMethod: "ShurjoPay",
            subscriptedAt: new Date(),
        },
    });
    // Step 2: Prepare payment payload
    const shurjopayPayload = {
        amount: payload.amount,
        order_id: user.id,
        currency: "BDT",
        customer_name: payload.name,
        customer_address: payload.address,
        customer_email: payload.email,
        customer_phone: payload.phone,
        customer_city: payload.city,
        client_ip,
    };
    // Step 3: Make payment
    const payment = yield (0, premiumUser_1.makePaymentAsync)(shurjopayPayload);
    if (!(payment === null || payment === void 0 ? void 0 : payment.checkout_url)) {
        throw new Error("Payment initiation failed");
    }
    return {
        success: true,
        checkoutUrl: payment.checkout_url,
    };
});
const verifyPremiumPayment = (user_id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user_id, userId, "this is perfect");
    const verified = yield (0, premiumUser_1.verifyPaymentAsync)(user_id);
    console.log(verified);
    if (!verified.length) {
        throw new Error("Payment verification failed");
    }
    const info = verified[0];
    // Handle Success, Failed, or Cancelled
    if (info.bank_status === "Success") {
        const result = yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const subscription = yield tx.subscription.update({
                where: {
                    userId: userId,
                },
                data: {
                    userId: userId,
                    paymentStatus: true,
                    paymentMethod: info.method || "ShurjoPay",
                    subscriptedAt: new Date(info.date_time),
                },
            });
            yield tx.user.update({
                where: { id: userId },
                data: {
                    isPremium: true,
                    subscription: {
                        connect: { id: subscription.id },
                    },
                },
            });
        }));
        return {
            success: true,
            status: "Success",
            message: "User is now a Premium member",
        };
    }
    else if (info.bank_status === "Failed") {
        return {
            success: false,
            status: "Failed",
            message: "Payment failed. Please try again.",
        };
    }
    else if (info.bank_status === "Cancel") {
        return {
            success: false,
            status: "Cancelled",
            message: "Payment was cancelled.",
        };
    }
    return {
        success: false,
        status: info.bank_status,
        message: "Unknown payment status.",
    };
});
exports.verifyPremiumPayment = verifyPremiumPayment;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findMany({
        include: {
            subscription: true,
        },
    });
    return result;
});
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
        include: {
            subscription: true,
        },
    });
    return result;
});
const updateUser = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitUser = yield prisma.user.findFirstOrThrow({
        where: {
            id: userId,
        },
    });
    const result = yield prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name: payload.name,
            image: payload.image,
            phone: payload.phone,
            location: payload.location,
            bio: payload.bio,
        },
    });
    return result;
});
const getSingleUserToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
        include: {
            subscription: true,
            posts: true,
            comments: true,
        },
    });
    return result;
});
const roleUpdate = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload.role);
    const exitUser = yield prisma.user.findFirstOrThrow({
        where: {
            id: userId,
        },
    });
    const result = yield prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            role: payload.role,
        },
    });
    return result;
});
const deletedUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.delete({
        where: {
            id: userId,
        },
    });
    return result;
});
const softDeleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.updateMany({
        where: {
            id,
            isDeleted: false,
        },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
        },
    });
});
exports.softDeleteUser = softDeleteUser;
const subscription = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.subscription.findUniqueOrThrow({
        where: {
            userId: userId,
        },
        include: {
            user: true,
        },
    });
    return result;
});
const refreshAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "refresh-secret");
    const existingUser = yield prisma.user.findUnique({
        where: { id: decoded.id },
    });
    if (!existingUser) {
        throw new Error("User not found");
    }
    const newAccessToken = jsonwebtoken_1.default.sign({
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
        image: existingUser.image,
        name: existingUser.name,
        isPremium: existingUser.isPremium,
    }, process.env.ACCESS_TOKEN_SECRET || "access-secret", {
        expiresIn: "15m",
    });
    return { accessToken: newAccessToken };
});
const dashboardMetaData = () => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const monthlyStats = [];
    for (let i = 5; i >= 0; i--) {
        const monthStart = (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(now, i));
        const monthEnd = (0, date_fns_1.endOfMonth)((0, date_fns_1.subMonths)(now, i));
        const label = (0, date_fns_1.format)(monthStart, "MMM");
        const [postsCount, usersCount] = yield Promise.all([
            prisma.post.count({
                where: {
                    createdAt: {
                        gte: monthStart,
                        lte: monthEnd,
                    },
                },
            }),
            prisma.user.count({
                where: {
                    createdAt: {
                        gte: monthStart,
                        lte: monthEnd,
                    },
                },
            }),
        ]);
        monthlyStats.push({ name: label, posts: postsCount, users: usersCount });
    }
    const [totalUsers, totalComments, totalPosts, premiumPosts] = yield Promise.all([
        prisma.user.count(),
        prisma.comments.count(),
        prisma.post.count(),
        prisma.post.count({ where: { isPremium: true } }),
    ]);
    return {
        monthlyStats,
        summary: {
            users: totalUsers,
            comments: totalComments,
            posts: totalPosts,
            premiumPosts: premiumPosts,
        },
    };
});
exports.userService = {
    premiumUser,
    RegisterUser,
    loginUser,
    verifyPremiumPayment: exports.verifyPremiumPayment,
    getAllUser,
    updateUser,
    getSingleUser,
    getSingleUserToken,
    roleUpdate,
    deletedUser,
    softDeleteUser: exports.softDeleteUser,
    subscription,
    refreshAccessToken,
    dashboardMetaData,
};
