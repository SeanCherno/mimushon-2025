import { Pool } from "pg";

// Next.js טוען אוטומטית משתני סביבה מ- .env.local
// לכן אין צורך ב- dotenv/config
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;
