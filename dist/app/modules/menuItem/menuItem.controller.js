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
exports.menuItemController = void 0;
const catchAsync_1 = require("../../share/catchAsync");
const sendResponse_1 = require("../../share/sendResponse");
const menuItem_service_1 = require("./menuItem.service");
// MenuItem controllers
const createMenuItem = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId } = req.params;
    const result = yield menuItem_service_1.restaurantService.createMenuItem(restaurantId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Create Menu Item successfully",
        success: true,
        data: result,
    });
}));
const updateMenuItem = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield menuItem_service_1.restaurantService.updateMenuItem(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Restaurants update Menu Item successfully",
        success: true,
        data: result,
    });
}));
const deleteMenuItem = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield menuItem_service_1.restaurantService.deleteMenuItem(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Restaurants delete Menu Item successfully",
        success: true,
        data: result,
    });
}));
exports.menuItemController = {
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
};
