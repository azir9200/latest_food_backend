import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { menuItemController } from "./menuItem.controller";

const router = Router();

// MenuItem routes
router.post(
  "/:restaurantId/create",
  authorizeRole(["ADMIN", "USER"]),
  menuItemController.createMenuItem
);
router.patch(
  "/:id/update",
  authorizeRole(["ADMIN", "USER"]),
  menuItemController.updateMenuItem
);
router.delete(
  "/:id/delete",
  authorizeRole(["ADMIN", "USER"]),
 menuItemController.deleteMenuItem
);

export const menuItemtRoutes = router;