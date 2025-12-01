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
exports.voteService = void 0;
const prismaClient_1 = __importDefault(require("../../share/prismaClient"));
const voteCreate = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, vote } = payload;
    const existingVote = yield prismaClient_1.default.votes.findUnique({
        where: {
            userId_postId: {
                userId,
                postId,
            },
        },
    });
    if (existingVote) {
        if (existingVote.vote === vote) {
            yield prismaClient_1.default.votes.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId,
                    },
                },
            });
            return { message: "Vote removed (unVoted)" };
        }
        else {
            yield prismaClient_1.default.votes.update({
                where: {
                    userId_postId: {
                        userId,
                        postId,
                    },
                },
                data: { vote },
            });
            return { message: "Vote updated" };
        }
    }
    yield prismaClient_1.default.votes.create({
        data: {
            userId,
            postId,
            vote,
        },
    });
    return { message: "Vote added" };
});
exports.voteService = {
    voteCreate,
};
