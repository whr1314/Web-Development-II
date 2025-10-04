// event_db.js
const mysql = require('mysql2');

// 创建连接池（比单个连接更高效）
const pool = mysql.createPool({
    host: 'localhost',          // MySQL 服务器地址
    user: 'root',               // 替换为你的 MySQL 用户名
    password: '143511',  // 替换为你的 MySQL 密码
    database: 'charityevents_db', // 你创建的数据库名
    waitForConnections: true,   // 是否等待连接
    connectionLimit: 10,        // 最大连接数
    queueLimit: 0               // 队列限制（0表示无限制）
});

// 将连接池转换为 Promise 版本，方便使用 async/await
const promisePool = pool.promise();

// 测试连接
async function testConnection() {
    try {
        const [rows] = await promisePool.execute('SELECT 1 + 1 AS solution');
        console.log('✅ 数据库连接成功！测试结果:', rows[0].solution);
        return true;
    } catch (error) {
        console.error('❌ 数据库连接失败:', error.message);
        return false;
    }
}

// 立即测试连接
testConnection();

// 导出连接池，供其他文件使用
module.exports = promisePool;