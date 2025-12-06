"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRoutes = void 0;
const express_1 = require("express");
const restaurant_ontroller_1 = require("./restaurant.ontroller");
const router = (0, express_1.Router)();
router.post("/create", restaurant_ontroller_1.restaurantController.createRestaurant);
router.get("/", restaurant_ontroller_1.restaurantController.getAllFromDB);
exports.restaurantRoutes = router;
