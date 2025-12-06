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
exports.getAiService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../apiError/ApiError"));
const prismaClient_1 = __importDefault(require("../../../share/prismaClient"));
const open_router_1 = require("../../../share/open-router");
const extractJsonFromMessage_1 = require("../../../share/extractJsonFromMessage");
const getAISuggestions = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(payload && payload.preference)) {
        throw new ApiError_1.default(http_status_1.default.BAD_GATEWAY, "preference is required!");
    }
    const post = yield prismaClient_1.default.post.findMany({
        where: { status: client_1.approveStatus.approved },
    });
    const prompt = `
You are a Food Finder assistant AI. Based on the user preference, suggest the top 3 most favorite dish.

Symptoms: ${payload.preference}

Here is the doctor list (in JSON):
${JSON.stringify(post, null, 2)}

Return your response in JSON format with full individual doctor data. 
`;
    const completion = yield open_router_1.openai.chat.completions.create({
        model: "z-ai/glm-4.5-air:free",
        messages: [
            {
                role: "system",
                content: "You are a helpful AI medical assistant that provides doctor suggestions.",
            },
            {
                role: "user",
                content: prompt,
            },
        ],
    });
    console.log("Ai Suggesstions", completion);
    const result = yield (0, extractJsonFromMessage_1.extractJsonFromMessage)(completion.choices[0].message);
    return result;
});
exports.getAiService = {
    getAISuggestions,
};
