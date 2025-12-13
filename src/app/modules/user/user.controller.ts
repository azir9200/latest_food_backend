import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../../share/sendResponse";
import { catchAsync } from "../../share/catchAsync";
import { softDeleteUser, userService } from "./user.service";
import ApiError from "../../apiError/ApiError";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUser();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All user retreive successfully",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const result = await userService.getSingleUser(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "single user retreive successfully",
    data: result,
  });
});
const getSingleUserToken = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user as JwtPayload;

  const result = await userService.getSingleUserToken(user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "single user retreive successfully",
    data: result,
  });
});
const roleUpdate = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const role = req.body;
  const result = await userService.roleUpdate(userId, role);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "user updated successfully",
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const role = req.body;
  const result = await userService.updateUser(userId, role);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "user updated successfully",
    data: result,
  });
});
const deletedUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const result = await userService.deletedUser(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "user deleted successfully",
    data: result,
  });
});
const softDelete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  // 🔐 prevent admin deleting himself
  if (req?.user.id === id) {
    throw new ApiError(400, "Admin cannot delete own account");
  }

  const result = await userService.softDeleteUser(id);

  if (result.count === 0) {
    throw new ApiError(404, "User not found or already deleted");
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User deleted successfully",
    data: null,
  });
});

const RegisterUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.RegisterUser(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "user Created successfully",
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.loginUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successfully",
    data: result,
  });
});
const PremiumUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req?.user as JwtPayload;

  const result = await userService.premiumUser(req.ip, user, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Premium user Created successfully",
    data: result,
  });
});
const verifyPremiumPayment = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.query.order_id as string;
  const user = req.user as JwtPayload;

  const result = await userService.verifyPremiumPayment(userId, user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "payment Verify successfully",
    data: result,
  });
});
const subscription = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user as JwtPayload;
  const result = await userService.subscription(user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "subscription retrieve successfully",
    data: result,
  });
});
const refreshAccessToken = catchAsync(async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    throw new Error("This token does not exist");
  }
  const result = await userService.refreshAccessToken(token);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Access token refreshed successfully",
    data: result,
  });
});
const dashboardMetaData = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.dashboardMetaData();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Dashboard meta data update",
    data: result,
  });
});
export const userController = {
  getAllUser,
  RegisterUser,
  loginUser,
  PremiumUser,
  verifyPremiumPayment,
  getSingleUser,
  roleUpdate,
  updateUser,
  deletedUser,
  softDelete,
  refreshAccessToken,
  subscription,
  getSingleUserToken,
  dashboardMetaData,
};
