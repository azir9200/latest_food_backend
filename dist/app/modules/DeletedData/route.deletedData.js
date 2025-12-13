"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedDataRoutes = void 0;
const express_1 = require("express");
const controller_deletedData_1 = require("./controller.deletedData");
const router = (0, express_1.Router)();
router.get("/all-deleted-post", 
// authorizeRole(["ADMIN"]),
controller_deletedData_1.DeleteDataController.getSoftDeletedPosts);
router.get("/all-deleted-category", 
// authorizeRole(["ADMIN"]),
controller_deletedData_1.DeleteDataController.getSoftDeletedCategory);
router.get("/all-deleted-user", 
// authorizeRole(["ADMIN"]),
controller_deletedData_1.DeleteDataController.getSoftDeletedUsers);
exports.deletedDataRoutes = router;
