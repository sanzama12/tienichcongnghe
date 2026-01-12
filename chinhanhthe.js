// Authentication Check
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

// Optimized Variables
let currentImage = null;
let currentSize = { width: 30, height: 40 };
let zoom = 100;
let positionX = 0;
let positionY = 0;
let adjustments = { brightness: 0, contrast: 0, saturation: 0, temperature: 0 };
const backgroundColor = '#ffffff';
let isUpdating = false;
let updateTimeout = null;

// Constants
const DPI = 300;
const MM_TO_INCH = 0.0393701;

// DOM Elements (cached)
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const controlsSection = document.getElementById('controlsSection');
const previewCanvas = document.getElementById('previewCanvas');
const previewSize = document.getElementById('previewSize');
const previewResolution = document.getElementById('previewResolution');
const zoomSlider = document.getElementById('zoomSlider');
const zoomValue = document.getElementById('zoomValue');
const positionXSlider = document.getElementById('positionX');
const positionYSlider = document.getElementById('positionY');
const positionXValue = document.getElementById('positionXValue');
const positionYValue = document.getElementById('positionYValue');
const brightnessSlider = document.getElementById('brightnessSlider');
const contrastSlider = document.getElementById('contrastSlider');
const saturationSlider = document.getElementById('saturationSlider');
const temperatureSlider = document.getElementById('temperatureSlider');
const brightnessValue = document.getElementById('brightnessValue');
const contrastValue = document.getElementById('contrastValue');
const saturationValue = document.getElementById('saturationValue');
const temperatureValue = document.getElementById('temperatureValue');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');
const printBtn = document.getElementById('printBtn');
    const exportFormat = document.getElementById('exportFormat');
    const exportLayout = document.getElementById('exportLayout');
const compareBtn = document.getElementById('compareBtn');
let isComparing = false;

// Preset Definitions
const PRESETS = {
    normal: { brightness: 0, contrast: 0, saturation: 0, temperature: 0 },
    bright: { brightness: 10, contrast: 5, saturation: -5, temperature: -5 },
    professional: { brightness: 5, contrast: 15, saturation: 0, temperature: 0 },
    warm: { brightness: 5, contrast: 0, saturation: 10, temperature: 15 },
    cold: { brightness: 5, contrast: 5, saturation: -10, temperature: -15 },
    bw: { brightness: 5, contrast: 20, saturation: -100, temperature: 0 }
};

// Initialize
function init() {
    setupEventListeners();
    updatePreview();
}

// Event Listeners (optimized)
function setupEventListeners() {
    // Upload
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('drop', handleDrop);
    fileInput.addEventListener('change', handleFileSelect);
    
    // Size buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSize.width = parseInt(btn.dataset.width);
            currentSize.height = parseInt(btn.dataset.height);
            updatePreview();
        });
    });
    
    // Controls (debounced)
    zoomSlider.addEventListener('input', debounce((e) => {
        zoom = parseInt(e.target.value);
        zoomValue.textContent = zoom + '%';
        updatePreview();
    }, 100));
    
    positionXSlider.addEventListener('input', debounce((e) => {
        positionX = parseInt(e.target.value);
        positionXValue.textContent = positionX;
        updatePreview();
    }, 100));
    
    positionYSlider.addEventListener('input', debounce((e) => {
        positionY = parseInt(e.target.value);
        positionYValue.textContent = positionY;
        updatePreview();
    }, 100));
    
    brightnessSlider.addEventListener('input', debounce((e) => {
        adjustments.brightness = parseInt(e.target.value);
        brightnessValue.textContent = adjustments.brightness;
        updatePreview();
    }, 100));
    
    contrastSlider.addEventListener('input', debounce((e) => {
        adjustments.contrast = parseInt(e.target.value);
        contrastValue.textContent = adjustments.contrast;
        updatePreview();
    }, 100));

    saturationSlider.addEventListener('input', debounce((e) => {
        adjustments.saturation = parseInt(e.target.value);
        saturationValue.textContent = adjustments.saturation;
        updatePreview();
    }, 100));

    temperatureSlider.addEventListener('input', debounce((e) => {
        adjustments.temperature = parseInt(e.target.value);
        temperatureValue.textContent = adjustments.temperature;
        updatePreview();
    }, 100));
    
    // Background buttons
    document.querySelectorAll('.bg-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.bg-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            backgroundColor = btn.dataset.color;
            updatePreview();
        });
    });
    
    // Presets
    document.querySelectorAll('.preset-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            const presetName = card.dataset.preset;
            const values = PRESETS[presetName];
            
            if (values) {
                applyPreset(values);
            }
        });
    });

    // Compare Button
    if (compareBtn) {
        compareBtn.addEventListener('mousedown', () => { isComparing = true; updatePreview(); });
        compareBtn.addEventListener('mouseup', () => { isComparing = false; updatePreview(); });
        compareBtn.addEventListener('mouseleave', () => { isComparing = false; updatePreview(); });
        // Touch events for mobile
        compareBtn.addEventListener('touchstart', (e) => { e.preventDefault(); isComparing = true; updatePreview(); });
        compareBtn.addEventListener('touchend', (e) => { e.preventDefault(); isComparing = false; updatePreview(); });
    }

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.querySelector(`[data-content="${tab}"]`).classList.add('active');
        });
    });
    
    resetBtn.addEventListener('click', resetAll);
    exportBtn.addEventListener('click', exportImage);
    printBtn.addEventListener('click', printImage);
}

