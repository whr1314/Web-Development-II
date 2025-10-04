// client/js/home.js
document.addEventListener('DOMContentLoaded', async () => {
    const eventListContainer = document.getElementById('event-list');
    
    console.log('🏠 加载首页活动...');
    
    // 显示加载状态
    showLoading(eventListContainer);
    
    const response = await fetchData('/events/home');
    
    if (response && response.success) {
        const events = response.data;
        
        if (events.length > 0) {
            eventListContainer.innerHTML = events.map(event => `
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
            
            console.log(`✅ 成功加载 ${events.length} 个活动`);
        } else {
            eventListContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #666;">
                    <h3>No Upcoming Events</h3>
                    <p>There are currently no upcoming charity events. Please check back later for new events!</p>
                </div>
            `;
        }
    } else {
        eventListContainer.innerHTML = `
            <div class="error-message">
                <strong>Failed to load events</strong>
                <p>Please make sure the server is running on http://localhost:3000</p>
                <button onclick="location.reload()" class="btn" style="margin-top: 0.5rem;">Retry</button>
            </div>
        `;
    }
});