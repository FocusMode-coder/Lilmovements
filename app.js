// DOM elements
const videos = document.querySelectorAll('video');
const siteAudio = document.getElementById('siteAudio');
const playMusicBtn = document.querySelector('.floating-music-btn');

// Navigation elements
const navLinks = document.querySelectorAll('.nav a');
const watchSeriesBtn = document.querySelector('.watch-series');

// Carousel elements
const testimonialsTrack = document.querySelector('.testimonials-track');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const progressBar = document.querySelector('.progress-fill');

// Global state
let userHasInteracted = false;
let audioEnabled = false;
let activeVideoAudio = null;
let currentSlide = 0;

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeUserInteraction();
    initializeGlobalAudio();
    initializeVideoSystem();
    initializeNavigation();
    initializeCarousel();
    initializeHeroAnimation();
});

// Track user interaction for audio compliance
function initializeUserInteraction() {
    const trackInteraction = () => {
        if (!userHasInteracted) {
            userHasInteracted = true;
            console.log('User interaction detected');
        }
    };

    document.addEventListener('click', trackInteraction, { once: true });
    document.addEventListener('touchstart', trackInteraction, { once: true });
    document.addEventListener('keydown', trackInteraction, { once: true });
}

// Global audio system
function initializeGlobalAudio() {
    console.log('Initializing audio system...');
    console.log('siteAudio element:', siteAudio);
    console.log('playMusicBtn element:', playMusicBtn);
    
    if (!siteAudio || !playMusicBtn) {
        console.error('Missing audio elements!');
        return;
    }

    // Test if audio file loads
    siteAudio.addEventListener('loadeddata', () => {
        console.log('Audio file loaded successfully');
    });
    
    siteAudio.addEventListener('error', (e) => {
        console.error('Audio file failed to load:', e);
    });

    siteAudio.volume = 0.3;
    siteAudio.muted = true;
    
    console.log('Audio src:', siteAudio.src);
    console.log('Audio initial state - muted:', siteAudio.muted, 'volume:', siteAudio.volume);

    // Get popup element
    const musicPopup = document.getElementById('musicPopup');

    // Show popup on page load
    if (musicPopup) {
        setTimeout(() => {
            musicPopup.classList.add('show');
            setTimeout(() => {
                musicPopup.classList.remove('show');
            }, 3000); // Hide after 3 seconds
        }, 1000); // Show after 1 second of page load
    }

    // Show popup on hover
    playMusicBtn.addEventListener('mouseenter', () => {
        if (musicPopup) {
            musicPopup.classList.add('show');
        }
    });

    // Hide popup on mouse leave
    playMusicBtn.addEventListener('mouseleave', () => {
        if (musicPopup) {
            musicPopup.classList.remove('show');
        }
    });

    playMusicBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Music button clicked! userHasInteracted:', userHasInteracted);
        
        if (!userHasInteracted) {
            console.log('Audio requires user interaction first');
            return;
        }
        
        toggleBackgroundMusic();
    });
}

function toggleBackgroundMusic() {
    console.log('=== TOGGLE MUSIC DEBUG ===');
    console.log('audioEnabled:', audioEnabled);
    console.log('siteAudio.paused:', siteAudio.paused);
    console.log('siteAudio.muted:', siteAudio.muted);
    console.log('siteAudio.readyState:', siteAudio.readyState);
    console.log('siteAudio.src:', siteAudio.src);
    
    if (!audioEnabled || siteAudio.paused) {
        console.log('→ Attempting to START music...');
        
        // Reset and play
        siteAudio.muted = false;
        siteAudio.currentTime = 0;
        
        console.log('Before play - muted:', siteAudio.muted, 'currentTime:', siteAudio.currentTime);
        
        siteAudio.play().then(() => {
            audioEnabled = true;
            playMusicBtn.classList.add('active');
            playMusicBtn.setAttribute('aria-pressed', 'true');
            console.log('✅ Music STARTED successfully');
            console.log('Playing state - paused:', siteAudio.paused, 'volume:', siteAudio.volume);
        }).catch((error) => {
            console.error('❌ Music play FAILED:', error);
            console.error('Error details:', error.name, error.message);
        });
    } else {
        console.log('→ Attempting to STOP music...');
        siteAudio.pause();
        siteAudio.muted = true;
        audioEnabled = false;
        playMusicBtn.classList.remove('active');
        playMusicBtn.setAttribute('aria-pressed', 'false');
        console.log('✅ Music STOPPED');
    }
    
    console.log('=== END DEBUG ===');
}

