// services/comment.service.ts

import { Comments } from "@prisma/client";
import prisma from "../../share/prismaClient";


const commentCreate = async (payload: Comments, userId: string) => {
  console.log("comment ser", payload);
  const { postId, commentText } = payload;
   if (!postId || !commentText) {
    throw new Error("postId and commentText are required");
  }
  const result = await prisma.comments.create({
    data: {
      userId,
      postId,
      commentText,
    },
  });
  console.log(result);
  return result;
};
const commentUpdate = async (commentId: string, payload: Partial<Comments>) => {
  const result = await prisma.comments.update({
    where: {
      id: commentId,
    },
    data: {
      commentText: payload.commentText,
    },
  });
  return result;
};
const commentdeleted = async (commentId: string) => {
  const result = await prisma.comments.delete({
    where: {
      id: commentId,
    },
  });
  return result;
};
const commentGet = async () => {
  const result = await prisma.comments.findMany({
    include: {
      user: {
        select: {
          email: true,
        },
      },
      post: {
        select: {
          title: true,
        },
      },
    },
  });
  return result;
};

export const commentService = {
  commentCreate,
  commentUpdate,
  commentdeleted,
  commentGet,
};