// Apply Preset
function applyPreset(values) {
    adjustments = { ...values };
    
    // Update UI
    brightnessSlider.value = adjustments.brightness;
    brightnessValue.textContent = adjustments.brightness;
    
    contrastSlider.value = adjustments.contrast;
    contrastValue.textContent = adjustments.contrast;
    
    saturationSlider.value = adjustments.saturation;
    saturationValue.textContent = adjustments.saturation;
    
    temperatureSlider.value = adjustments.temperature;
    temperatureValue.textContent = adjustments.temperature;
    
    updatePreview();
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// File handling (optimized)
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        processFile(file);
    }
}

function processFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file ảnh hợp lệ!');
        return;
    }
    
    // File size limit (5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('File quá lớn! Vui lòng chọn file nhỏ hơn 5MB');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            // Auto-resize large images
            if (img.width > 2000 || img.height > 2000) {
                const canvas = document.createElement('canvas');
                const maxDim = 2000;
                const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                const optimizedImg = new Image();
                optimizedImg.onload = () => {
                    currentImage = optimizedImg;
                    controlsSection.style.display = 'block';
                    updatePreview();
                };
                optimizedImg.src = canvas.toDataURL('image/jpeg', 0.8);
            } else {
                currentImage = img;
                controlsSection.style.display = 'block';
                updatePreview();
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Optimized preview update
function updatePreview() {
    if (!currentImage || isUpdating) return;
    
    isUpdating = true;
    requestAnimationFrame(() => {
        try {
            const pixelSize = calculatePixelSize(currentSize.width, currentSize.height);
            
            // Only resize if needed
            if (previewCanvas.width !== pixelSize.width || previewCanvas.height !== pixelSize.height) {
                previewCanvas.width = pixelSize.width;
                previewCanvas.height = pixelSize.height;
            }
            
            const ctx = previewCanvas.getContext('2d', { alpha: false });
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // Fill background
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, pixelSize.width, pixelSize.height);
            
            // Calculate image position
            const scale = (zoom / 100) * Math.min(
                pixelSize.width / currentImage.width,
                pixelSize.height / currentImage.height
            );
            
            const scaledWidth = currentImage.width * scale;
            const scaledHeight = currentImage.height * scale;
            
            const offsetX = (pixelSize.width - scaledWidth) / 2 + (positionX / 100) * pixelSize.width * 0.3;
            const offsetY = (pixelSize.height - scaledHeight) / 2 + (positionY / 100) * pixelSize.height * 0.3;
            
            // Apply adjustments (Skip if comparing)
            if (!isComparing) {
                let filterString = '';
                if (adjustments.brightness !== 0) filterString += `brightness(${1 + adjustments.brightness / 100}) `;
                if (adjustments.contrast !== 0) filterString += `contrast(${1 + adjustments.contrast / 100}) `;
                if (adjustments.saturation !== 0) filterString += `saturate(${1 + adjustments.saturation / 100}) `;
                
                ctx.filter = filterString.trim() || 'none';
            }
            
            // Draw image
            ctx.drawImage(currentImage, offsetX, offsetY, scaledWidth, scaledHeight);
            
            // Apply Temperature (Overlay) - Skip if comparing
            if (!isComparing && adjustments.temperature !== 0) {
                ctx.filter = 'none'; // Reset filter for overlay
                ctx.globalCompositeOperation = 'overlay';
                if (adjustments.temperature > 0) {
                    // Warm (Orange)
                    ctx.fillStyle = `rgba(255, 160, 0, ${adjustments.temperature / 100 * 0.2})`; // Max 20% opacity
                } else {
                    // Cool (Blue)
                    ctx.fillStyle = `rgba(0, 160, 255, ${Math.abs(adjustments.temperature) / 100 * 0.2})`; // Max 20% opacity
                }
                // Draw overlay only on image area
                ctx.fillRect(offsetX, offsetY, scaledWidth, scaledHeight);
                ctx.globalCompositeOperation = 'source-over'; // Reset composite
            }

            // Reset filter
            ctx.filter = 'none';
            
            // Update info
            previewSize.textContent = `${currentSize.width}×${currentSize.height} mm`;
            previewResolution.textContent = `${pixelSize.width}×${pixelSize.height} px`;
            
        } catch (error) {
            console.error('Error updating preview:', error);
        } finally {
            isUpdating = false;
        }
    });
}

