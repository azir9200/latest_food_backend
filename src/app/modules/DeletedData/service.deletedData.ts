import prisma from "../../share/prismaClient";

const getSoftDeletedPosts = async () => {
  const result = await prisma.post.findMany({
    where: {
      isDeleted: true,
    },
    include: {
      user: true,
      category: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
  });
  return result;
};
const getSoftDeletedCategory = async () => {
  const result = await prisma.category.findMany({
    where: {
      isDeleted: true,
    },
  });
  return result;
};
const getSoftDeletedUsers = async () => {
  const result = await prisma.user.findMany({
    where: {
      isDeleted: true,
    },
    include: {
      posts: true,

      comments: {
        include: {
          user: true,
        },
      },
    },
  });
  return result;
};
export const DeletedDataService = {
  getSoftDeletedPosts,
  getSoftDeletedCategory,
  getSoftDeletedUsers,
};
