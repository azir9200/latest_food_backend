import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { postRoutes } from "../modules/post/post.route";
import { categoryRoutes } from "../modules/categories/category.route";
import { voteRoute } from "../modules/votes/votes.route";
import { ratingRoute } from "../modules/rating/rating.route";
import { commentRoute } from "../modules/comment/comment.route";
import { couponRoutes } from "../modules/coupon/coupon.route";
import { restaurantRoutes } from "../modules/restaurant/restaurant.route";
import { deletedDataRoutes } from "../modules/DeletedData/route.deletedData";
import { menuItemtRoutes } from "../modules/menuItem/menuIrem.route";

const router = Router();
const AllRoutes = [
  {
    path: "/category",
    route: categoryRoutes,
  },
  {
    path: "/post",
    route: postRoutes,
  },
  {
    path: "/restaurant",
    route: restaurantRoutes,
  },
  {
    path: "/menu",
    route: menuItemtRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/vote",
    route: voteRoute,
  },
  {
    path: "/rating",
    route: ratingRoute,
  },
  {
    path: "/comment",
    route: commentRoute,
  },
  {
    path: "/coupon",
    route: couponRoutes,
  },
  {
    path: "/softDelete",
    route: deletedDataRoutes,
  },
];

AllRoutes.forEach((item) => router.use(item.path, item.route));
export default router;
