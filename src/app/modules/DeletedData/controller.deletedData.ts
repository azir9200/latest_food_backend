import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { DeletedDataService } from "./service.deletedData";

const getSoftDeletedPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await DeletedDataService.getSoftDeletedPosts(); // service method

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Soft deleted posts retrieved successfully",
    data: result,
  });
});
const getSoftDeletedCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await DeletedDataService.getSoftDeletedPosts(); // service method

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Soft deleted Category retrieved successfully",
    data: result,
  });
});
const getSoftDeletedUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await DeletedDataService.getSoftDeletedUsers(); 

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Soft deleted users retrieved successfully",
    data: result,
  });
});

export const DeleteDataController = {
  getSoftDeletedPosts,
    getSoftDeletedCategory,
  getSoftDeletedUsers,

};