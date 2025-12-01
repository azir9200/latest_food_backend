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
exports.couponController = void 0;
const catchAsync_1 = require("../../share/catchAsync");
const sendResponse_1 = require("../../share/sendResponse");
const coupon_service_1 = require("./coupon.service");
const couponCreateData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("coupon con", req.body);
    const result = yield coupon_service_1.couponService.couponCreateData(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "coupon Created successfully",
        data: result,
    });
}));
const couponGetData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield coupon_service_1.couponService.couponGetData();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All coupon retrieve successfully",
        data: result,
    });
}));
const couponUpdateGetData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const couponId = req.params.id;
    const result = yield coupon_service_1.couponService.couponUpdateGetData(couponId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "coupon Update successfully",
        data: result,
    });
}));
const couponDeletedGetData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const couponId = req.params.id;
    const result = yield coupon_service_1.couponService.couponDeletedGetData(couponId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "coupon deleted successfully",
        data: result,
    });
}));
exports.couponController = {
    couponCreateData,
    couponGetData,
    couponDeletedGetData,
    couponUpdateGetData,
};
