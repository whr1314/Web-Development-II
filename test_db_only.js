// test_db_only.js - 只测试数据库
console.log('🔍 专门测试数据库连接...\n');

async function testDatabase() {
    try {
        console.log('1. 加载mysql2...');
        const mysql = require('mysql2');
        console.log('✅ mysql2加载成功');
        
        console.log('2. 尝试连接数据库...');
        const db = require('./event_db');
        console.log('✅ 数据库连接文件加载成功');
        
        console.log('3. 执行测试查询...');
        const [result] = await db.execute('SELECT 1 + 1 AS solution');
        console.log('✅ 数据库查询成功:', result[0].solution);
        
        console.log('4. 检查表...');
        const [tables] = await db.execute('SHOW TABLES');
        console.log('📊 数据库表:', tables.map(t => Object.values(t)[0]));
        
        console.log('\n🎉 数据库连接完全正常！');
        return true;
        
    } catch (error) {
        console.log('\n❌ 数据库连接失败:');
        console.log('错误信息:', error.message);
        console.log('错误代码:', error.code);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 MySQL服务可能没有运行');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('💡 用户名或密码错误');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.log('💡 数据库不存在');
        }
        
        return false;
    }
}

testDatabase().then(success => {
    if (success) {
        console.log('\n✅ 数据库正常，问题在服务器代码');
    } else {
        console.log('\n❌ 需要先解决数据库问题');
    }
});