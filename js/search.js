// client/js/search.js
document.addEventListener('DOMContentLoaded', async () => {
    // 加载类别下拉菜单
    const categorySelect = document.getElementById('category');
    const resultsContainer = document.getElementById('search-results');
    
    console.log('🔍 初始化搜索页面...');
    
    // 显示加载状态
    showLoading(resultsContainer);
    
    const categoriesResponse = await fetchData('/categories');
    
    if (categoriesResponse && categoriesResponse.success) {
        const categories = categoriesResponse.data;
        categorySelect.innerHTML = '<option value="">All Categories</option>' +
            categories.map(cat => `<option value="${cat.name}">${cat.name}</option>`).join('');
        
        resultsContainer.innerHTML = '<p>Use the search form above to find charity events. You can filter by category, location, or date.</p>';
    } else {
        resultsContainer.innerHTML = '<div class="error-message">Failed to load categories</div>';
    }

    // 搜索表单提交
    const searchForm = document.getElementById('search-form');
    const clearButton = document.getElementById('clear-filters');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await performSearch();
    });

    // 清除按钮
    clearButton.addEventListener('click', () => {
        searchForm.reset();
        resultsContainer.innerHTML = '<p>Use the search form above to find charity events. You can filter by category, location, or date.</p>';
    });
});

async function performSearch() {
    const formData = new FormData(document.getElementById('search-form'));
    const params = new URLSearchParams();
    const resultsContainer = document.getElementById('search-results');
    
    for (const [key, value] of formData.entries()) {
        if (value) params.append(key, value);
    }

    const queryString = params.toString();
    console.log('🔍 搜索参数:', queryString);
    
    // 显示加载状态
    showLoading(resultsContainer);
    
    const response = await fetchData(`/events/search?${queryString}`);
    
    if (response && response.success) {
        const events = response.data;
        displayResults(events, resultsContainer);
    } else {
        resultsContainer.innerHTML = '<div class="error-message">Search failed. Please try again.</div>';
    }
}

function displayResults(events, container) {
    if (events.length > 0) {
        container.innerHTML = events.map(event => `
            <div class="event-card">
                <h3><a href="event-details.html?eventId=${event.id}">${event.name}</a></h3>
                <p><strong>🎯 Category:</strong> ${event.category_name}</p>
                <p><strong>📅 Date:</strong> ${formatDate(event.date)}</p>
                <p><strong>📍 Location:</strong> ${event.location}</p>
                <p><strong>💰 Ticket Price:</strong> ${formatCurrency(event.ticket_price)}</p>
                <p><strong>🎯 Purpose:</strong> ${event.purpose}</p>
                <p>${event.description}</p>
                <div style="margin-top: 1rem;">
                    <a href="event-details.html?eventId=${event.id}" class="btn">View Details & Register</a>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = `<h4>Found ${events.length} event(s)</h4>` + container.innerHTML;
    } else {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <h3>No Events Found</h3>
                <p>No events match your search criteria. Try adjusting your filters or browse all events on the home page.</p>
                <a href="index.html" class="btn" style="margin-top: 1rem;">View All Events</a>
            </div>
        `;
    }
}