// Utility functions
function calculatePixelSize(mmWidth, mmHeight) {
    const inchWidth = mmWidth * MM_TO_INCH;
    const inchHeight = mmHeight * MM_TO_INCH;
    return {
        width: Math.round(inchWidth * DPI),
        height: Math.round(inchHeight * DPI)
    };
}

function resetAll() {
    zoom = 100;
    positionX = 0;
    positionY = 0;
    adjustments = { brightness: 0, contrast: 0, saturation: 0, temperature: 0 };
    
    // Reset UI
    zoomSlider.value = 100;
    zoomValue.textContent = '100%';
    positionXSlider.value = 0;
    positionXValue.textContent = '0';
    positionYSlider.value = 0;
    positionYValue.textContent = '0';
    brightnessSlider.value = 0;
    brightnessValue.textContent = '0';
    contrastSlider.value = 0;
    contrastValue.textContent = '0';
    saturationSlider.value = 0;
    saturationValue.textContent = '0';
    temperatureSlider.value = 0;
    temperatureValue.textContent = '0';
    
    updatePreview();
}

// Export (optimized)
function exportImage() {
    if (!currentImage) {
        alert('Vui lòng tải ảnh lên trước!');
        return;
    }
    
    exportBtn.textContent = '⏳ Đang xử lý...';
    exportBtn.disabled = true;
    
    setTimeout(() => {
        try {
            const pixelSize = calculatePixelSize(currentSize.width, currentSize.height);
            const exportCanvas = document.createElement('canvas');
            exportCanvas.width = pixelSize.width;
            exportCanvas.height = pixelSize.height;
            
            const ctx = exportCanvas.getContext('2d', { alpha: false });
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // Render same as preview
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, pixelSize.width, pixelSize.height);
            
            const scale = (zoom / 100) * Math.min(
                pixelSize.width / currentImage.width,
                pixelSize.height / currentImage.height
            );
            
            const scaledWidth = currentImage.width * scale;
            const scaledHeight = currentImage.height * scale;
            
            const offsetX = (pixelSize.width - scaledWidth) / 2 + (positionX / 100) * pixelSize.width * 0.3;
            const offsetY = (pixelSize.height - scaledHeight) / 2 + (positionY / 100) * pixelSize.height * 0.3;
            
            // Apply filters
            let filterString = '';
            if (adjustments.brightness !== 0) filterString += `brightness(${1 + adjustments.brightness / 100}) `;
            if (adjustments.contrast !== 0) filterString += `contrast(${1 + adjustments.contrast / 100}) `;
            if (adjustments.saturation !== 0) filterString += `saturate(${1 + adjustments.saturation / 100}) `;
            
            ctx.filter = filterString.trim() || 'none';
            
            ctx.drawImage(currentImage, offsetX, offsetY, scaledWidth, scaledHeight);
            
            // Apply Temperature (Overlay)
            if (adjustments.temperature !== 0) {
                ctx.filter = 'none';
                ctx.globalCompositeOperation = 'overlay';
                if (adjustments.temperature > 0) {
                    ctx.fillStyle = `rgba(255, 160, 0, ${adjustments.temperature / 100 * 0.2})`;
                } else {
                    ctx.fillStyle = `rgba(0, 160, 255, ${Math.abs(adjustments.temperature) / 100 * 0.2})`;
                }
                ctx.fillRect(offsetX, offsetY, scaledWidth, scaledHeight);
                ctx.globalCompositeOperation = 'source-over';
            }
            
            ctx.filter = 'none';
            
            exportCanvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `anh-the-${currentSize.width}x${currentSize.height}mm.png`;
                a.click();
                URL.revokeObjectURL(url);
                
                exportBtn.textContent = '💾 Tải Ảnh Về';
                exportBtn.disabled = false;
            }, 'image/png');
        } catch (error) {
            alert('Lỗi khi xuất ảnh!');
            exportBtn.textContent = '💾 Tải Ảnh Về';
            exportBtn.disabled = false;
        }
    }, 100);
}

function printImage() {
    if (!currentImage) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head><title>In Ảnh Thẻ</title></head>
            <body style="margin:0;padding:20px;text-align:center;">
                <img src="${previewCanvas.toDataURL()}" style="max-width:100%;height:auto;">
                <script>window.onload=function(){window.print();}</script>
            </body>
        </html>
    `);
}

// Initialize
init();