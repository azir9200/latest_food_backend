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
exports.restaurantService = void 0;
const prismaClient_1 = __importDefault(require("../../share/prismaClient"));
// Create MenuItem
const createMenuItem = (restaurantId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.menuItem.create({
        data: Object.assign(Object.assign({}, data), { restaurantId }),
    });
});
// Update MenuItem
const updateMenuItem = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Optional: check if record exists first
    const existing = yield prismaClient_1.default.menuItem.findUnique({ where: { id } });
    if (!existing) {
        throw new Error("MenuItem not found");
    }
    return yield prismaClient_1.default.menuItem.update({
        where: { id },
        data,
    });
});
// Delete MenuItem
const deleteMenuItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prismaClient_1.default.menuItem.findUnique({ where: { id } });
    if (!existing) {
        throw new Error("MenuItem not found");
    }
    return yield prismaClient_1.default.menuItem.delete({ where: { id } });
});
exports.restaurantService = {
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
};
