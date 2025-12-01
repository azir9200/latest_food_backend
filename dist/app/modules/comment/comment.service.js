"use strict";
// services/comment.service.ts
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
exports.commentService = void 0;
const prismaClient_1 = __importDefault(require("../../share/prismaClient"));
const commentCreate = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("comment ser", payload);
    const { postId, commentText } = payload;
    if (!postId || !commentText) {
        throw new Error("postId and commentText are required");
    }
    const result = yield prismaClient_1.default.comments.create({
        data: {
            userId,
            postId,
            commentText,
        },
    });
    console.log(result);
    return result;
});
const commentUpdate = (commentId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.comments.update({
        where: {
            id: commentId,
        },
        data: {
            commentText: payload.commentText,
        },
    });
    return result;
});
const commentdeleted = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.comments.delete({
        where: {
            id: commentId,
        },
    });
    return result;
});
const commentGet = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.comments.findMany({
        include: {
            user: {
                select: {
                    email: true,
                },
            },
            post: {
                select: {
                    title: true,
                },
            },
        },
    });
    return result;
});
exports.commentService = {
    commentCreate,
    commentUpdate,
    commentdeleted,
    commentGet,
};
