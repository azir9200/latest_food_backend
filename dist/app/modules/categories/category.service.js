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
exports.categoryService = exports.softDeleteCategory = void 0;
const prismaClient_1 = __importDefault(require("../../share/prismaClient"));
const categoryCreateData = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("service cate", payload);
    const result = yield prismaClient_1.default.category.create({
        data: payload,
    });
    console.log("cate service", result);
    return result;
});
const categoryGetData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.category.findMany({
        include: {
            _count: {
                select: { posts: true },
            },
        },
    });
    return result;
});
const categorySingleGetData = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.category.findUniqueOrThrow({
        where: {
            id: categoryId,
        },
    });
    return result;
});
const categoryUpdateGetData = (name, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prismaClient_1.default.category.findUniqueOrThrow({
        where: { id: categoryId },
    });
    const result = yield prismaClient_1.default.category.update({
        where: {
            id: categoryId,
        },
        data: {
            name: name,
        },
    });
    return result;
});
const categoryDeletedGetData = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.category.delete({
        where: {
            id: categoryId,
        },
    });
    return result;
});
const softDeleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.category.updateMany({
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
exports.softDeleteCategory = softDeleteCategory;
exports.categoryService = {
    categoryCreateData,
    categoryGetData,
    categorySingleGetData,
    categoryDeletedGetData,
    categoryUpdateGetData,
    softDeleteCategory: exports.softDeleteCategory,
};