// Enhanced video initialization to fix playback issues
function initializeVideoSystem() {
    videos.forEach(video => {
        if (video.dataset.videoInitialized === 'true') return;
        video.dataset.videoInitialized = 'true';
        
        // Force video attributes for better compatibility
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('muted', '');
        video.preload = 'metadata';
        
        // Force load the video
        video.load();
        
        // Find the container for this video
        const container = video.closest('.category-video, .daily-video, .backstage-visual, .testimonial-item, .hero-video-container');
        
        if (!container) return;
        
        // Find or create overlay and play button
        let overlay = container.querySelector('.video-overlay');
        let playButton = container.querySelector('.video-play-btn');
        
        let _overlay = overlay;
        let _playBtn = playButton;

        // Create overlay/button if missing (hardens against markup issues)
        if (!_overlay) {
          _overlay = document.createElement('div');
          _overlay.className = 'video-overlay';
          container.appendChild(_overlay);
        }
        if (!_playBtn) {
          _playBtn = document.createElement('button');
          _playBtn.className = 'video-play-btn';
          _playBtn.setAttribute('aria-label', 'Play with sound');
          _playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
          _overlay.appendChild(_playBtn);
        }

        // Local state for this video
        let isVideoMuted = true;

        // Helpers to show/hide overlay
        function showOverlay(){
          _overlay.style.opacity = '1';
          _overlay.style.pointerEvents = 'auto';
          _playBtn.setAttribute('aria-label','Play with sound');
        }
        function hideOverlay(){
          _overlay.style.opacity = '0';
          _overlay.style.pointerEvents = 'none';
          _playBtn.setAttribute('aria-label','Mute video sound');
        }

        // FIXED: Simple 2-state toggle - Video keeps playing, only audio changes
        function toggleVideoPlayback(){
          if(!userHasInteracted) return;

          // If video is playing and muted - ENABLE SOUND (remove overlay)
          if(isVideoMuted){
            // Mute any other active video with audio
            if(activeVideoAudio && activeVideoAudio !== video){
              activeVideoAudio.muted = true;
              const activeContainer = activeVideoAudio.closest('.category-video, .daily-video, .backstage-visual, .testimonial-item, .hero-video-container');
              const activeOverlay = activeContainer?.querySelector('.video-overlay');
              const activeBtn = activeContainer?.querySelector('.video-play-btn');
              if(activeOverlay){
                activeOverlay.style.opacity = '1';
                activeOverlay.style.pointerEvents = 'auto';
              }
              if(activeBtn){
                activeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                activeBtn.setAttribute('aria-label', 'Play with sound');
              }
            }

            // Duck background music
            if(siteAudio && audioEnabled && !siteAudio.muted) siteAudio.volume = 0.1;

            // ENABLE SOUND - video keeps playing
            video.muted = false;
            isVideoMuted = false;
            activeVideoAudio = video;
            hideOverlay();
            _playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.5 9L15 12l-3.5 3v-2.5H8V11.5h3.5z"/></svg>';
            _playBtn.setAttribute('aria-label', 'Mute video sound');
            
            // Ensure video continues playing
            if(video.paused) video.play().catch(()=>{});
          }else{
            // If video has sound - MUTE IT (but keep playing, show overlay)
            video.muted = true;
            isVideoMuted = true;
            activeVideoAudio = null;
            showOverlay();
            _playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
            _playBtn.setAttribute('aria-label', 'Play with sound');

            // Restore background music volume
            if(siteAudio && audioEnabled && !siteAudio.muted) siteAudio.volume = 0.3;
            
            // IMPORTANT: Keep video playing even when muted
            if(video.paused) video.play().catch(()=>{});
          }
        }

        // Wire up button interactions
        _playBtn.addEventListener('click',(e)=>{ e.preventDefault(); e.stopPropagation(); toggleVideoPlayback(); });
        _playBtn.addEventListener('keydown',(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggleVideoPlayback(); } });

        // Initial state: show overlay (all videos start muted)
        showOverlay();

        // Multiple attempts to start video playback
        const tryPlay = () => {
            if (video.readyState >= 2) {
                video.play().catch((error) => {
                    console.log('Video autoplay blocked, will retry on user interaction:', error);
                });
            }
        };

        // Try to play when video loads
        video.addEventListener('loadeddata', tryPlay);
        video.addEventListener('canplay', tryPlay);
        
        // Immediate play attempt
        setTimeout(tryPlay, 100);

        // Ensure video loops properly
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play().catch(() => {
                console.log('Video replay failed');
            });
        });

        // Auto-pause videos when out of viewport (performance optimization)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                
                if (entry.isIntersecting) {
                    if (video.paused) {
                        video.play().catch(() => {
                            console.log('Video autoplay prevented');
                        });
                    }
                } else {
                    // Only pause if video is muted (don't interrupt audio)
                    if (video.muted && !video.paused) {
                        video.pause();
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '50px 0px 50px 0px'
        });
        
        observer.observe(video);
    });
}

