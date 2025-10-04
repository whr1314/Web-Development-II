// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 导入数据库连接
const db = require('./event_db');

// 测试路由
app.get('/', (req, res) => {
    res.json({ 
        message: 'Charity Events API 正在运行!',
        endpoints: {
            home: '/api/events/home',
            search: '/api/events/search',
            categories: '/api/categories',
            eventDetails: '/api/events/:id'
        }
    });
});

// 1. 首页数据 - 获取所有活跃的、未来的活动
app.get('/api/events/home', async (req, res) => {
    try {
        console.log('📝 获取首页活动数据...');
        const [rows] = await db.execute(
            `SELECT e.*, c.name as category_name 
             FROM events e 
             JOIN categories c ON e.category_id = c.id 
             WHERE e.date >= NOW() AND e.is_active = TRUE 
             ORDER BY e.date ASC`
        );
        console.log(`✅ 找到 ${rows.length} 个活动`);
        res.json({
            success: true,
            data: rows,
            count: rows.length
        });
    } catch (error) {
        console.error('❌ 获取首页数据错误:', error);
        res.status(500).json({
            success: false,
            error: '获取活动数据失败'
        });
    }
});

// 2. 获取所有类别
app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM categories ORDER BY name');
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('❌ 获取类别错误:', error);
        res.status(500).json({
            success: false,
            error: '获取类别失败'
        });
    }
});

// 3. 搜索活动
app.get('/api/events/search', async (req, res) => {
    try {
        let { category, location, date } = req.query;
        console.log('🔍 搜索参数:', { category, location, date });
        
        let query = `
            SELECT e.*, c.name as category_name 
            FROM events e 
            JOIN categories c ON e.category_id = c.id 
            WHERE e.is_active = TRUE
        `;
        let params = [];

        if (category && category !== '') {
            query += ` AND c.name = ?`;
            params.push(category);
        }
        if (location && location !== '') {
            query += ` AND e.location LIKE ?`;
            params.push(`%${location}%`);
        }
        if (date && date !== '') {
            query += ` AND DATE(e.date) = ?`;
            params.push(date);
        }

        query += ` ORDER BY e.date ASC`;

        const [rows] = await db.execute(query, params);
        console.log(`✅ 搜索找到 ${rows.length} 个结果`);
        
        res.json({
            success: true,
            data: rows,
            count: rows.length
        });
    } catch (error) {
        console.error('❌ 搜索错误:', error);
        res.status(500).json({
            success: false,
            error: '搜索活动失败'
        });
    }
});

// 4. 获取活动详情
app.get('/api/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        console.log(`📄 获取活动详情 ID: ${eventId}`);
        
        const [rows] = await db.execute(
            `SELECT e.*, c.name as category_name 
             FROM events e 
             JOIN categories c ON e.category_id = c.id 
             WHERE e.id = ?`,
            [eventId]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: '活动未找到'
            });
        }
        
        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error('❌ 获取活动详情错误:', error);
        res.status(500).json({
            success: false,
            error: '获取活动详情失败'
        });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`🚀 服务器运行在 http://localhost:${port}`);
    console.log(`📚 API文档: http://localhost:${port}`);
});