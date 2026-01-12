// Initialize EmailJS
(function() {
    try {
        // Thay YOUR_PUBLIC_KEY bằng Public Key thật của bạn từ EmailJS Dashboard
        emailjs.init("YOUR_PUBLIC_KEY"); 
    } catch (e) {
        console.log("EmailJS chưa được cấu hình đúng.");
    }
})();

// Toast Notification Function
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '<i class="fas fa-check-circle" style="color: #22c55e; font-size: 1.2rem;"></i>',
        error: '<i class="fas fa-exclamation-circle" style="color: #ef4444; font-size: 1.2rem;"></i>',
        warning: '<i class="fas fa-exclamation-triangle" style="color: #f59e0b; font-size: 1.2rem;"></i>'
    };

    toast.innerHTML = `
        ${icons[type] || icons.success}
        <div>
            <div style="font-weight: 600; font-size: 0.9rem;">${type === 'success' ? 'Thành công' : 'Thông báo'}</div>
            <div style="font-size: 0.85rem; opacity: 0.9;">${message}</div>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

// Inputs
const loginUsernameInput = document.querySelector("#loginUsername");
const loginPasswordInput = document.querySelector("#loginPassword");
const regUsernameInput = document.querySelector("#regUsername");
const regEmailInput = document.querySelector("#regEmail");
const regPasswordInput = document.querySelector("#regPassword");
const regConfirmPasswordInput = document.querySelector("#regConfirmPassword");

// Event Listeners for switching modes
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Check if user is already logged in
// Handled by auth.js

// Register Logic
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const username = regUsernameInput.value.trim();
    const email = regEmailInput.value.trim();
    const password = regPasswordInput.value;
    const confirmPassword = regConfirmPasswordInput.value;
    
    const btn = registerForm.querySelector('.btn');
    const originalBtnText = btn.innerHTML;

    // Validation
    if (!username || !email || !password) {
        showToast("Vui lòng điền đầy đủ thông tin!", "warning");
        return;
    }

    if (password !== confirmPassword) {
        showToast("Mật khẩu xác nhận không khớp!", "error");
        return;
    }
    
    if (password.length < 6) {
        showToast("Mật khẩu phải có ít nhất 6 ký tự!", "warning");
        return;
    }
    
    // Set Loading State
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-loader"></span> Đang xử lý...';

    // Simulate Network Delay for smooth UX
    setTimeout(() => {
        // Check if user exists
        const users = JSON.parse(localStorage.getItem("users_v2")) || [];
        // Check case-insensitive
        const userExists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
        
        if (userExists) {
            showToast("Tên đăng nhập đã tồn tại!", "error");
            btn.disabled = false;
            btn.innerHTML = originalBtnText;
            return;
        }
        
        // Create new user
        const newUser = {
            username: username,
            email: email,
            password: password, 
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem("users_v2", JSON.stringify(users));
        
        // Gửi Email thông báo cho Admin (xuanvietzz87@gmail.com)
        const templateParams = {
            to_email: "xuanvietzz87@gmail.com", 
            to_name: "Admin",
            from_name: username,
            user_email: email, 
            message: `Người dùng mới đăng ký: ${username} (${email})`,
            date: new Date().toLocaleString('vi-VN')
        };

        // Gửi email ngầm (không chặn UI)
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('Email sent!', response.status, response.text);
            }, function(error) {
                console.log('Email failed...', error);
            });

        showToast("Đăng ký thành công! Vui lòng đăng nhập.", "success");
        
        // Switch to login view after short delay
        setTimeout(() => {
            container.classList.remove("sign-up-mode");
            
            // Pre-fill login username
            loginUsernameInput.value = username;
            loginPasswordInput.focus();
            
            // Clear register form
            registerForm.reset();
            
            // Reset Button
            btn.disabled = false;
            btn.innerHTML = originalBtnText;
        }, 1500);
        
    }, 1500); // 1.5s loading effect
});

// Login Logic
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value;
    
    const btn = loginForm.querySelector('.btn');
    const originalBtnText = btn.innerHTML;
    
    if (!username || !password) {
        showToast("Vui lòng nhập tên đăng nhập và mật khẩu!", "warning");
        return;
    }

    // Set Loading State
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-loader"></span> Đang đăng nhập...';

    setTimeout(() => {
        // Get users from storage
        const users = JSON.parse(localStorage.getItem("users_v2")) || [];
        
        // Find user
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Success
            localStorage.setItem("isLoggedIn_v2", "true");
            localStorage.setItem("currentUser_v2", JSON.stringify(user));
            
            showToast("Đăng nhập thành công!", "success");
            
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } else {
            showToast("Tên đăng nhập hoặc mật khẩu không đúng!", "error");
            btn.disabled = false;
            btn.innerHTML = originalBtnText;
        }
    }, 1000); // 1s delay
});