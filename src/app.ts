import express, { NextFunction, Request, Response } from "express";
import router from "./app/router";
import { sendResponse } from "./app/share/sendResponse";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hey developer, Your code is running well!" });
});

app.use("/api/v1", router);

// ✅ Error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  sendResponse(res, {
    statusCode: 500,
    success: false,
    message: error.message || "Something went wrong!",
    data: error,
  });
});

export default app;
