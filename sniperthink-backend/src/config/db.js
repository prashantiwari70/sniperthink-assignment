import mysql from "mysql2/promise";

const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "sniperthink",
  waitForConnections: true,
  connectionLimit: 10
});

export default db;