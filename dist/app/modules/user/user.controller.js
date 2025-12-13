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
exports.userController = void 0;
const sendResponse_1 = require("../../share/sendResponse");
const catchAsync_1 = require("../../share/catchAsync");
const user_service_1 = require("./user.service");
const ApiError_1 = __importDefault(require("../../apiError/ApiError"));
const getAllUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllUser();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All user retreive successfully",
        data: result,
    });
}));
const getSingleUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield user_service_1.userService.getSingleUser(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "single user retreive successfully",
        data: result,
    });
}));
const getSingleUserToken = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.user;
    const result = yield user_service_1.userService.getSingleUserToken(user.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "single user retreive successfully",
        data: result,
    });
}));
const roleUpdate = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const role = req.body;
    const result = yield user_service_1.userService.roleUpdate(userId, role);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "user updated successfully",
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const role = req.body;
    const result = yield user_service_1.userService.updateUser(userId, role);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "user updated successfully",
        data: result,
    });
}));
const deletedUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield user_service_1.userService.deletedUser(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "user deleted successfully",
        data: result,
    });
}));
const softDelete = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.user) {
        throw new ApiError_1.default(401, "Unauthorized");
    }
    // 🔐 prevent admin deleting himself
    if ((req === null || req === void 0 ? void 0 : req.user.id) === id) {
        throw new ApiError_1.default(400, "Admin cannot delete own account");
    }
    const result = yield user_service_1.userService.softDeleteUser(id);
    if (result.count === 0) {
        throw new ApiError_1.default(404, "User not found or already deleted");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "User deleted successfully",
        data: null,
    });
}));
const RegisterUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.RegisterUser(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "user Created successfully",
        data: result,
    });
}));
const loginUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.loginUser(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Login successfully",
        data: result,
    });
}));
const PremiumUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const user = req === null || req === void 0 ? void 0 : req.user;
    const result = yield user_service_1.userService.premiumUser(req.ip, user, payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Premium user Created successfully",
        data: result,
    });
}));
const verifyPremiumPayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req === null || req === void 0 ? void 0 : req.query.order_id;
    const user = req.user;
    const result = yield user_service_1.userService.verifyPremiumPayment(userId, user.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "payment Verify successfully",
        data: result,
    });
}));
const subscription = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.user;
    const result = yield user_service_1.userService.subscription(user.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "subscription retrieve successfully",
        data: result,
    });
}));
const refreshAccessToken = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (!token) {
        throw new Error("This token does not exist");
    }
    const result = yield user_service_1.userService.refreshAccessToken(token);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Access token refreshed successfully",
        data: result,
    });
}));
const dashboardMetaData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.dashboardMetaData();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Dashboard meta data update",
        data: result,
    });
}));
exports.userController = {
    getAllUser,
    RegisterUser,
    loginUser,
    PremiumUser,
    verifyPremiumPayment,
    getSingleUser,
    roleUpdate,
    updateUser,
    deletedUser,
    softDelete,
    refreshAccessToken,
    subscription,
    getSingleUserToken,
    dashboardMetaData,
};
