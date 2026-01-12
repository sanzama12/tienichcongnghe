/**
 * Auth System for NexusTools
 * Handles session checks and UI updates
 */

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

function checkAuth() {
    const isLoggedIn = localStorage.getItem("isLoggedIn_v2") === "true";
    const currentUser = JSON.parse(localStorage.getItem("currentUser_v2"));
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath.includes('login.html');

    if (!isLoggedIn) {
        // If not logged in and trying to access protected pages
        if (!isLoginPage) {
            // Save the intended destination
            sessionStorage.setItem('redirectUrl', window.location.href);
            window.location.href = "login.html";
        }
    } else {
        // If logged in
        if (isLoginPage) {
            // If on login page, redirect to home or saved destination
            const redirectUrl = sessionStorage.getItem('redirectUrl') || "index.html";
            sessionStorage.removeItem('redirectUrl');
            window.location.href = redirectUrl;
        } else {
            // If on protected page, update UI
            updateUserUI(currentUser);
        }
    }
}

function updateUserUI(user) {
    const sidebarFooter = document.querySelector('.sidebar-footer');
    if (sidebarFooter && !document.getElementById('user-profile-widget')) {
        const userDiv = document.createElement('div');
        userDiv.id = 'user-profile-widget';
        userDiv.className = 'user-profile';
        // Inline styles for simplicity and self-containment
        userDiv.style.padding = '12px 0';
        userDiv.style.borderTop = '1px solid rgba(255,255,255,0.1)';
        userDiv.style.marginTop = 'auto';
        userDiv.style.marginBottom = '10px';
        userDiv.style.display = 'flex';
        userDiv.style.alignItems = 'center';
        userDiv.style.gap = '12px';
        userDiv.style.width = '100%';
        
        // Determine avatar color
        const avatarColor = user.subscription && user.subscription.type === 'Premium' 
            ? 'linear-gradient(to right, #f59e0b, #d97706)' 
            : 'linear-gradient(to right, #6366f1, #ec4899)';

        const badge = user.subscription ? 
            `<span style="font-size: 10px; padding: 2px 6px; background: rgba(255,255,255,0.1); border-radius: 4px; margin-left: auto;">${user.subscription.type}</span>` : '';

        userDiv.innerHTML = `
            <div style="width: 36px; height: 36px; background: ${avatarColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                ${user.username.charAt(0).toUpperCase()}
            </div>
            <div style="flex: 1; overflow: hidden; display: flex; flex-direction: column;">
                <div style="color: white; font-weight: 600; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${user.username}</div>
                <div style="color: #94a3b8; font-size: 12px; display: flex; align-items: center; gap: 4px;">
                    ${user.subscription ? '✨ VIP Member' : 'Member'}
                </div>
            </div>
            <button id="logoutBtn" title="Đăng xuất" style="background: rgba(255,255,255,0.05); border: none; color: #f87171; cursor: pointer; padding: 8px; border-radius: 8px; transition: all 0.2s;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </button>
        `;
        
        // Add before the existing content of sidebar-footer (which is the theme toggle usually)
        sidebarFooter.insertBefore(userDiv, sidebarFooter.firstChild);

        // Hover effect for logout button
        const logoutBtn = document.getElementById('logoutBtn');
        logoutBtn.addEventListener('mouseenter', () => logoutBtn.style.background = 'rgba(248, 113, 113, 0.1)');
        logoutBtn.addEventListener('mouseleave', () => logoutBtn.style.background = 'rgba(255,255,255,0.05)');

        // Handle Logout
        logoutBtn.addEventListener('click', () => {
            if(confirm('Bạn có chắc muốn đăng xuất?')) {
                localStorage.removeItem("isLoggedIn_v2");
                localStorage.removeItem("currentUser_v2");
                window.location.href = "login.html";
            }
        });
    }
}