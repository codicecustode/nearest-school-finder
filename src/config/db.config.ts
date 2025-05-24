import mysql from 'mysql2/promise';
// Uncomment below if you want colors in console logs
// import chalk from 'chalk';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Admin@1234',
  database: process.env.DB_NAME || 'school_management',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


export default pool;
