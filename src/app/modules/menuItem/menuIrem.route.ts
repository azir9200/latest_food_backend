import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { menuItemController } from "./menuItem.controller";

const router = Router();

// MenuItem routes
router.post(
  "/menu/:restaurantId/create",
  authorizeRole(["ADMIN", "USER"]),
  menuItemController.createMenuItem
);
router.patch(
  "/menu/:id/update",
  authorizeRole(["ADMIN", "USER"]),
  menuItemController.updateMenuItem
);
router.delete(
  "/menu/:id/delete",
  authorizeRole(["ADMIN", "USER"]),
 menuItemController.deleteMenuItem
);

export const menuItemtRoutes = router;