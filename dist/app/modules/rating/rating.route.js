"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingRoute = void 0;
const express_1 = require("express");
const authorizeRole_1 = require("../../middleware/authorizeRole");
const rating_controller_1 = require("./rating.controller");
const router = (0, express_1.Router)();
router.post("/create", (0, authorizeRole_1.authorizeRole)(["ADMIN", "USER"]), rating_controller_1.ratingController.ratingCreate);
exports.ratingRoute = router;
