import { Router } from "express";
import { userController } from "./user.controller";
import { authorizeRole } from "../../middleware/authorizeRole";

const router = Router();
router.post("/register", userController.RegisterUser);
router.post("/login", userController.loginUser);
router.get(
  "/subscription",
  authorizeRole(["ADMIN", "USER"]),
  userController.subscription
);

router.post(
  "/refreshToken",
  authorizeRole(["ADMIN", "USER"]),
  userController.refreshAccessToken
);
router.post(
  "/premium",
  authorizeRole(["ADMIN", "USER"]),
  userController.PremiumUser
);
router.get(
  "/verify",
  authorizeRole(["ADMIN", "USER"]),
  userController.verifyPremiumPayment
);
router.get(
  "/all-retreive",
  // authorizeRole(["ADMIN"]),
  userController.getAllUser
);
router.get(
  "/single-retreive/:id",
  authorizeRole(["ADMIN"]),
  userController.getSingleUser
);
router.patch("/role/:id", authorizeRole(["ADMIN"]), userController.roleUpdate);
router.patch(
  "/user/:id",
  authorizeRole(["ADMIN", "USER"]),
  userController.updateUser
);
router.get(
  "/single-retreive",
  authorizeRole(["ADMIN", "USER"]),
  userController.getSingleUserToken
);
router.patch("/role/:id", authorizeRole(["ADMIN"]), userController.roleUpdate);
router.delete(
  "/deleted/:id",
  authorizeRole(["ADMIN"]),
  userController.deletedUser
);
router.get(
  "/admin/metadata",
  authorizeRole(["ADMIN"]),
  userController.dashboardMetaData
);

export const userRoutes = router;
