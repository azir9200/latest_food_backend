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
exports.couponService = void 0;
const prismaClient_1 = __importDefault(require("../../share/prismaClient"));
const couponCreateData = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, discountPercentage, validUntil } = payload;
    const result = yield prismaClient_1.default.coupon.create({
        data: {
            code: code === null || code === void 0 ? void 0 : code.toUpperCase(),
            discountPercentage,
            validFrom: new Date(),
            validUntil: new Date(validUntil),
            isActive: true,
            usageCount: 0,
        },
    });
    return result;
});
const couponGetData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.coupon.findMany();
    return result;
});
const couponUpdateGetData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const coupon = yield prismaClient_1.default.coupon.findUniqueOrThrow({ where: { id } });
    const result = yield prismaClient_1.default.coupon.update({
        where: { id },
        data: { isActive: !(coupon === null || coupon === void 0 ? void 0 : coupon.isActive), updatedAt: new Date() },
    });
    return result;
});
const couponDeletedGetData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.coupon.delete({ where: { id: id } });
    return result;
});
exports.couponService = {
    couponCreateData,
    couponGetData,
    couponDeletedGetData,
    couponUpdateGetData,
};
