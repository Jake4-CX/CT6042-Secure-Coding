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

  public async initializeDatabase(): Promise<void> {
    const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
      id int(11) NOT NULL AUTO_INCREMENT,
      userName varchar(24) NOT NULL,
      userEmail varchar(64) NOT NULL,
      userPassword varchar(32) NOT NULL,
      userToken varchar(32) NOT NULL,
      createdAt datetime DEFAULT current_timestamp(),
      updatedAt datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;

    const createMessagesTable = `CREATE TABLE IF NOT EXISTS messages (
      id int(11) NOT NULL AUTO_INCREMENT,
      userId int(11) NOT NULL,
      messageTitle varchar(255) NOT NULL,
      messageContent text NOT NULL,
      createdAt datetime DEFAULT current_timestamp(),
      updatedAt datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
      PRIMARY KEY (id),
      KEY fk_user_idx (userId),
      CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE NO ACTION
    ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;

    await this.query(createUsersTable);
    await this.query(createMessagesTable);
  }

}