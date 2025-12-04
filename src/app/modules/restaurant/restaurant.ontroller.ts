import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { restaurantService } from "./restaurant.service";
import { Request, Response } from "express";

const createRestaurant = catchAsync(async (req: Request, res: Response) => {
  const result = await restaurantService.createRestaurant(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Restaurant Created successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await restaurantService.getAllFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Restaurant retrieve successfully",
    data: result,
  });
});
export const restaurantController = {
  createRestaurant,
  getAllFromDB,
};
