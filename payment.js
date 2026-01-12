document.addEventListener('DOMContentLoaded', () => {
    try {
        // 1. Parse URL Parameters
        const urlParams = new URLSearchParams(window.location.search);
        const plan = urlParams.get('plan') || 'pro'; // default to pro
        const price = urlParams.get('price') || '99000';

        // 2. Update Order Summary
        const planNames = {
            'pro': 'Gói Pro (30 Ngày)',
            'premium': 'Gói Vĩnh Viễn'
        };
        const planDurations = {
            'pro': '30 Ngày',
            'premium': 'Vĩnh viễn'
        };
        const transferContents = {
            'pro': 'MUA KEY PRO',
            'premium': 'MUA KEY VIP'
        };

        const summaryPlan = document.getElementById('summary-plan');
        if (summaryPlan) summaryPlan.textContent = planNames[plan] || 'Gói Pro';
        
        const summaryDuration = document.getElementById('summary-duration');
        if (summaryDuration) summaryDuration.textContent = planDurations[plan] || '30 Ngày';
        
        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        const summaryPrice = document.getElementById('summary-price');
        const summaryTotal = document.getElementById('summary-total');
        if (summaryPrice) summaryPrice.textContent = formattedPrice;
        if (summaryTotal) summaryTotal.textContent = formattedPrice;

        // Update Modal Dynamic Text (Plan Specific)
        const shortPlanNames = {
            'pro': 'PRO',
            'premium': 'VIP'
        };
        
        const processingMsg = document.getElementById('processingMessage');
        if (processingMsg) processingMsg.textContent = `Hệ thống đang kiểm tra giao dịch ${planNames[plan] || 'Gói Pro'} của bạn.`;
        
        const keyLabel = document.getElementById('keyLabel');
        if (keyLabel) keyLabel.textContent = `LICENSE KEY ${shortPlanNames[plan] || 'PRO'}`;

        // Update Transfer Content (Lời nhắn chuyển khoản)
        const contentPrefix = transferContents[plan] || 'MUA KEY';
        let username = 'USER';
        try {
            const userStr = localStorage.getItem('currentUser_v2');
            if (userStr) {
                const userObj = JSON.parse(userStr);
                if (userObj && userObj.username) {
                    username = userObj.username;
                }
            }
        } catch (e) {
            console.error('Error parsing user data:', e);
        }

        const fullContent = `${contentPrefix} ${username}`;
        
        document.querySelectorAll('[id^="transfer-content"]').forEach(el => {
            el.textContent = fullContent;
        });

        // Update QR Codes with dynamic amount and content
        const encodedContent = encodeURIComponent(fullContent);
        const vcbQr = document.getElementById('vcb-qr');
        
        if (vcbQr) {
            vcbQr.src = `https://img.vietqr.io/image/VCB-1014589999-compact2.jpg?amount=${price}&addInfo=${encodedContent}`;
        }

        // 3. Handle Payment Method Switching
        const methodCards = document.querySelectorAll('.method-card');
        const methodContents = document.querySelectorAll('.method-content');

        if (methodCards.length > 0) {
            methodCards.forEach(card => {
                card.addEventListener('click', () => {
                    // Remove active class from all
                    methodCards.forEach(c => c.classList.remove('active'));
                    methodContents.forEach(c => c.classList.remove('active'));

                    // Add active class to clicked
                    card.classList.add('active');
                    const methodId = card.getAttribute('data-method');
                    const content = document.getElementById(`${methodId}-content`);
                    if (content) content.classList.add('active');
                });
            });
        }

        // 4. Handle Confirmation and 3-Click Logic
        const confirmBtn = document.getElementById('confirmPaymentBtn');
        const modal = document.getElementById('paymentOverlay');
        const recheckBtn = document.getElementById('recheckBtn');
        const copyKeyBtn = document.getElementById('copyKeyBtn');
        let confirmClickCount = 0;

        // Open Modal on first click (Click #1)
        if (confirmBtn && modal) {
            confirmBtn.addEventListener('click', () => {
                confirmClickCount = 1; // First click on main button
                
                // Show Modal with Warning Step
                const warningStep = document.getElementById('warningStep');
                const keyStep = document.getElementById('keyStep');
                if (warningStep) warningStep.style.display = 'block';
                if (keyStep) keyStep.style.display = 'none';
                modal.classList.add('active');
            });
        }

        // Handle clicks inside Modal
        if (recheckBtn) {
            recheckBtn.addEventListener('click', () => {
                confirmClickCount++;

                if (confirmClickCount === 2) {
                    // Second click: Warning again (Shake effect)
                    const warningContent = document.querySelector('.warning-content');
                    if (warningContent) {
                        warningContent.style.animation = 'none';
                        warningContent.offsetHeight; /* trigger reflow */
                        warningContent.style.animation = 'shake 0.5s';
                    }
                    
                    showToast('⚠️ Vui lòng chờ hệ thống duyệt...', 'warning');
                } 
                else if (confirmClickCount === 3) {
                    // Third click: Success -> Show Key
                    const warningStep = document.getElementById('warningStep');
                    const keyStep = document.getElementById('keyStep');
                    if (warningStep) warningStep.style.display = 'none';
                    if (keyStep) keyStep.style.display = 'block';
                    
                    // Generate Key based on current Plan
                    let prefix = 'NEXUS-VIP-';
                    let durationDays = 36500; // default permanent
                    
                    if (plan === 'pro') {
                        prefix = 'NEXUS-PRO-';
                        durationDays = 30;
                    }

                    const randomKey = `${prefix}${Math.random().toString(36).substr(2,4).toUpperCase()}-${Math.random().toString(36).substr(2,4).toUpperCase()}`;
                    const finalKey = document.getElementById('finalKey');
                    if (finalKey) finalKey.textContent = randomKey;
                    
                    showToast('✅ Xác nhận thành công!', 'success');
                }
            });
        }

        // Close Modal
        window.closePaymentModal = () => {
            if (modal) modal.classList.remove('active');
        };

        // Finish Payment (Click "Hoàn tất")
        window.finishPayment = () => {
            window.location.href = 'muakey.html';
        };

        // Copy Key
        if (copyKeyBtn) {
            copyKeyBtn.addEventListener('click', () => {
                const finalKey = document.getElementById('finalKey');
                if (!finalKey) return;
                
                const keyText = finalKey.textContent;
                navigator.clipboard.writeText(keyText).then(() => {
                    const originalText = copyKeyBtn.innerHTML;
                    copyKeyBtn.innerHTML = '✅ Đã sao chép';
                    setTimeout(() => {
                        copyKeyBtn.innerHTML = originalText;
                    }, 2000);
                });
            });
        }

        // Toast Function
        window.showToast = function(message, type = 'info') {
            const container = document.getElementById('toastContainer');
            if (!container) return;
            
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.textContent = message;
            
            container.appendChild(toast);
            
            setTimeout(() => {
                toast.style.animation = 'slideIn 0.3s ease reverse';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        };
    } catch (err) {
        console.error('Payment page error:', err);
    }
});