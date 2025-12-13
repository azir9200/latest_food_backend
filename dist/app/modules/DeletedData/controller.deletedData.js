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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDataController = void 0;
const catchAsync_1 = require("../../share/catchAsync");
const sendResponse_1 = require("../../share/sendResponse");
const service_deletedData_1 = require("./service.deletedData");
const getSoftDeletedPosts = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_deletedData_1.DeletedDataService.getSoftDeletedPosts(); // service method
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Soft deleted posts retrieved successfully",
        data: result,
    });
}));
const getSoftDeletedCategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_deletedData_1.DeletedDataService.getSoftDeletedPosts(); // service method
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Soft deleted Category retrieved successfully",
        data: result,
    });
}));
const getSoftDeletedUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_deletedData_1.DeletedDataService.getSoftDeletedUsers();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Soft deleted users retrieved successfully",
        data: result,
    });
}));
exports.DeleteDataController = {
    getSoftDeletedPosts,
    getSoftDeletedCategory,
    getSoftDeletedUsers,
};
