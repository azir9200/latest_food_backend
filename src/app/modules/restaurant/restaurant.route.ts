import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { restaurantController } from "./restaurant.ontroller";

const router = Router();

// Restaurant routes
router.post(
  "/create",
  authorizeRole(["ADMIN", "USER"]),
  restaurantController.createRestaurant
);
router.get("/all", restaurantController.getAllRestaurants);
router.get(
  "/single",
  authorizeRole(["ADMIN", "USER"]),
  restaurantController.getRestaurantById
);
router.get("/single/:id", restaurantController.getRestaurantByIdParams);

router.patch(
  "/update/:id",
  authorizeRole(["ADMIN", "USER"]),
  restaurantController.updateRestaurant
);
router.delete(
  "/delete/:id",
  authorizeRole(["ADMIN", "USER"]),
  restaurantController.deleteRestaurant
);

export const restaurantRoutes = router;
