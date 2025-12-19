import prisma from "../../share/prismaClient";

// Create MenuItem
const createMenuItem = async (restaurantId: string, data: any) => {
  return await prisma.menuItem.create({
    data: {
      ...data,
      restaurantId,
    },
  });
};

// Update MenuItem
const updateMenuItem = async (id: string, data: any) => {
  // Optional: check if record exists first
  const existing = await prisma.menuItem.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("MenuItem not found");
  }

  return await prisma.menuItem.update({
    where: { id },
    data,
  });
};

// Delete MenuItem
const deleteMenuItem = async (id: string) => {
  const existing = await prisma.menuItem.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("MenuItem not found");
  }

  return await prisma.menuItem.delete({ where: { id } });
};

export const restaurantService = {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
