// Authentication Check
if (localStorage.getItem("isLoggedIn_v2") !== "true") {
    window.location.href = "login.html";
}

// Sidebar Toggle Functionality
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mainContent = document.getElementById('mainContent');

// Create overlay for mobile
const overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
document.body.appendChild(overlay);

// Toggle sidebar function
function toggleSidebar() {
    if (!sidebar) return; // Guard clause
    if (window.innerWidth > 1024) {
        // Desktop: collapse/expand
        sidebar.classList.toggle('collapsed');
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    } else {
        // Mobile: open/close
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    }
}

// Event listeners
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
}

overlay.addEventListener('click', () => {
    if (sidebar) sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Handle window resize
window.addEventListener('resize', () => {
    if (!sidebar) return;
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Restore collapsed state on desktop
        const wasCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (wasCollapsed) {
            sidebar.classList.add('collapsed');
        }
    } else {
        sidebar.classList.remove('collapsed');
    }
});

// Initialize sidebar state
document.addEventListener('DOMContentLoaded', () => {
    if (sidebar && window.innerWidth > 1024) {
        const wasCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (wasCollapsed) {
            sidebar.classList.add('collapsed');
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + B to toggle sidebar
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
    }
    
    // Escape to close mobile sidebar
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon and text
        updateThemeToggle(newTheme);
    });
}

function updateThemeToggle(theme) {
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('svg');
    const text = themeToggle.querySelector('.nav-text');
    
    if (theme === 'dark') {
        icon.innerHTML = `
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="none"/>
        `;
        if (text) text.textContent = 'Chế độ sáng';
    } else {
        icon.innerHTML = `
            <path d="M10 2V4M10 16V18M4 10H2M6.31412 6.31412L4.8999 4.8999M15.6859 6.31412L17.1001 4.8999M6.31412 13.6859L4.8999 15.1001M15.6859 13.6859L17.1001 15.1001M18 10H16M14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        `;
        if (text) text.textContent = 'Chế độ tối';
    }
}

// Initialize theme toggle
updateThemeToggle(currentTheme);

// Navigation Active State
const navLinks = document.querySelectorAll('.nav-link');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const linkPage = href.split('/').pop();
    
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.closest('.nav-item').classList.add('active');
    }
});

// Smooth navigation with loading animation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Don't prevent default for anchor links
        if (href.startsWith('#')) return;
        
        e.preventDefault();
        
        // Add loading state
        link.style.opacity = '0.6';
        link.style.pointerEvents = 'none';
        
        // Navigate after short delay for smooth transition
        setTimeout(() => {
            window.location.href = href;
        }, 150);
    });
});

