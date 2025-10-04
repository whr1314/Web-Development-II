// client/js/main.js
const API_BASE_URL = 'http://localhost:3000/api';

// 通用函数：获取数据
async function fetchData(endpoint) {
    try {
        console.log(`🔄 获取数据: ${API_BASE_URL}${endpoint}`);
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`✅ 数据获取成功:`, data);
        return data;
    } catch (error) {
        console.error('❌ 获取数据失败:', error);
        showError('Failed to load data. Please make sure the server is running on http://localhost:3000');
        return null;
    }
}

// 显示错误信息
function showError(message) {
    // 移除现有的错误消息
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <strong>Error:</strong> ${message}
        <br><small>Please check if the server is running and try again.</small>
    `;
    
    // 插入到页面顶部
    const main = document.querySelector('main');
    if (main) {
        main.insertBefore(errorDiv, main.firstChild);
    }
    
    // 5秒后自动移除
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// 显示成功信息
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const main = document.querySelector('main');
    if (main) {
        main.insertBefore(successDiv, main.firstChild);
    }
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 3000);
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 格式化货币
function formatCurrency(amount) {
    if (amount === 0) return 'Free';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// 显示加载状态
function showLoading(container) {
    if (container) {
        container.innerHTML = '<div class="loading">Loading...</div>';
    }
}

// 检查服务器连接
async function checkServerConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        return response.ok;
    } catch (error) {
        return false;
    }
}