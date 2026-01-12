// Authentication Check
// Handled by auth.js

document.addEventListener('DOMContentLoaded', () => {
    const activateBtn = document.getElementById('activateBtn');
    const keyInput = document.getElementById('keyInput');
    const accountStatus = document.getElementById('accountStatus');
    const expiryDate = document.getElementById('expiryDate');

    // Check Current Status
    function checkStatus() {
        const user = JSON.parse(localStorage.getItem('currentUser_v2')) || {};
        const now = new Date();

        if (user.subscription && new Date(user.subscription.expiry) > now) {
            accountStatus.textContent = user.subscription.type;
            accountStatus.className = 'badge premium';
            
            const expiry = new Date(user.subscription.expiry);
            expiryDate.style.display = 'block';
            expiryDate.textContent = `Hết hạn: ${expiry.toLocaleDateString('vi-VN')}`;
            
            // Disable inputs if already premium
            if (user.subscription.type === 'Premium') {
                keyInput.disabled = true;
                keyInput.placeholder = "Bạn đã sở hữu gói cao cấp nhất";
                activateBtn.disabled = true;
                activateBtn.textContent = "Đã Kích Hoạt";
            }
        } else {
            accountStatus.textContent = 'Thường';
            accountStatus.className = 'badge basic';
            expiryDate.style.display = 'none';
        }
    }

    // Initial check
    checkStatus();

    // Activate Key Handler
    activateBtn.addEventListener('click', () => {
        const inputKey = keyInput.value.trim().toUpperCase();
        
        if (!inputKey) {
            alert('Vui lòng nhập mã kích hoạt!');
            return;
        }

        let planType = null;
        let duration = 0;

        // Dynamic Key Validation
        if (inputKey.startsWith('NEXUS-VIP-')) {
            planType = 'Premium';
            duration = 36500; // ~100 years (Permanent)
        } else if (inputKey.startsWith('NEXUS-PRO-')) {
            planType = 'Pro';
            duration = 30; // 30 days
        }

        if (planType) {
            // Update User Data
            const user = JSON.parse(localStorage.getItem('currentUser_v2'));
            const users = JSON.parse(localStorage.getItem('users_v2')) || [];
            
            const now = new Date();
            const expiry = new Date(now.setDate(now.getDate() + duration));

            user.subscription = {
                type: planType,
                expiry: expiry.toISOString(),
                activatedAt: new Date().toISOString()
            };

            // Save to Current User
            localStorage.setItem('currentUser_v2', JSON.stringify(user));

            // Update in Users Array
            const userIndex = users.findIndex(u => u.username === user.username);
            if (userIndex !== -1) {
                users[userIndex] = user;
                localStorage.setItem('users_v2', JSON.stringify(users));
            }

            alert(`🎉 Chúc mừng! Tài khoản đã được nâng cấp lên gói ${planType}.`);
            
            // Reload to reflect changes immediately
            window.location.reload();
        } else {
            alert('❌ Mã kích hoạt không hợp lệ hoặc đã hết hạn!');
        }
    });
});