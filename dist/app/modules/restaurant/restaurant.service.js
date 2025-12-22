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
const createRestaurant = (data, ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.restaurant.create({
        data: {
            name: data.name,
            description: data.description,
            images: data.images || [],
            location: data.location,
            address: data.address,
            phone: data.phone || null,
            email: data.email || null,
            website: data.website || null,
            openingHours: data.openingHours || null,
            specialties: data.specialties || [],
            highlights: data.highlights || [],
            owner: {
                connect: { id: ownerId },
            },
        },
    });
});
// Get all Restaurants
const getAllRestaurants = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.restaurant.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: { menuItems: true, owner: true },
    });
});
const getRestaurantById = (ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.restaurant.findMany({
        where: { ownerId },
        include: { menuItems: true },
    });
});
// Get single Restaurant
const getRestaurantByIdParams = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.restaurant.findUnique({
        where: { id },
        include: { menuItems: true },
    });
});
// Update Restaurant
const updateRestaurant = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.restaurant.update({
        where: { id },
        data,
    });
});
// Delete Restaurant
const deleteRestaurant = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.restaurant.delete({
        where: { id },
    });
});
exports.restaurantService = {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantByIdParams,
};
