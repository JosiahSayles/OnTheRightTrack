import pg from "pg";

const config = process.env.DATABASE_URL;
const db = new pg.Client({
  connectionString: config,
  ssl: {
    rejectUnauthorized: false,
  },
});
export default db;