// Tools Data
const toolsData = [
    {
        name: 'Nexus Text Filter',
        description: 'Lọc và tìm kiếm văn bản với các tùy chọn nâng cao như regex, whole word',
        count: 15,
        gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        icon: `<path d="M3 4H17M3 8H11M3 12H17M3 16H11" stroke="white" stroke-width="2" stroke-linecap="round"/>`,
        link: 'tools/text-filter.html'
    },
    {
        name: 'Nexus Text Tools',
        description: 'Chỉnh sửa, chuyển đổi và xử lý văn bản một cách nhanh chóng và hiệu quả',
        count: 45,
        gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        icon: `<path d="M8 6H16M8 12H16M8 18H14M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z" stroke="white" stroke-width="2" stroke-linecap="round"/>`,
        link: 'tools/text-tools.html'
    },
    {
        name: 'Nexus Image Tools',
        description: 'Chỉnh sửa, nén và tối ưu hóa hình ảnh trực tuyến miễn phí',
        count: 32,
        gradient: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)',
        icon: `<rect x="3" y="5" width="14" height="12" rx="2" stroke="white" stroke-width="2"/><circle cx="7.5" cy="9.5" r="1.5" fill="white"/><path d="M14 13L10 9L5 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        link: 'tools/image-tools.html'
    },
    {
        name: 'Nexus Crypto Suite',
        description: 'Mã hóa và giải mã dữ liệu với các thuật toán bảo mật cao',
        count: 28,
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        icon: `<rect x="4" y="4" width="12" height="12" rx="2" stroke="white" stroke-width="2"/><path d="M8 8H16M8 12H16M8 16H12" stroke="white" stroke-width="2" stroke-linecap="round"/>`,
        link: 'tools/crypto-tools.html'
    },
    {
        name: 'Nexus Converter',
        description: 'Chuyển đổi giữa các định dạng file khác nhau dễ dàng',
        count: 38,
        gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
        icon: `<path d="M10 15L15 10M15 10H11M15 10V14M12 5L7 10M7 10H11M7 10V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        link: 'tools/converter-tools.html'
    },
    {
        name: 'Nexus Color Lab',
        description: 'Phối màu, tạo palette và chuyển đổi mã màu chuyên nghiệp',
        count: 25,
        gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
        icon: `<circle cx="10" cy="10" r="4" stroke="white" stroke-width="2"/><path d="M18 10C18 12.2091 16.2091 14 14 14" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M14 6C16.2091 6 18 7.79086 18 10" stroke="white" stroke-width="2" stroke-linecap="round"/>`,
        link: 'tools/color-tools.html'
    },
    {
        name: 'Nexus URL Kit',
        description: 'Rút gọn link, kiểm tra và xử lý URL một cách thông minh',
        count: 20,
        gradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
        icon: `<path d="M4 6H14M14 6L11 3M14 6L11 9M16 14H6M6 14L9 11M6 14L9 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        link: 'tools/url-tools.html'
    }
];

// Render Tools with enhanced animations
const toolsGrid = document.getElementById('toolsGrid');

function renderTools(tools = toolsData) {
    if (!toolsGrid) return;
    
    toolsGrid.innerHTML = tools.map((tool, index) => `
        <div class="tool-card" onclick="handleToolClick('${tool.link}')" style="animation-delay: ${index * 0.1}s">
            <div class="tool-icon" style="background: ${tool.gradient};">
                <svg width="28" height="28" viewBox="0 0 20 20" fill="none">
                    ${tool.icon}
                </svg>
            </div>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <div class="tool-count">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <span>${tool.count} công cụ</span>
            </div>
        </div>
    `).join('');
}

// Handle Tool Click with smooth transition
function handleToolClick(link) {
    // Add loading animation
    const clickedCard = event.currentTarget;
    clickedCard.style.transform = 'scale(0.95)';
    clickedCard.style.opacity = '0.8';
    
    setTimeout(() => {
        window.location.href = link;
    }, 200);
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 20;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.6';
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: `hsl(${Math.random() * 60 + 220}, 70%, 60%)`
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.001;
                particle.vy += dy * force * 0.001;
            }
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
            
            // Draw connections
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = particle.color;
                    this.ctx.globalAlpha = (120 - distance) / 120 * 0.2;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Parallax Scroll Effect
function initParallaxEffect() {
    const orbs = document.querySelectorAll('.gradient-orb');
    const heroPattern = document.querySelector('.hero-pattern');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const rate2 = scrolled * -0.3;
        const rate3 = scrolled * -0.7;
        
        if (orbs[0]) orbs[0].style.transform = `translate3d(0, ${rate}px, 0)`;
        if (orbs[1]) orbs[1].style.transform = `translate3d(0, ${rate2}px, 0)`;
        if (orbs[2]) orbs[2].style.transform = `translate3d(0, ${rate3}px, 0)`;
        
        if (heroPattern) {
            heroPattern.style.transform = `translate3d(0, ${rate * 0.5}px, 0)`;
        }
    });
}

// Enhanced Micro-interactions
function initMicroInteractions() {
    // Ripple effect for buttons
    document.querySelectorAll('.btn, .tool-card, .quick-access-item').forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Magnetic effect for cards
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            this.style.transform = `translateY(-12px) rotateX(${-moveY * 0.1}deg) rotateY(${moveX * 0.1}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Add CSS for ripple animation
const rippleCSS = `
@keyframes ripple {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(2);
        opacity: 0;
    }
}

@keyframes tilt-shake {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(1deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(-1deg); }
    100% { transform: rotate(0deg); }
}

.tool-card:hover {
    animation: tilt-shake 0.5s ease-in-out;
}
`;

// Add the CSS to the document
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);
let searchTimeout;
const quickSearch = document.getElementById('quickSearch');
const searchResults = document.getElementById('searchResults');

if (quickSearch) {
    quickSearch.addEventListener('input', handleSearch);
    quickSearch.addEventListener('focus', () => {
        if (quickSearch.value.trim()) {
            searchResults.style.display = 'block';
        }
    });
    
    // Hide search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.hero-search')) {
            searchResults.style.display = 'none';
        }
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (quickSearch) {
            quickSearch.focus();
        }
    }
    
    // Escape to close search
    if (e.key === 'Escape' && searchResults.style.display === 'block') {
        searchResults.style.display = 'none';
        quickSearch.blur();
    }
});

