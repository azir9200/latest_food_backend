"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRoutes = void 0;
const express_1 = require("express");
const authorizeRole_1 = require("../../middleware/authorizeRole");
const restaurant_ontroller_1 = require("./restaurant.ontroller");
const router = (0, express_1.Router)();
// Restaurant routes
router.post("/create", (0, authorizeRole_1.authorizeRole)(["ADMIN", "USER"]), restaurant_ontroller_1.restaurantController.createRestaurant);
router.get("/all", restaurant_ontroller_1.restaurantController.getAllRestaurants);
router.get("/single", (0, authorizeRole_1.authorizeRole)(["ADMIN", "USER"]), restaurant_ontroller_1.restaurantController.getRestaurantById);
router.get("/single/:id", restaurant_ontroller_1.restaurantController.getRestaurantByIdParams);
router.patch("/update/:id", (0, authorizeRole_1.authorizeRole)(["ADMIN", "USER"]), restaurant_ontroller_1.restaurantController.updateRestaurant);
router.delete("/delete/:id", (0, authorizeRole_1.authorizeRole)(["ADMIN", "USER"]), restaurant_ontroller_1.restaurantController.deleteRestaurant);
exports.restaurantRoutes = router;
