import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { DeleteDataController } from "./controller.deletedData";

const router = Router();

router.get(
  "/all-deleted-post",
  // authorizeRole(["ADMIN"]),
  DeleteDataController.getSoftDeletedPosts
);
router.get(
  "/all-deleted-category",
  // authorizeRole(["ADMIN"]),
  DeleteDataController.getSoftDeletedCategory
);
router.get(
  "/all-deleted-user",
  // authorizeRole(["ADMIN"]),
  DeleteDataController.getSoftDeletedUsers
);
export const deletedDataRoutes = router;
