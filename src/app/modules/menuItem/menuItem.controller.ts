import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { restaurantService } from "./menuItem.service";
import { Request, Response } from "express";

// MenuItem controllers
const createMenuItem = catchAsync(async (req: Request, res: Response) => {
  const { restaurantId } = req.params;
  const result = await restaurantService.createMenuItem(restaurantId, req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "Create Menu Item successfully",
    success: true,
    data: result,
  });
});

const updateMenuItem = catchAsync(async (req: Request, res: Response) => {
  const result = await restaurantService.updateMenuItem(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    message: "Restaurants update Menu Item successfully",
    success: true,
    data: result,
  });
});

const deleteMenuItem = catchAsync(async (req: Request, res: Response) => {
  const result = await restaurantService.deleteMenuItem(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Restaurants delete Menu Item successfully",
    success: true,
    data: result,
  });
});

export const menuItemController = {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
