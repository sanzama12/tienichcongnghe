// Music Player Logic
const MUSIC_CONFIG = {
    videoId: '-fgWxgnKac8', // Lofi Chill
    startSeconds: 0,
    suggestedQuality: 'small'
};

let player;
let isMusicPlaying = false;

// Create the widget HTML
function createMusicWidget() {
    const widget = document.createElement('div');
    widget.id = 'music-widget';
    widget.className = 'music-widget';
    widget.innerHTML = `
        <div class="music-disc" id="music-disc">
            <div class="music-disc-inner"></div>
        </div>
        <div class="music-controls">
            <div class="music-info">
                <span class="music-title">Lofi Chill 2025</span>
                <span class="music-status">Click to Play</span>
            </div>
            <div class="music-buttons">
                <button id="music-prev" class="music-btn"><i class="fas fa-backward"></i></button>
                <button id="music-toggle" class="music-btn play-btn"><i class="fas fa-play"></i></button>
                <button id="music-next" class="music-btn"><i class="fas fa-forward"></i></button>
            </div>
        </div>
        <!-- Hidden container for YouTube Player -->
        <div id="youtube-player-container" style="display: none;"></div>
    `;
    document.body.appendChild(widget);

    // Event Listeners
    document.getElementById('music-toggle').addEventListener('click', toggleMusic);
    
    // Auto-load YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// YouTube API Callback
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player-container', {
        height: '0',
        width: '0',
        videoId: MUSIC_CONFIG.videoId,
        playerVars: {
            'autoplay': 1, // Try to autoplay
            'controls': 0,
            'loop': 1,
            'playlist': MUSIC_CONFIG.videoId // Required for loop
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // Attempt to play immediately (might be blocked by browser)
    event.target.playVideo();
    // Update UI based on success
}

function onPlayerStateChange(event) {
    const disc = document.getElementById('music-disc');
    const toggleBtn = document.getElementById('music-toggle');
    const statusText = document.querySelector('.music-status');

    if (event.data === YT.PlayerState.PLAYING) {
        isMusicPlaying = true;
        disc.classList.add('spinning');
        toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
        statusText.innerText = "Playing...";
    } else {
        isMusicPlaying = false;
        disc.classList.remove('spinning');
        toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
        if (event.data === YT.PlayerState.PAUSED) {
            statusText.innerText = "Paused";
        } else {
            statusText.innerText = "Click to Play";
        }
    }
}

function toggleMusic() {
    if (!player) return;
    
    if (isMusicPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createMusicWidget);
} else {
    createMusicWidget();
}
