import { Router } from "express";
import { authorizeRole } from "../../middleware/authorizeRole";
import { DeleteDataController } from "./controller.deletedData";

const router = Router();

router.get(
  "/all-deleted-data",
  authorizeRole(["ADMIN"]),
  DeleteDataController.getSoftDeletedPosts
);
router.get(
  "/all-deleted-data",
  authorizeRole(["ADMIN"]),
  DeleteDataController.getSoftDeletedUsers
);
export const deletedDataRoutes = router;
