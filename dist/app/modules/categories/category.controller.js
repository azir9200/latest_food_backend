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
exports.categoryController = void 0;
const catchAsync_1 = require("../../share/catchAsync");
const sendResponse_1 = require("../../share/sendResponse");
const category_service_1 = require("./category.service");
const categoryCreateData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("cate contr", req.body);
    const result = yield category_service_1.categoryService.categoryCreateData(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "category Created successfully",
        data: result,
    });
}));
const categoryGetData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryService.categoryGetData();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All category retrieve successfully",
        data: result,
    });
}));
const categorySingleGetData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    const result = yield category_service_1.categoryService.categorySingleGetData(categoryId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Single category retrieve successfully",
        data: result,
    });
}));
const categoryUpdateGetData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    const result = yield category_service_1.categoryService.categoryUpdateGetData(req.body.data, categoryId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "category Update successfully",
        data: result,
    });
}));
const categoryDeletedGetData = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    const result = yield category_service_1.categoryService.categoryDeletedGetData(categoryId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "category deleted successfully",
        data: result,
    });
}));
exports.categoryController = {
    categoryCreateData,
    categoryGetData,
    categorySingleGetData,
    categoryDeletedGetData,
    categoryUpdateGetData,
};