// Navigation system
function initializeNavigation() {
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Watch Series button scrolls to series section
    if (watchSeriesBtn) {
        watchSeriesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const seriesSection = document.querySelector('#series');
            if (seriesSection) {
                const headerHeight = 80;
                const targetPosition = seriesSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Testimonials carousel
function initializeCarousel() {
    if (!testimonialsTrack || !prevBtn || !nextBtn) return;
    
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const totalSlides = testimonialItems.length;
    let isNavigating = false;
    
    function updateCarousel() {
        const cardWidth = testimonialItems[0]?.offsetWidth || 300;
        const gap = 32; // 2rem gap
        const scrollPosition = currentSlide * (cardWidth + gap);
        
        testimonialsTrack.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        updateProgressBar();
    }
    
    function updateProgressBar() {
        if (progressBar) {
            const progress = ((currentSlide + 1) / totalSlides) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }
    
    function navigate(direction) {
        if (isNavigating) return;
        
        isNavigating = true;
        setTimeout(() => { isNavigating = false; }, 300);
        
        if (direction === 'prev') {
            currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
        } else if (direction === 'next') {
            currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        }
        
        updateCarousel();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => navigate('prev'));
    nextBtn.addEventListener('click', () => navigate('next'));
    
    // Initialize carousel
    updateCarousel();
    
    // Update carousel on window resize
    window.addEventListener('resize', () => {
        setTimeout(updateCarousel, 100);
    });
}

// Hero animation
function initializeHeroAnimation() {
    const documentElement = document.documentElement;
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        documentElement.classList.remove('is-intro');
        return;
    }
    
    // Trigger hero animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            documentElement.classList.remove('is-intro');
        });
    });
}

// Newsletter signup (placeholder)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('newsletter')) {
        e.preventDefault();
        alert('Newsletter signup coming soon! For now, follow us on Instagram for daily updates.');
    }
});

// Performance optimizations
document.addEventListener('scroll', () => {
    // Throttle scroll events for better performance
    if (!window.scrollThrottled) {
        window.scrollThrottled = true;
        setTimeout(() => {
            window.scrollThrottled = false;
        }, 16); // ~60fps
    }
});

// Error handling for videos
videos.forEach(video => {
    video.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
        const container = video.closest('.category-video, .daily-video, .backstage-visual, .testimonial-item');
        if (container) {
            const playButton = container.querySelector('.video-play-btn');
            if (playButton) {
                playButton.disabled = true;
                playButton.style.opacity = '0.5';
                playButton.setAttribute('aria-label', 'Video unavailable');
            }
        }
    });
});

// Accessibility enhancements
document.addEventListener('keydown', (e) => {
    // ESC key to stop all video audio and return to background music
    if (e.key === 'Escape' && activeVideoAudio) {
        activeVideoAudio.muted = true;
        activeVideoAudio = null;
        
        // Restore background music volume
        if (siteAudio && audioEnabled && !siteAudio.muted) {
            siteAudio.volume = 0.3;
        }
        
        // Show all video overlays
        document.querySelectorAll('.video-overlay').forEach(overlay => {
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
        });
    }
});

// CLEAN VIDEO AUDIO TOGGLE - Added at end to override any conflicts
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other initializations to complete
    setTimeout(() => {
        const allVideos = document.querySelectorAll('video');
        
        allVideos.forEach(video => {
            const container = video.closest('.category-video, .daily-video, .backstage-visual, .testimonial-item, .hero-video-container');
            if (!container) return;
            
            const playBtn = container.querySelector('.video-play-btn');
            const overlay = container.querySelector('.video-overlay');
            
            if (!playBtn || !overlay) return;
            
            // Remove any existing listeners to avoid conflicts
            const newBtn = playBtn.cloneNode(true);
            playBtn.parentNode.replaceChild(newBtn, playBtn);
            
            // Simple 2-state system
            let hasAudio = false;
            
            function toggleVideoAudio() {
                console.log('Video audio toggle, current hasAudio:', hasAudio);
                
                if (!hasAudio) {
                    // ACTIVATE AUDIO
                    
                    // Mute all other videos first
                    allVideos.forEach(otherVideo => {
                        if (otherVideo !== video) {
                            otherVideo.muted = true;
                            const otherContainer = otherVideo.closest('.category-video, .daily-video, .backstage-visual, .testimonial-item, .hero-video-container');
                            const otherOverlay = otherContainer?.querySelector('.video-overlay');
                            const otherBtn = otherContainer?.querySelector('.video-play-btn');
                            if (otherOverlay) otherOverlay.style.opacity = '1';
                            if (otherBtn) otherBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                        }
                    });
                    
                    // Activate this video's audio
                    video.muted = false;
                    hasAudio = true;
                    overlay.style.opacity = '0';
                    newBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 7h2v10h-2V7zm4 0h2v10h-2V7z"/></svg>';
                    
                    console.log('Audio ENABLED for video');
                    
                } else {
                    // DEACTIVATE AUDIO (but keep video playing)
                    video.muted = true;
                    hasAudio = false;
                    overlay.style.opacity = '1';
                    newBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
                    
                    console.log('Audio DISABLED for video');
                }
                
                // Ensure video keeps playing
                if (video.paused) {
                    video.play().catch(() => {});
                }
            }
            
            // Event listeners for play button
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleVideoAudio();
            });
            
            // NEW: Event listener for clicking anywhere on the video
            video.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleVideoAudio();
            });
            
            // NEW: Event listener for clicking on the overlay (but not the button)
            overlay.addEventListener('click', (e) => {
                // Only if clicking on overlay itself, not the button
                if (e.target === overlay) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleVideoAudio();
                }
            });
        });
    }, 500);
});

console.log('Clean video audio toggle system loaded');
console.log('Lil Movements website initialized successfully');