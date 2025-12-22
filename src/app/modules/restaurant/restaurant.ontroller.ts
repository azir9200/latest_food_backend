import { Request, Response } from "express";
// if you use this helper
import { catchAsync } from "../../share/catchAsync";
import { sendResponse } from "../../share/sendResponse";
import { restaurantService } from "./restaurant.service";
import { JwtPayload } from "jsonwebtoken";

const createRestaurant = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const userid = req.user?.id;

  const result = await restaurantService.createRestaurant(data, userid);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Restaurant created successfully",
    data: result,
  });
});

const getAllRestaurants = catchAsync(async (req: Request, res: Response) => {
  const result = await restaurantService.getAllRestaurants();
  sendResponse(res, {
    statusCode: 200,
    message: "Restaurants fetched successfully",
    success: true,
    data: result,
  });
});

const getRestaurantById = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user as JwtPayload;
  const result = await restaurantService.getRestaurantById(userId.id);
  console.log("res cintrol", result);
  sendResponse(res, {
    statusCode: 200,
    message: "Restaurants by ID fetched successfully",
    success: true,
    data: result,
  });
});
const getRestaurantByIdParams = catchAsync(
  async (req: Request, res: Response) => {
    const result = await restaurantService.getRestaurantByIdParams(
      req.params.id
    );
    sendResponse(res, {
      statusCode: 200,
      message: "Restaurants By Id Params fetched successfully",
      success: true,
      data: result,
    });
  }
);
const updateRestaurant = catchAsync(async (req: Request, res: Response) => {
  const result = await restaurantService.updateRestaurant(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    message: "Restaurants UPDATED successfully",
    success: true,
    data: result,
  });
});

const deleteRestaurant = catchAsync(async (req: Request, res: Response) => {
  const result = await restaurantService.deleteRestaurant(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    message: "Restaurants DELETED successfully",
    success: true,
    data: result,
  });
});

export const restaurantController = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByIdParams,
};
