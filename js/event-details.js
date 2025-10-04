// client/js/event-details.js
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('eventId');
    const detailsContainer = document.getElementById('event-details');
    const registerButton = document.getElementById('register-button');

    if (!eventId) {
        detailsContainer.innerHTML = `
            <div class="error-message">
                <h3>Event Not Specified</h3>
                <p>Please go back and select an event to view details.</p>
                <a href="index.html" class="btn">Back to Home</a>
            </div>
        `;
        return;
    }

    console.log(`📄 加载活动详情 ID: ${eventId}`);
    
    // 显示加载状态
    showLoading(detailsContainer);
    
    const response = await fetchData(`/events/${eventId}`);
    
    if (response && response.success) {
        const event = response.data;
        displayEventDetails(event, detailsContainer);
        
        // 更新页面标题
        document.title = `${event.name} - Charity Events`;
    } else {
        detailsContainer.innerHTML = `
            <div class="error-message">
                <h3>Failed to Load Event</h3>
                <p>Could not load event details. The event may not exist or there might be a connection issue.</p>
                <a href="index.html" class="btn">Back to Home</a>
            </div>
        `;
    }

    // 注册按钮点击事件
    registerButton.addEventListener('click', () => {
        const eventName = document.querySelector('.event-details h1')?.textContent || 'this event';
        alert(`Registration for "${eventName}" is currently under construction.\n\nThis feature will be available in the next version where you can purchase tickets and complete your registration.`);
    });
});

function displayEventDetails(event, container) {
    const progressPercentage = event.goal_amount > 0 ? (event.progress_amount / event.goal_amount * 100).toFixed(1) : 0;
    
    container.innerHTML = `
        <h1>${event.name}</h1>
        
        <div class="event-meta">
            <p><strong>🎯 Category:</strong> ${event.category_name}</p>
            <p><strong>📅 Date & Time:</strong> ${formatDate(event.date)}</p>
            <p><strong>📍 Location:</strong> ${event.location}</p>
            <p><strong>💰 Ticket Price:</strong> ${formatCurrency(event.ticket_price)}</p>
        </div>
        
        <div class="event-purpose">
            <h3>🎯 Event Purpose</h3>
            <p>${event.purpose}</p>
        </div>
        
        <div class="event-description">
            <h3>📖 Full Description</h3>
            <p>${event.full_description}</p>
        </div>
        
        <div class="fundraising-goal">
            <h3>💰 Fundraising Progress</h3>
            <p><strong>Goal Amount:</strong> ${formatCurrency(event.goal_amount)}</p>
            <p><strong>Current Progress:</strong> ${formatCurrency(event.progress_amount)}</p>
            <p><strong>Completion:</strong> ${progressPercentage}%</p>
            <progress value="${event.progress_amount}" max="${event.goal_amount}"></progress>
            <p style="margin-top: 0.5rem; font-size: 0.9rem; color: #666;">
                Help us reach our goal! Your participation makes a difference.
            </p>
        </div>
    `;
}