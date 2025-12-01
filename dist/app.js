"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./app/router"));
const sendResponse_1 = require("./app/share/sendResponse");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send({ message: "Hey developer, Your code is running well!" });
});
app.use("/api/v1", router_1.default);
// ✅ Error handler
app.use((error, req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 500,
        success: false,
        message: error.message || "Something went wrong!",
        data: error,
    });
});
exports.default = app;
