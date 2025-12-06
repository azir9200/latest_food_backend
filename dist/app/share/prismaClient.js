"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = prisma;
//import { PrismaClient } from '@prisma/client';
// import { PrismaPg } from '@prisma/adapter-postgresql';
// import { Pool } from 'pg';
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });
// const adapter = new PrismaPg(pool);
// const prisma = new PrismaClient({
//   adapter,
// });
// export default prisma;