function handleSearch(e) {
    const query = e.target.value.trim().toLowerCase();
    
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        if (query.length === 0) {
            searchResults.style.display = 'none';
            return;
        }
        
        const results = toolsData.filter(tool => 
            tool.name.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query)
        );
        
        displaySearchResults(results, query);
    }, 300);
}

function displaySearchResults(results, query) {
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-result-item">
                <div class="search-result-content">
                    <h4>Không tìm thấy kết quả</h4>
                    <p>Thử tìm kiếm với từ khóa khác</p>
                </div>
            </div>
        `;
    } else {
        searchResults.innerHTML = results.slice(0, 5).map(tool => `
            <div class="search-result-item" onclick="window.location.href='${tool.link}'">
                <div class="search-result-icon" style="background: ${tool.gradient};">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        ${tool.icon}
                    </svg>
                </div>
                <div class="search-result-content">
                    <h4>${highlightMatch(tool.name, query)}</h4>
                    <p>${highlightMatch(tool.description.substring(0, 60) + '...', query)}</p>
                </div>
            </div>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: rgba(99, 102, 241, 0.2); color: var(--accent-indigo);">$1</mark>');
}

// Quick Access functionality
function renderQuickAccess() {
    const quickAccessGrid = document.getElementById('quickAccessGrid');
    if (!quickAccessGrid) return;
    
    const popularTools = [
        {
            name: 'Text Filter',
            description: 'Lọc văn bản nhanh chóng',
            icon: '🔍',
            link: 'tools/text-filter.html',
            usage: 1250
        },
        {
            name: 'Hash Generator',
            description: 'Tạo hash MD5, SHA256',
            icon: '🔐',
            link: 'tools/api-demo.html#crypto',
            usage: 980
        },
        {
            name: 'Base64 Encode',
            description: 'Mã hóa Base64',
            icon: '📝',
            link: 'tools/api-demo.html#crypto',
            usage: 756
        },
        {
            name: 'JSON Formatter',
            description: 'Format và validate JSON',
            icon: '📄',
            link: 'tools/api-demo.html#json',
            usage: 642
        },
        {
            name: 'Password Gen',
            description: 'Tạo mật khẩu mạnh',
            icon: '🔑',
            link: 'tools/api-demo.html#generator',
            usage: 534
        },
        {
            name: 'QR Code',
            description: 'Tạo mã QR nhanh',
            icon: '📱',
            link: 'tools/api-demo.html#generator',
            usage: 423
        }
    ];
    
    quickAccessGrid.innerHTML = popularTools.map(tool => `
        <div class="quick-access-item" onclick="window.location.href='${tool.link}'">
            <div class="quick-access-icon">
                <span style="font-size: 1.5rem;">${tool.icon}</span>
            </div>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <div style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--text-tertiary);">
                ${tool.usage.toLocaleString()} lượt sử dụng
            </div>
        </div>
    `).join('');
}

