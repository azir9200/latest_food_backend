"use strict";
// services/rating.service.ts
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
exports.ratingService = void 0;
const prismaClient_1 = __importDefault(require("../../share/prismaClient"));
const ratingCreate = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, rating } = payload;
    const existingRating = yield prismaClient_1.default.ratings.findUnique({
        where: {
            userId_postId: {
                userId,
                postId,
            },
        },
    });
    if (existingRating) {
        yield prismaClient_1.default.ratings.update({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
            data: {
                rating,
            },
        });
        return { message: "Rating updated" };
    }
    yield prismaClient_1.default.ratings.create({
        data: {
            userId,
            postId,
            rating,
        },
    });
    return { message: "Rating added" };
});
exports.ratingService = {
    ratingCreate,
};
