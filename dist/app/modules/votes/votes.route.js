"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteRoute = void 0;
const express_1 = require("express");
const authorizeRole_1 = require("../../middleware/authorizeRole");
const votes_controller_1 = require("./votes.controller");
const router = (0, express_1.Router)();
router.post("/create", (0, authorizeRole_1.authorizeRole)(["ADMIN", "USER"]), votes_controller_1.voteController.voteCreate);
exports.voteRoute = router;
