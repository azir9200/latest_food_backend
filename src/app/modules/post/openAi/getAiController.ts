import { catchAsync } from "../../../share/catchAsync";
import { sendResponse } from "../../../share/sendResponse";
import { getAiService } from "./getAIService";

const getAISuggestions = catchAsync(async (req: Request, res: Response) => {
  const result = await getAiService.getAISuggestions(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "AI suggestions fetched successfully",
    data: result,
  });
});