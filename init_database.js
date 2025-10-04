// init_database.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''  // 根据你的实际情况调整
});

async function initializeDatabase() {
    try {
        // 创建数据库
        await connection.promise().execute('CREATE DATABASE IF NOT EXISTS charityevents_db');
        console.log('✅ 数据库创建成功');
        
        // 使用数据库
        await connection.promise().execute('USE charityevents_db');
        
        // 创建表
        await connection.promise().execute(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            )
        `);
        
        await connection.promise().execute(`
            CREATE TABLE IF NOT EXISTS events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                full_description TEXT,
                date DATETIME NOT NULL,
                location VARCHAR(255) NOT NULL,
                purpose TEXT,
                ticket_price DECIMAL(10, 2) DEFAULT 0.00,
                goal_amount DECIMAL(10, 2),
                progress_amount DECIMAL(10, 2) DEFAULT 0.00,
                category_id INT,
                is_active BOOLEAN DEFAULT TRUE,
                FOREIGN KEY (category_id) REFERENCES categories(id)
            )
        `);
        console.log('✅ 表创建成功');
        
        // 插入样本数据
        await connection.promise().execute(`
            INSERT IGNORE INTO categories (id, name) VALUES 
            (1, 'Fun Run'),
            (2, 'Gala Dinner'),
            (3, 'Silent Auction'),
            (4, 'Concert')
        `);
        
        await connection.promise().execute(`
            INSERT IGNORE INTO events (name, description, full_description, date, location, purpose, ticket_price, goal_amount, progress_amount, category_id, is_active) VALUES
            ('City Marathon 2025', 'Annual city marathon for heart disease research.', 'A full description of the marathon route, sponsors, and activities.', '2025-10-15 08:00:00', 'Central Park', 'Raise funds for Heart Foundation', 50.00, 50000.00, 32500.00, 1, TRUE),
            ('Charity Gala Night', 'An elegant evening to support local shelters.', 'Detailed agenda, guest speakers, and menu for the night.', '2025-09-20 19:00:00', 'Grand Hotel Ballroom', 'Support homeless shelters', 150.00, 20000.00, 12000.00, 2, TRUE),
            ('Art Auction for Kids', 'Silent auction featuring local artists.', 'Browse and bid on beautiful artworks from talented local artists.', '2025-11-10 18:00:00', 'Art Gallery Downtown', 'Support children art programs', 25.00, 15000.00, 8000.00, 3, TRUE),
            ('Rock for a Cause', 'Charity concert featuring local bands.', 'An evening of great music for a great cause!', '2025-12-05 20:00:00', 'City Music Hall', 'Music education in schools', 35.00, 30000.00, 15000.00, 4, TRUE)
        `);
        
        console.log('✅ 样本数据插入成功');
        console.log('🎉 数据库初始化完成！');
        
    } catch (error) {
        console.error('❌ 数据库初始化失败:', error);
    } finally {
        connection.end();
    }
}

initializeDatabase();