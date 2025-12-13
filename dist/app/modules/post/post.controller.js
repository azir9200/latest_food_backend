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
exports.postController = void 0;
const catchAsync_1 = require("../../share/catchAsync");
const sendResponse_1 = require("../../share/sendResponse");
const post_service_1 = require("./post.service");
const ApiError_1 = __importDefault(require("../../apiError/ApiError"));
const postCreateData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const result = yield post_service_1.postService.postCreateData(req.body, userId.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Post Created successfully",
        data: result,
    });
}));
const updatePostData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const postId = req.params.id;
    const result = yield post_service_1.postService.updatePostData(userId.id, req.body, postId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Update Post successfully",
        data: result,
    });
}));
const postGetData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.postService.postGetData();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All post retrieve successfully",
        data: result,
    });
}));
const postGetUserData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield post_service_1.postService.postGetUserData(user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All post retrieve successfully",
        data: result,
    });
}));
const postGetUserGestUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.postService.postGetUserGestUser();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: " retrieve successfully",
        data: result,
    });
}));
const postSingleGetData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const result = yield post_service_1.postService.postSingleGetData(postId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Single post retrieve successfully",
        data: result,
    });
}));
const postPremiumGetData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const result = yield post_service_1.postService.postPremiumGetData(postId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "post Premium successfully",
        data: result,
    });
}));
const postApprovedGetData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const postId = req.params.id;
    const result = yield post_service_1.postService.postApprovedGetData(postId, payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "post Approved successfully",
        data: result,
    });
}));
const postDeletedGetData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const result = yield post_service_1.postService.postDeletedGetData(postId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "post deleted successfully",
        data: result,
    });
}));
const analyticsData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.postService.analyticsData();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "analytics Data successfully",
        data: result,
    });
}));
const softDelete = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield post_service_1.postService.softDeletePost(id);
    if (result.count === 0) {
        throw new ApiError_1.default(404, "Post not found or already deleted");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Post soft deleted successfully',
        data: result,
    });
}));
exports.postController = {
    postCreateData,
    postGetData,
    postSingleGetData,
    postDeletedGetData,
    postPremiumGetData,
    postApprovedGetData,
    postGetUserData,
    postGetUserGestUser,
    analyticsData,
    updatePostData,
    softDelete,
};
