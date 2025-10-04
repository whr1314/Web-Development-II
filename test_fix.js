// test_fix.js - 测试修复后的数据库连接
console.log('🔧 测试修复后的数据库连接...\n');

async function testFixedConnection() {
    try {
        console.log('1. 加载修复后的数据库连接...');
        const db = require('./event_db');
        console.log('✅ 数据库连接加载成功');
        
        console.log('2. 检查 db 的类型:', typeof db);
        console.log('3. 检查 db.execute 是否存在:', typeof db.execute);
        
        if (typeof db.execute === 'function') {
            console.log('✅ db.execute 是一个函数！');
            
            console.log('4. 执行测试查询...');
            const [result] = await db.execute('SELECT 1 + 1 AS solution');
            console.log('✅ 查询成功！结果:', result[0].solution);
            
            console.log('5. 检查数据库和表...');
            const [tables] = await db.execute('SHOW TABLES');
            console.log('📊 数据库表:', tables.map(t => Object.values(t)[0]));
            
            console.log('\n🎉 🎉 🎉 数据库连接完全修复！');
            return true;
        } else {
            console.log('❌ db.execute 不是函数，需要进一步修复');
            return false;
        }
        
    } catch (error) {
        console.log('❌ 测试失败:', error.message);
        return false;
    }
}

testFixedConnection().then(success => {
    if (success) {
        console.log('\n✅ 现在可以正常运行 server.js 了');
        console.log('💡 运行: node server.js');
    } else {
        console.log('\n❌ 还需要进一步调试');
    }
});