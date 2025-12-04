import { Restaurant } from "@prisma/client";
import prisma from "../../share/prismaClient";

const createRestaurant = async (payload: Restaurant) => {
  const { name, address, location, phone, image } = payload;
  const result = await prisma.restaurant.create({
    data: {
      name,
      address,
      location,

      phone,
      image,
    },
  });
  console.log(result);
  return result;
};

export const getAllFromDB = async () => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return restaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw new Error("Failed to fetch restaurants");
  }
};

export const restaurantService = {
  createRestaurant,
  getAllFromDB,
};
