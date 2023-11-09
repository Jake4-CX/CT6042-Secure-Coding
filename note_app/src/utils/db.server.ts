import "dotenv/config";
import { Pool, createPool } from 'mysql2/promise';

export class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    this.pool = createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();

    }
    return Database.instance;
  }

  public async query(sql: string, values?: any[]): Promise<any> {
    const connection = await this.pool.getConnection();

    try {
      const [results] = await connection.query(sql, values);
      return results;

    } finally {
      connection.release();

    }
  }

}