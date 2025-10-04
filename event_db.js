// event_db.js - 修复版本
const mysql = require('mysql2');

// 创建连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '143511',  // 使用你设置的密码
    database: 'charityevents_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 转换为Promise版本
const promisePool = pool.promise();

console.log('🔧 数据库连接配置完成');

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

// 导出连接池，确保导出的是 promisePool
module.exports = promisePool;

// 可选：立即测试连接（但不要阻塞启动）
testConnection().then(success => {
    if (success) {
        console.log('🎉 数据库准备就绪');
    } else {
        console.log('💡 请检查数据库配置');
    }
});