"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const authorizeRole_1 = require("../../middleware/authorizeRole");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
router.post("/create", 
// authorizeRole(["ADMIN", "USER"]),
category_controller_1.categoryController.categoryCreateData);
router.get("/all-retrieve", category_controller_1.categoryController.categoryGetData);
router.get("/single-retrieve/:id", 
// authorizeRole(["ADMIN", "USER"]),
category_controller_1.categoryController.categorySingleGetData);
router.patch("/update/:id", (0, authorizeRole_1.authorizeRole)(["ADMIN", "USER"]), category_controller_1.categoryController.categoryUpdateGetData);
router.delete("/deleted/:id", (0, authorizeRole_1.authorizeRole)(["ADMIN", "USER"]), category_controller_1.categoryController.categoryDeletedGetData);
router.patch("/soft/:id", (0, authorizeRole_1.authorizeRole)(["ADMIN", "USER"]), category_controller_1.categoryController.softDelete);
exports.categoryRoutes = router;
