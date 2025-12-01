"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPaymentAsync = exports.makePaymentAsync = void 0;
const shurjopay_1 = __importDefault(require("shurjopay"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Shurjopay = new shurjopay_1.default();
Shurjopay.config(process.env.SP_ENDPOINT, process.env.SP_USERNAME, process.env.SP_PASSWORD, process.env.SP_PREFIX, process.env.SP_RETURN_URL);
console.log(Shurjopay);
const makePaymentAsync = (payload) => {
    return new Promise((resolve, reject) => {
        Shurjopay.makePayment(payload, (response) => resolve(response), (error) => reject(error));
    });
};
exports.makePaymentAsync = makePaymentAsync;
const verifyPaymentAsync = (user_id) => {
    return new Promise((resolve, reject) => {
        Shurjopay.verifyPayment(user_id, (response) => resolve(response), (error) => reject(error));
    });
};
exports.verifyPaymentAsync = verifyPaymentAsync;
