### Project Name: FoodBook Backend : latest_food_backend

-- A modular and scalable backend API built with TypeScript, Express, PostgreSQL, Prisma ORM, JWT, Bcrypt, and clean project architecture. This backend powers the FoodBook application by managing users, posts, categories, comments, ratings, votes, restaurant data, and more.

## Tech Stack & Why They Are Used

- TypeScript : Used for static typing and clean, maintainable code. Helps prevent bugs with type‑safety and improved IntelliSense. Makes the codebase scalable for long‑term development.

- Express.js : Lightweight and fast web framework. Perfect for building REST APIs. Easy to structure into a modular folder system.

- PostgreSQL: Reliable, powerful relational database. Great support for relations: posts, categories, comments, ratings. Excellent performance for production systems.

- Prisma ORM : Modern ORM for database modeling and queries. Prisma Client auto‑generates type‑safe queries. Super easy database migrations and schema updates.

- JWT (JSON Web Tokens) : Used for user authentication., Secure, stateless login system. Works perfectly with frontend applications.

- Bcrypt: Used for secure password hashing. Ensures user passwords are fully protected in the database.

- Modular Architecture: My project follows a clean, scalable modular architecture:

-- Each feature (Post, User, Category, Rating, Comment, Restaurant, Voting, etc.) has: controller, service, route, interface, validation.

Entry Points (app.ts & server.ts)

app.ts → Loads middleware, routes, error handlers.

server.ts → Starts the server and handles database connection.

This separation improves clarity and reusability.

## 📂 Project Structure

            src/
            ├── config/
            ├── middleware/
            ├── modules/
            │ ├── post/
            │ │ ├── post.controller.ts
            │ │ ├── post.service.ts
            │ │ ├── post.route.ts
            │ │ └── interface/
            │ ├── categories/
            │ ├── comment/
            │ ├── rating/
            │ ├── restaurant/
            │ ├── votes/
            │ └── DeletedData/
            ├── router/
            ├── prisma/
            ├── utils/
            ├── app.ts
            ├── server.ts
            └── share/

🧪 Features

- User authentication & authorization (JWT)

- Post creation, update, delete, filtering

- Restaurant & food management

⭐ Ratings, likes/votes

- Comments system

- Categories

- Deleted data tracking

- Global error handling

- Modular service layer architecture

- Installation Guide (Clone & Run Locally)

- Follow these steps to run the backend on your machine.

## Clone the repository :

-- git clone YOUR_REPO_LINK

- Navigate into the project folder
  cd your-backend-folder
- Install dependencies
- npm install
- Setup environment variables

Create a .env file in the root directory:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/foodbook"
JWT_SECRET="your_jwt_secret"
BCRYPT_SALT=10
PORT=5000
5️⃣ Initialize Prisma
npx prisma generate
npx prisma migrate dev
6️⃣ Start the server (development)
npm run dev
7️⃣ Production build
npm run build
npm run prod
API Testing

You can test the API using: Postman, Thunder Client, Insomnia,

# API base URL (local):

http://localhost:5000/api/v1

- Error Handling & Validation

- Centralized error middleware.

- Zod/Yup/Joi validation schema depending on your setup.

- Prevents invalid data from entering the database.

- Project Structure Image

- (Attached screenshot describes folder structure.)

If you want improvements or suggestions feel free to ask.

Developer: azir uddin

Happy Coding! 🎉
