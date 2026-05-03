import { Pool } from "pg";

// Validate required environment variables at startup so misconfigured
// deployments fail fast with a clear error instead of silently connecting
// to undefined hosts.
const REQUIRED_ENV_VARS = [
  "DB_USER",
  "DB_HOST",
  "DB_NAME",
  "DB_PASSWORD",
  "DB_PORT",
];

for (const key of REQUIRED_ENV_VARS) {
  if (!process.env[key]) {
    throw new Error(
      `[db] Missing required environment variable: ${key}. ` +
        `Ensure it is set in .env.local (development) or your deployment environment.`
    );
  }
}

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),

  // --- Connection pool limits ---
  max: 10, // Maximum number of concurrent connections
  idleTimeoutMillis: 30_000, // Close idle connections after 30s
  connectionTimeoutMillis: 5_000, // Fail fast if no connection available in 5s

  // --- SSL: enforce encrypted connections in production ---
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: true }
      : false,
});

// Log pool errors to avoid silent failures
pool.on("error", (err) => {
  console.error("[db] Unexpected pool error:", err.message);
});

export default pool;
