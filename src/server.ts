import app from './app';
import pool from './config/db.config'; // your mysql pool module

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log('✅ Connected to MySQL database.');

    app.listen(PORT, () => {
      const now = new Date().toLocaleString();
      console.log('===================================');
      console.log(`🚀 Server is running!`);
      console.log(`📍 Listening on: http://localhost:${PORT}`);
      console.log(`🕒 Started at: ${now}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('===================================');
    });

  } catch (err) {
    console.error('❌ Failed to connect to MySQL database. Server not started.', err);
    process.exit(1); // stop the process, no point running server without DB
  }
}

startServer();
