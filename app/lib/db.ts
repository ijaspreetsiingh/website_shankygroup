import mysql, { Pool, RowDataPacket } from 'mysql2/promise';

declare global {
  var __shankyDbPool: Pool | undefined;
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getPool(): Pool {
  if (!global.__shankyDbPool) {
    global.__shankyDbPool = mysql.createPool({
      host: requiredEnv('DB_HOST'),
      port: Number(process.env.DB_PORT || 3306),
      user: requiredEnv('DB_USER'),
      password: process.env.DB_PASSWORD || '',
      database: requiredEnv('DB_NAME'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return global.__shankyDbPool;
}

export async function query<T extends RowDataPacket[]>(
  sql: string,
  params: Array<string | number | boolean | null> = []
): Promise<T> {
  const [rows] = await getPool().execute<T>(sql, params);
  return rows;
}

export async function execute(
  sql: string,
  params: Array<string | number | boolean | null> = []
) {
  return getPool().execute(sql, params);
}
