"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemtRoutes = void 0;
const express_1 = require("express");
const authorizeRole_1 = require("../../middleware/authorizeRole");
const menuItem_controller_1 = require("./menuItem.controller");
const router = (0, express_1.Router)();
// MenuItem routes
router.post("/:restaurantId/create", (0, authorizeRole_1.authorizeRole)(["ADMIN", "USER"]), menuItem_controller_1.menuItemController.createMenuItem);
router.patch("/:id/update", (0, authorizeRole_1.authorizeRole)(["ADMIN", "USER"]), menuItem_controller_1.menuItemController.updateMenuItem);
router.delete("/:id/delete", (0, authorizeRole_1.authorizeRole)(["ADMIN", "USER"]), menuItem_controller_1.menuItemController.deleteMenuItem);
exports.menuItemtRoutes = router;