// API Status monitoring
async function checkAPIStatus() {
    const apiStatusCard = document.getElementById('apiStatusCard');
    const apiStatus = document.getElementById('apiStatus');
    const responseTimeEl = document.getElementById('responseTime');
    const refreshBtn = document.getElementById('refreshStatusBtn');
    
    if (!apiStatus) return;
    
    // Show loading state
    if (refreshBtn) {
        refreshBtn.style.pointerEvents = 'none';
        refreshBtn.style.opacity = '0.6';
        refreshBtn.querySelector('svg').style.animation = 'spin 1s linear infinite';
    }
    
    apiStatus.innerHTML = `
        <span class="status-dot"></span>
        <span class="status-text">Đang kiểm tra...</span>
    `;
    
    try {
        const startTime = Date.now();
        const response = await fetch('http://localhost:8000/', {
            method: 'GET',
            timeout: 5000
        });
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        if (response.ok) {
            apiStatus.innerHTML = `
                <span class="status-dot status-online"></span>
                <span class="status-text">Hoạt động bình thường</span>
            `;
            responseTimeEl.textContent = `${responseTime}ms`;
        } else {
            throw new Error('API Error');
        }
    } catch (error) {
        apiStatus.innerHTML = `
            <span class="status-dot status-error"></span>
            <span class="status-text">Không khả dụng</span>
        `;
        responseTimeEl.textContent = '--ms';
    } finally {
        // Reset button state
        if (refreshBtn) {
            refreshBtn.style.pointerEvents = 'auto';
            refreshBtn.style.opacity = '1';
            refreshBtn.querySelector('svg').style.animation = 'none';
        }
    }
}

// Activity feed
function renderActivityFeed() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    const activities = [
        {
            type: 'success',
            icon: '✅',
            title: 'API Server khởi động thành công',
            description: 'Tất cả endpoints đang hoạt động bình thường',
            time: '2 phút trước'
        },
        {
            type: 'info',
            icon: '📊',
            title: 'Cập nhật thống kê sử dụng',
            description: 'Text Filter được sử dụng 1,250 lần trong 24h qua',
            time: '15 phút trước'
        },
        {
            type: 'success',
            icon: '🚀',
            title: 'Triển khai tính năng mới',
            description: 'Quick Search và API Status Dashboard',
            time: '1 giờ trước'
        },
        {
            type: 'warning',
            icon: '⚠️',
            title: 'Bảo trì định kỳ',
            description: 'Hệ thống sẽ bảo trì vào 2:00 AM ngày mai',
            time: '3 giờ trước'
        }
    ];
    
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <span>${activity.icon}</span>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
            </div>
            <div class="activity-time">${activity.time}</div>
        </div>
    `).join('');
}

// Enhanced stats with real-time updates
function updateStats() {
    const totalToolsEl = document.getElementById('totalTools');
    const totalUsersEl = document.getElementById('totalUsers');
    
    if (totalToolsEl) {
        // Animate numbers
        animateNumber(totalToolsEl, 500, 2000);
    }
    
    if (totalUsersEl) {
        animateNumber(totalUsersEl, 50000, 2000);
    }
}

function animateNumber(element, target, duration) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target >= 1000) {
            element.textContent = Math.floor(current / 1000) + 'K+';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Performance monitoring
function trackPerformance() {
    // Track page load time
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
        
        // Send to analytics (if implemented)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                value: loadTime,
                custom_parameter: 'performance'
            });
        }
    });
    
    // Track tool usage
    document.addEventListener('click', (e) => {
        const toolCard = e.target.closest('.tool-card, .quick-access-item');
        if (toolCard) {
            const toolName = toolCard.querySelector('h3')?.textContent;
            if (toolName) {
                console.log(`Tool clicked: ${toolName}`);
                
                // Save to localStorage for recent tools
                const recentTools = JSON.parse(localStorage.getItem('recentTools') || '[]');
                const toolData = {
                    name: toolName,
                    timestamp: Date.now(),
                    link: toolCard.getAttribute('onclick')?.match(/'([^']+)'/)?.[1]
                };
                
                // Remove if already exists and add to front
                const filtered = recentTools.filter(tool => tool.name !== toolName);
                filtered.unshift(toolData);
                
                // Keep only last 10
                localStorage.setItem('recentTools', JSON.stringify(filtered.slice(0, 10)));
            }
        }
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    renderTools();
    renderQuickAccess();
    renderActivityFeed();
    updateStats();
    trackPerformance();
    
    // Check API status once on load
    checkAPIStatus();
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.tool-card, .feature-card, .stat-item, .quick-access-item, .status-card');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(element);
    });
    
    // Add page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

