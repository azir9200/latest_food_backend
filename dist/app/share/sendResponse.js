"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, json) => {
    res.status(json.statusCode).json({
        success: json.success,
        message: json.message,
        data: json.data,
    });
};
exports.sendResponse = sendResponse;
