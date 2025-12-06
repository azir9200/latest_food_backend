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
exports.restaurantService = exports.getAllFromDB = void 0;
const prismaClient_1 = __importDefault(require("../../share/prismaClient"));
const createRestaurant = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, location, phone, image } = payload;
    const result = yield prismaClient_1.default.restaurant.create({
        data: {
            name,
            address,
            location,
            phone,
            image,
        },
    });
    console.log(result);
    return result;
});
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield prismaClient_1.default.restaurant.findMany({
            orderBy: {
                name: "asc",
            },
        });
        return restaurants;
    }
    catch (error) {
        console.error("Error fetching restaurants:", error);
        throw new Error("Failed to fetch restaurants");
    }
});
exports.getAllFromDB = getAllFromDB;
exports.restaurantService = {
    createRestaurant,
    getAllFromDB: exports.getAllFromDB,
};
