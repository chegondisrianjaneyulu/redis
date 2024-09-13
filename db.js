const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "redis-practice"
});

const connectDB = async () => {
    try {
        await pool.getConnection();
        console.log('db connected successfully');
    }
    catch (e) {
      console.log('unable to connect to db', e);
      process.exit(1);
    };
};

module.exports.pool = pool;
module.exports.connectDB = connectDB;