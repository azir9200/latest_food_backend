import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { postRoutes } from "../modules/post/post.route";

const router = Router();
const AllRoutes = [
  {
    path: "/post",
    route: postRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
];

AllRoutes.forEach((item) => router.use(item.path, item.route));
export default router;
