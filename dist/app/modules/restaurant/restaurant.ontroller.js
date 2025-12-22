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
exports.restaurantController = void 0;
// if you use this helper
const catchAsync_1 = require("../../share/catchAsync");
const sendResponse_1 = require("../../share/sendResponse");
const restaurant_service_1 = require("./restaurant.service");
const createRestaurant = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = req.body;
    const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield restaurant_service_1.restaurantService.createRestaurant(data, userid);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Restaurant created successfully",
        data: result,
    });
}));
const getAllRestaurants = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield restaurant_service_1.restaurantService.getAllRestaurants();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Restaurants fetched successfully",
        success: true,
        data: result,
    });
}));
const getRestaurantById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const result = yield restaurant_service_1.restaurantService.getRestaurantById(userId.id);
    console.log("res cintrol", result);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Restaurants by ID fetched successfully",
        success: true,
        data: result,
    });
}));
const getRestaurantByIdParams = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield restaurant_service_1.restaurantService.getRestaurantByIdParams(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Restaurants By Id Params fetched successfully",
        success: true,
        data: result,
    });
}));
const updateRestaurant = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield restaurant_service_1.restaurantService.updateRestaurant(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Restaurants UPDATED successfully",
        success: true,
        data: result,
    });
}));
const deleteRestaurant = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield restaurant_service_1.restaurantService.deleteRestaurant(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: "Restaurants DELETED successfully",
        success: true,
        data: result,
    });
}));
exports.restaurantController = {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantByIdParams,
};
