// find_credentials.js - 用于测试不同的凭据
const mysql = require('mysql2');

// 常见的默认凭据组合
const configs = [
    { host: 'localhost', user: 'root', password: '' },
    { host: 'localhost', user: 'root', password: 'root' },
    { host: 'localhost', user: 'root', password: 'password' },
    { host: '127.0.0.1', user: 'root', password: '' },
    // 添加你记得的其他组合
];

async function testConfig(config) {
    try {
        const connection = mysql.createConnection(config);
        await connection.promise().execute('SELECT 1');
        console.log('✅ 成功连接使用:', config);
        connection.end();
        return true;
    } catch (error) {
        console.log('❌ 失败:', config, error.message);
        return false;
    }
}

// 测试所有配置
configs.forEach(testConfig);