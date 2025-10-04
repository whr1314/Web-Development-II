// debug_server.js - 详细诊断
console.log('🔍 开始详细诊断服务器问题...\n');

try {
    console.log('1. 加载Express...');
    const express = require('express');
    console.log('✅ Express加载成功');
    
    console.log('2. 加载CORS...');
    const cors = require('cors');
    console.log('✅ CORS加载成功');
    
    console.log('3. 加载数据库连接...');
    const db = require('./event_db');
    console.log('✅ 数据库连接加载成功');
    
    console.log('4. 创建Express应用...');
    const app = express();
    
    console.log('5. 设置中间件...');
    app.use(cors());
    app.use(express.json());
    console.log('✅ 中间件设置成功');
    
    console.log('6. 设置路由...');
    app.get('/', (req, res) => {
        console.log('📨 收到主页请求');
        res.json({ 
            message: '服务器正在运行！',
            status: 'success',
            timestamp: new Date().toISOString()
        });
    });
    
    console.log('7. 启动服务器...');
    const PORT = 3000;
    const server = app.listen(PORT, () => {
        console.log(`\n🎉 🎉 🎉 服务器成功启动！`);
        console.log(`🚀 访问: http://localhost:${PORT}`);
        console.log(`⏰ 启动时间: ${new Date().toLocaleString()}`);
    });
    
    // 处理服务器错误
    server.on('error', (error) => {
        console.log('❌ 服务器启动错误:', error.message);
        if (error.code === 'EADDRINUSE') {
            console.log('💡 端口被占用，尝试端口 3001...');
            const newApp = express();
            newApp.use(cors());
            newApp.get('/', (req, res) => res.json({ message: '运行在3001端口' }));
            newApp.listen(3001, () => {
                console.log(`🚀 服务器运行在 http://localhost:3001`);
            });
        }
    });
    
} catch (error) {
    console.log('\n❌ ❌ ❌ 启动过程中发生错误:');
    console.log('错误信息:', error.message);
    console.log('错误位置:', error.stack);
    
    if (error.message.includes('Cannot find module')) {
        console.log('\n💡 解决方案: 运行 npm install');
    } else if (error.message.includes('Access denied')) {
        console.log('\n💡 解决方案: 检查数据库密码配置');
    }
}