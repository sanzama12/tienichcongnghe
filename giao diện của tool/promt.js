// Data for Products and Prompts
const products = [
    {
        id: 1,
        title: "Ảnh Nữ",
        image: "https://ibb.co/q3g02nxm", // Cần thay bằng link trực tiếp (đuôi .jpg/.png) để hiển thị
        prompt: "Hyper-realistic portrait of a beautiful young Asian woman with long, flowing chestnut-brown hair, softly curled and glowing under natural sunlight. She has flawless radiant skin, delicate features, and deep expressive eyes. Outfit: elegant cream knit cardigan with pearl buttons, paired with a pearl necklace and golden earrings. Expression: confident, graceful, slightly serious yet captivating. Background: lush green garden with soft bokeh sunlight filtering through the leaves, creating a dreamy and luxurious atmosphere. Style: high-fashion editorial photography, ultra-detailed textures, cinematic lighting, 8K HDR quality"
    },
    {
        id: 2,
        title: "Nước Hoa Sang Trọng",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
        prompt: "Elegant perfume bottle on a reflective black surface, gold accents, soft mood lighting, bokeh background of city lights at night, luxury advertisement style, sharp focus, photorealistic."
    },
    {
        id: 3,
        title: "Đồng Hồ Cổ Điển",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80",
        prompt: "Vintage mechanical watch on a wooden texture table, morning sunlight rays through a window, dust particles, macro shot, shallow depth of field, warm tones, nostalgic atmosphere."
    },
    {
        id: 4,
        title: "Tai Nghe Gaming",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        prompt: "High-tech gaming headphones, hovering, exploded view showing internal components, dark matte background with blue circuit patterns, futuristic product design, unreal engine 5 render style."
    },
    {
        id: 5,
        title: "Kem Dưỡng Da Thiên Nhiên",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
        prompt: "Skincare cream jar surrounded by fresh green leaves and water droplets, bright natural daylight, clean white background, minimalist style, eco-friendly vibe, high key photography."
    },
    {
        id: 6,
        title: "Kính Mát Thời Trang",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        prompt: "Stylish sunglasses on a sandy beach, sunset golden hour lighting, reflection of palm trees in the lens, summer vibes, tropical atmosphere, professional product shot."
    },
    {
        id: 7,
        title: "Cà Phê Sáng",
        image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80",
        prompt: "Steaming hot cup of coffee, latte art, rustic wooden table, roasted coffee beans scattered, cozy morning atmosphere, soft window light, food photography, delicious texture."
    },
    {
        id: 8,
        title: "Laptop Văn Phòng",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
        prompt: "Sleek modern laptop on a clean white desk, succulent plant, notebook and pen, minimal workspace setup, bright airy lighting, productivity theme, apple style advertisement."
    },
    {
        id: 9,
        title: "Túi Xách Da Cao Cấp",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
        prompt: "Luxury leather handbag sitting on a marble pedestal, studio lighting, neutral beige background, fashion magazine style, sharp details on leather texture, elegant and sophisticated."
    },
    {
        id: 10,
        title: "Máy Ảnh Film Retro",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
        prompt: "Classic retro film camera on a weathered wooden surface, scattered film rolls, warm vintage filter, cinematic lighting, nostalgic mood, photorealistic 8k."
    },
    {
        id: 11,
        title: "Ghế Sofa Hiện Đại",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
        prompt: "Modern velvet sofa in a spacious living room, floor-to-ceiling windows, soft afternoon light, scandinavian interior design, cozy throw pillows, architectural visualization style."
    },
    {
        id: 12,
        title: "Son Môi Đỏ Quyến Rũ",
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
        prompt: "Red lipstick tube open, smudged texture swatch next to it, dark moody background, spotlight on the product, beauty commercial photography, glossy finish, high contrast."
    },
    {
        id: 13,
        title: "Giày Sneaker Limited",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80",
        prompt: "Limited edition sneaker suspended in air, deconstructed parts floating, vibrant street art background, urban style, dramatic lighting, detailed fabric texture, 4k render."
    },
    {
        id: 14,
        title: "Chai Rượu Vang",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
        prompt: "Premium wine bottle on a wooden barrel, vineyard background in sunset, grapes clusters nearby, warm golden hour light, romantic atmosphere, product photography."
    },
    {
        id: 15,
        title: "Đèn Bàn Minimalist",
        image: "https://images.unsplash.com/photo-1507473888900-52e1adad5420?auto=format&fit=crop&w=600&q=80",
        prompt: "Minimalist desk lamp turned on, casting a warm glow on a book, dark room, cozy reading nook, focus on the lamp design, soft shadows, interior design photography."
    },
    {
        id: 16,
        title: "Bàn Phím Cơ Custom",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b91add1?auto=format&fit=crop&w=600&q=80",
        prompt: "Custom mechanical keyboard with RGB lighting, desk mat with abstract design, coiled cable, tech setup background, top-down view, sharp focus on keycaps, vibrant colors."
    },
    {
        id: 17,
        title: "Nến Thơm Decor",
        image: "https://images.unsplash.com/photo-1602825264307-7c331150c204?auto=format&fit=crop&w=600&q=80",
        prompt: "Scented candle burning, surrounded by dried flowers and crystals, soft bokeh background, warm and cozy atmosphere, spa and relaxation theme, macro photography."
    },
    {
        id: 18,
        title: "Mũ Lưỡi Trai Streetwear",
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
        prompt: "Streetwear baseball cap floating, urban graffiti wall background, harsh sunlight and shadows, youth culture vibe, detailed stitching, fashion photography."
    },
    {
        id: 19,
        title: "Đồ Chơi Robot",
        image: "https://images.unsplash.com/photo-1535378437327-b714923283e2?auto=format&fit=crop&w=600&q=80",
        prompt: "Toy robot action figure standing on a rocky terrain, dramatic low angle shot, sci-fi lighting, miniature photography, depth of field, detailed plastic texture."
    },
    {
        id: 20,
        title: "Bánh Ngọt Patisserie",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
        prompt: "Exquisite french pastry on a ceramic plate, silver fork, marble table, soft window light, food magazine style, appetizing texture, macro shot of the glaze."
    },
    {
        id: 21,
        title: "Xe Đạp Địa Hình",
        image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=600&q=80",
        prompt: "Mountain bike on a forest trail, mud splashes, action shot, motion blur on wheels, dappled sunlight through trees, adventure sports photography, dynamic angle."
    },
    {
        id: 22,
        title: "Nhẫn Kim Cương",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
        prompt: "Diamond ring in a velvet box, sparkle effect, macro photography, black background, studio lighting, luxury jewelry advertisement, sharp facets."
    },
    {
        id: 23,
        title: "Loa Bluetooth",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
        prompt: "Portable bluetooth speaker on a picnic blanket, grass background, sunny day, lifestyle product photography, vibrant colors, shallow depth of field."
    },
    {
        id: 24,
        title: "Kính Thực Tế Ảo VR",
        image: "https://images.unsplash.com/photo-1622979135228-5b1ed302593d?auto=format&fit=crop&w=600&q=80",
        prompt: "VR headset on a mannequin head, futuristic blue laser grid background, cyberpunk style, neon lighting, tech product showcase, 3d render style."
    },
    {
        id: 25,
        title: "Balo Du Lịch",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
        prompt: "Travel backpack resting on a rock, mountain landscape background, golden hour, adventure gear, durable texture detail, lifestyle photography."
    },
    {
        id: 26,
        title: "Dầu Gội Thảo Dược",
        image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=600&q=80",
        prompt: "Herbal shampoo bottle, flowing water splash around it, botanical ingredients in background, fresh and clean vibe, high speed photography, bright lighting."
    },
    {
        id: 27,
        title: "Đàn Guitar Acoustic",
        image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80",
        prompt: "Acoustic guitar leaning against a brick wall, music sheet on floor, moody lighting, vintage filter, texture of wood and strings, emotional atmosphere."
    },
    {
        id: 28,
        title: "Mô Hình Siêu Xe",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ed5f6?auto=format&fit=crop&w=600&q=80",
        prompt: "Diecast supercar model on a miniature race track, motion blur background, studio lighting mimicking sunlight, macro photography, realistic look."
    },
    {
        id: 29,
        title: "Bàn Chải Điện",
        image: "https://images.unsplash.com/photo-1559599238-308793637427?auto=format&fit=crop&w=600&q=80",
        prompt: "Electric toothbrush on a clean bathroom counter, mirror reflection, water droplets, blue and white color scheme, hygiene product photography, sterile look."
    },
    {
        id: 30,
        title: "Gối Tựa Sofa",
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&w=600&q=80",
        prompt: "Patterned throw pillows on a beige couch, cozy living room setting, warm light, texture of the fabric, interior decor photography, home comfort."
    },
    {
        id: 31,
        title: "Sổ Tay Planner",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
        prompt: "Open planner notebook with a gold pen, cup of tea, flat lay on white desk, organized workspace, pastel colors, stationery product photography."
    },
    {
        id: 32,
        title: "Viên Uống Vitamin",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
        prompt: "Vitamin bottle with pills spilled out, bright yellow background, pop art style, hard shadows, vibrant and energetic, health product advertisement."
    },
    {
        id: 33,
        title: "Máy Xay Sinh Tố",
        image: "https://images.unsplash.com/photo-1570222094114-28a9d8894548?auto=format&fit=crop&w=600&q=80",
        prompt: "Blender filled with colorful fruits, kitchen counter background, morning light, healthy lifestyle theme, action shot of blending (optional), fresh ingredients nearby."
    },
    {
        id: 34,
        title: "Ván Trượt Skateboard",
        image: "https://images.unsplash.com/photo-1520045818171-56344b3f992f?auto=format&fit=crop&w=600&q=80",
        prompt: "Skateboard deck with artistic graphic, leaning on a concrete wall at a skatepark, sunset light, urban grunge style, detailed texture of grip tape."
    },
    {
        id: 35,
        title: "Bộ Dao Nhà Bếp",
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80",
        prompt: "Chef knife set on a magnetic strip, stainless steel shine, vegetables on cutting board below, professional kitchen atmosphere, sharp focus on blades."
    },
    {
        id: 36,
        title: "Chậu Cây Để Bàn",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
        prompt: "Small succulent pot plant on a wooden desk, sunlight streaming in, bokeh office background, green and fresh, minimalist workspace decor."
    },
    {
        id: 37,
        title: "Tai Nghe True Wireless",
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=600&q=80",
        prompt: "True wireless earbuds charging case open, earbuds floating out, tech blue background, studio lighting, product showcase, sleek and modern design."
    },
    {
        id: 38,
        title: "Ly Bia Thủ Công",
        image: "https://images.unsplash.com/photo-1535958636474-b021ee8876a3?auto=format&fit=crop&w=600&q=80",
        prompt: "Cold craft beer glass with condensation droplets, golden liquid, foam head, dark pub background, warm ambient light, refreshing beverage photography."
    },
    {
        id: 39,
        title: "Thảm Yoga",
        image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a9?auto=format&fit=crop&w=600&q=80",
        prompt: "Rolled up yoga mat, water bottle, and towel, gym studio floor, morning light, health and fitness theme, calm and serene atmosphere."
    },
    {
        id: 40,
        title: "Đồng Hồ Thông Minh",
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
        prompt: "Smartwatch on wrist, running interface on screen, outdoor jogging background blurred, dynamic angle, lifestyle technology photography, fitness tracker."
    }
];

