"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const post_route_1 = require("../modules/post/post.route");
const category_route_1 = require("../modules/categories/category.route");
const votes_route_1 = require("../modules/votes/votes.route");
const rating_route_1 = require("../modules/rating/rating.route");
const comment_route_1 = require("../modules/comment/comment.route");
const coupon_route_1 = require("../modules/coupon/coupon.route");
const restaurant_route_1 = require("../modules/restaurant/restaurant.route");
const route_deletedData_1 = require("../modules/DeletedData/route.deletedData");
const menuIrem_route_1 = require("../modules/menuItem/menuIrem.route");
const router = (0, express_1.Router)();
const AllRoutes = [
    {
        path: "/category",
        route: category_route_1.categoryRoutes,
    },
    {
        path: "/post",
        route: post_route_1.postRoutes,
    },
    {
        path: "/restaurant",
        route: restaurant_route_1.restaurantRoutes,
    },
    {
        path: "/menu",
        route: menuIrem_route_1.menuItemtRoutes,
    },
    {
        path: "/user",
        route: user_route_1.userRoutes,
    },
    {
        path: "/vote",
        route: votes_route_1.voteRoute,
    },
    {
        path: "/rating",
        route: rating_route_1.ratingRoute,
    },
    {
        path: "/comment",
        route: comment_route_1.commentRoute,
    },
    {
        path: "/coupon",
        route: coupon_route_1.couponRoutes,
    },
    {
        path: "/softDelete",
        route: route_deletedData_1.deletedDataRoutes,
    },
];
AllRoutes.forEach((item) => router.use(item.path, item.route));
exports.default = router;
