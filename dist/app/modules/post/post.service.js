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
exports.postService = void 0;
const date_fns_1 = require("date-fns");
const prismaClient_1 = __importDefault(require("../../share/prismaClient"));
const postCreateData = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("post service", payload);
    const { title, description, price, location, image, categoryId } = payload;
    const result = yield prismaClient_1.default.post.create({
        data: {
            title,
            description,
            price,
            location,
            image,
            category: { connect: { id: categoryId } },
            user: { connect: { id: userId } },
        },
    });
    return result;
});
const postGetData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.post.findMany({
        include: {
            user: true,
            category: true,
            comments: {
                include: {
                    user: true,
                },
            },
        },
    });
    return result;
});
const postGetUserData = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const exitUser = yield prismaClient_1.default.user.findUniqueOrThrow({
        where: {
            id: user.id,
        },
        include: {
            subscription: true,
        },
    });
    let Posts;
    if (exitUser.isPremium && ((_a = exitUser.subscription) === null || _a === void 0 ? void 0 : _a.paymentStatus)) {
        Posts = yield prismaClient_1.default.post.findMany({
            where: {
                status: "approved",
            },
            include: {
                votes: true,
                comments: {
                    include: {
                        user: true,
                    },
                },
                ratings: true,
                user: true,
                category: true,
            },
        });
    }
    else {
        Posts = yield prismaClient_1.default.post.findMany({
            where: {
                status: "approved",
                isPremium: false,
            },
            include: {
                votes: true,
                comments: {
                    include: {
                        user: true,
                    },
                },
                ratings: true,
                user: true,
                category: true,
            },
        });
    }
    const result = Posts.map((post) => {
        const upVotes = post.votes.filter((v) => v.vote === "UP").length;
        const downVotes = post.votes.filter((v) => v.vote === "DOWN").length;
        const totalRatings = post.ratings.length;
        const averageRating = totalRatings > 0
            ? post.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
            : 0;
        const totalComments = post.comments.length;
        return Object.assign(Object.assign({}, post), { upVotes,
            downVotes, averageRating: Number(averageRating.toFixed(1)), totalComments });
    });
    return result;
});
const postSingleGetData = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.post.findUniqueOrThrow({
        where: {
            id: postId,
        },
    });
    return result;
});
const postPremiumGetData = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const exitPost = yield prismaClient_1.default.post.findUniqueOrThrow({
        where: {
            id: postId,
        },
    });
    const isPremium = exitPost.isPremium == false ? true : false;
    const result = yield prismaClient_1.default.post.update({
        where: {
            id: postId,
        },
        data: {
            isPremium: isPremium,
        },
    });
    return result;
});
const postApprovedGetData = (postId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitPost = yield prismaClient_1.default.post.findUniqueOrThrow({
        where: {
            id: postId,
        },
    });
    const result = yield prismaClient_1.default.post.update({
        where: {
            id: postId,
        },
        data: {
            status: payload.status,
        },
    });
    return result;
});
const postDeletedGetData = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.post.delete({
        where: {
            id: postId,
        },
    });
    return result;
});
const postGetUserGestUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield prismaClient_1.default.post.findMany({
        where: {
            status: "approved",
        },
        include: {
            votes: true,
            comments: {
                include: {
                    user: true,
                },
            },
            ratings: true,
            user: true,
            category: true,
        },
    });
    const result = posts.map((post) => {
        const upVotes = post.votes.filter((v) => v.vote === "UP").length;
        const downVotes = post.votes.filter((v) => v.vote === "DOWN").length;
        const totalRatings = post.ratings.length;
        const averageRating = totalRatings > 0
            ? post.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
            : 0;
        const totalComments = post.comments.length;
        return Object.assign(Object.assign({}, post), { upVotes,
            downVotes, averageRating: Number(averageRating.toFixed(1)), totalComments });
    });
    return result;
});
const analyticsData = () => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const AnalyticsArray = [];
    const visitorData = [];
    for (let i = 5; i >= 0; i--) {
        const MonthStart = (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(date, i));
        const MonthEnd = (0, date_fns_1.endOfMonth)((0, date_fns_1.subMonths)(date, i));
        const label = (0, date_fns_1.format)(MonthStart, "MM");
        const [PostCount, CommentCount, userCount] = yield Promise.all([
            prismaClient_1.default.post.count({
                where: {
                    createdAt: {
                        gte: MonthStart,
                        lte: MonthEnd,
                    },
                },
            }),
            prismaClient_1.default.comments.count({
                where: {
                    createdAt: {
                        gte: MonthStart,
                        lte: MonthEnd,
                    },
                },
            }),
            prismaClient_1.default.user.count({
                where: {
                    createdAt: {
                        gte: MonthStart,
                        lte: MonthEnd,
                    },
                },
            }),
        ]);
        AnalyticsArray.push({
            name: label,
            posts: PostCount,
            comments: CommentCount,
        }),
            visitorData.push({
                name: label,
                users: userCount,
            });
    }
    const category = yield prismaClient_1.default.category.findMany({
        include: {
            _count: {
                select: { posts: true },
            },
        },
    });
    const categoryData = category.map((cat) => ({
        name: cat.name,
        value: cat._count.posts,
    }));
    return { AnalyticsArray, visitorData, categoryData };
});
exports.postService = {
    postCreateData,
    postGetData,
    postSingleGetData,
    postDeletedGetData,
    postApprovedGetData,
    postPremiumGetData,
    postGetUserData,
    postGetUserGestUser,
    analyticsData,
};
