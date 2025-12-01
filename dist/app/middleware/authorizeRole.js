"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const authorizeRole = (roles) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        if (!token) {
            throw new Error("This token does not exist");
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, "access-secret");
            if (!decoded) {
                throw new Error("This user is not authorized");
            }
            if (!roles.includes(decoded.role)) {
                throw new Error("Forbidden: Insufficient permissions!");
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                throw new Error("Invalid or expired token");
            }
            next(error);
        }
    };
};
exports.authorizeRole = authorizeRole;
