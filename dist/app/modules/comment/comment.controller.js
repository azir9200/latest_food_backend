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
exports.commentController = void 0;
const catchAsync_1 = require("../../share/catchAsync");
const sendResponse_1 = require("../../share/sendResponse");
const comment_service_1 = require("./comment.service");
const commentCreate = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("comment con", req.body);
    const userId = req.user;
    const result = yield comment_service_1.commentService.commentCreate(req.body, userId.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "comment Created successfully",
        data: result,
    });
    console.log(result);
}));
const commentUpdate = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield comment_service_1.commentService.commentUpdate(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "comment Updated successfully",
        data: result,
    });
}));
const commentdeleted = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield comment_service_1.commentService.commentdeleted(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "comment deleted successfully",
        data: result,
    });
}));
const commentGet = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_service_1.commentService.commentGet();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "comment retrieve successfully",
        data: result,
    });
}));
exports.commentController = {
    commentUpdate,
    commentdeleted,
    commentCreate,
    commentGet,
};
