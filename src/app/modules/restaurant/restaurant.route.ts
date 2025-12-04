import { Router } from "express";
import { restaurantController } from "./restaurant.ontroller";
const router = Router();
router.post("/create", restaurantController.createRestaurant);

router.get("/", restaurantController.getAllFromDB);
export const restaurantRoutes = router;
