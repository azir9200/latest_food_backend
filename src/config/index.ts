import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
      admin_email: process.env.REFRESH_TOKEN_SECRET,
    app_pass: process.env.APP_PASSWORD,
  },
 
  
};
