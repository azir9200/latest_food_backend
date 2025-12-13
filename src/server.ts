import { Server } from "http";
import app from "./app";
import { seedSuperAdmin } from "./app/share/seedSuperAdmin";

async function bootstrap() {
  let server: Server;
  try {
    // Start the server
    server = app.listen(process.env.port, () => {
      seedSuperAdmin();
      console.log(
        `🚀 Server is running on http://localhost:${process.env.port}`
      );
    });
    // Function to gracefully shut down the server
    const gracefulShutdown = (signal: string) => {
      console.warn(`🔄 Received ${signal}, shutting down gracefully...`);
      if (server) {
        server.close(async () => {
          console.log("Server closed gracefully.");
          try {
            console.log("Server shutdown complete.");
          } catch (error) {
            console.error("❌ Error during shutdown:", error);
          }
          process.exit(1); // Exit with a failure code
        });
      } else {
        process.exit(1);
      }
    };
    // Handle unhandled promise rejections
    process.on("unhandledRejection", (error) => {
      console.log(
        "Unhandled Rejection is detected, we are closing our server..."
      );
      if (server) {
        server.close(() => {
          console.log(error);
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
}

bootstrap();
