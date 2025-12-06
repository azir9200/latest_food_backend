"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.openai = void 0;
const openai_1 = __importDefault(require("openai"));
exports.openai = new openai_1.default({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});
function POST(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { message } = yield req.json();
            const response = yield exports.openai.chat.completions.create({
                model: "openai/gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful restaurant assistant." },
                    { role: "user", content: message },
                ],
            });
            return Response.json({
                reply: response.choices[0].message.content,
            });
        }
        catch (error) {
            console.error(error);
            return Response.json({ error: "AI request failed" }, { status: 500 });
        }
    });
}
exports.POST = POST;
