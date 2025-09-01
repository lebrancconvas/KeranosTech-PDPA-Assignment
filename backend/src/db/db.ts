import pg, { type PoolConfig } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const devConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
};

const localConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL
};

const pool = new Pool(process.env.NODE_ENV === 'development' ? localConfig : devConfig);

export const connection = async() => {
  try {
    const client = await pool.connect();
    console.log(`[SUCCESS] Connect to database success!`);
    client.release();
  } catch(err) {
    console.error(`[ERROR] Cannot connect to database.`, err);
    process.exit(1);
  }
};

export default pool;