// DOM Elements
const promptGrid = document.getElementById('promptGrid');
const modal = document.getElementById('promptModal');
const modalImg = document.getElementById('modalImg');
const modalPrompt = document.getElementById('modalPrompt');
const copyBtn = document.getElementById('copyBtn');
const closeModal = document.querySelector('.close-modal');
const toast = document.getElementById('toast');
const searchInput = document.getElementById('searchInput');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
});

// Render Products
function renderProducts(items) {
    promptGrid.innerHTML = '';
    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'prompt-card';
        card.onclick = () => openModal(product);
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="card-image" loading="lazy">
            <div class="card-content">
                <div class="card-title">${product.title}</div>
                <div class="card-preview">${product.prompt}</div>
            </div>
        `;
        promptGrid.appendChild(card);
    });
}

// Modal Functions
function openModal(product) {
    modal.style.display = 'block';
    // Trigger reflow
    modal.offsetHeight; 
    modal.classList.add('show');
    
    modalImg.src = product.image;
    modalPrompt.textContent = product.prompt;
    
    // Reset copy button text
    copyBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Sao chép
    `;
}

function closeModalHandler() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Event Listeners
function setupEventListeners() {
    // Close modal on click X
    closeModal.onclick = closeModalHandler;

    // Close modal on click outside
    window.onclick = (event) => {
        if (event.target == modal) {
            closeModalHandler();
        }
    };

    // Copy to clipboard
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(modalPrompt.textContent).then(() => {
            showToast();
            copyBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
                Đã chép!
            `;
        });
    };

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p => 
            p.title.toLowerCase().includes(term) || 
            p.prompt.toLowerCase().includes(term)
        );
        renderProducts(filtered);
    });
}

// Toast Notification
function showToast() {
    toast.className = "toast show";
    setTimeout(function(){ 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}

// Handle Sidebar Toggle (copied from main script for standalone functionality if needed)
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
if(sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
}
