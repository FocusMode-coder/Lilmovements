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
    if (!siteAudio || !playMusicBtn) return;

    siteAudio.volume = 0.3;
    siteAudio.muted = true;

    playMusicBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!userHasInteracted) {
            console.log('Audio requires user interaction first');
            return;
        }
        
        toggleBackgroundMusic();
    });
}

function toggleBackgroundMusic() {
    if (!audioEnabled || siteAudio.paused) {
        siteAudio.muted = false;
        siteAudio.play().then(() => {
            audioEnabled = true;
            playMusicBtn.classList.add('active');
            playMusicBtn.setAttribute('aria-pressed', 'true');
        }).catch(console.warn);
    } else {
        siteAudio.pause();
        siteAudio.muted = true;
        audioEnabled = false;
        playMusicBtn.classList.remove('active');
        playMusicBtn.setAttribute('aria-pressed', 'false');
    }
}

// Unified video system with perfect muted loop autoplay and sound toggle
function initializeVideoSystem() {
    videos.forEach(video => {
        if (video.dataset.videoInitialized === 'true') return;
        video.dataset.videoInitialized = 'true';
        
        // Ensure proper video attributes for autoplay and looping
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        
        // Find the play button for this video
        const container = video.closest('.category-video, .daily-video, .backstage-visual, .testimonial-item, .hero-video-container');
        const playButton = container?.querySelector('.video-play-btn');
        const overlay = container?.querySelector('.video-overlay');
        
        if (!container) return;
        
        // Video state
        let isVideoMuted = true;
        
        // Start video when it loads
        video.addEventListener('loadeddata', () => {
            video.play().catch(() => {
                console.log('Video autoplay prevented');
            });
        });
        
        // Ensure video loops properly
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play().catch(() => {
                console.log('Video replay failed');
            });
        });
        
        // Play button functionality (if exists)
        if (playButton && overlay) {
            function showOverlay() {
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
                playButton.setAttribute('aria-label', 'Play with sound');
            }
            
            function hideOverlay() {
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
                playButton.setAttribute('aria-label', 'Mute video');
            }
            
            function toggleVideoSound() {
                if (!userHasInteracted) {
                    console.log('Video sound requires user interaction');
                    return;
                }
                
                if (isVideoMuted) {
                    // Mute any currently active video
                    if (activeVideoAudio && activeVideoAudio !== video) {
                        activeVideoAudio.muted = true;
                        const activeContainer = activeVideoAudio.closest('.category-video, .daily-video, .backstage-visual, .testimonial-item');
                        if (activeContainer) {
                            const activeOverlay = activeContainer.querySelector('.video-overlay');
                            if (activeOverlay) {
                                activeOverlay.style.opacity = '1';
                                activeOverlay.style.pointerEvents = 'auto';
                            }
                        }
                    }
                    
                    // Lower background music when video audio is active
                    if (siteAudio && audioEnabled && !siteAudio.muted) {
                        siteAudio.volume = 0.1;
                    }
                    
                    // Unmute this video
                    video.muted = false;
                    isVideoMuted = false;
                    activeVideoAudio = video;
                    hideOverlay();
                    
                    // Ensure video is playing
                    video.play().catch(() => {
                        console.log('Video play failed');
                    });
                    
                } else {
                    // Mute this video
                    video.muted = true;
                    isVideoMuted = true;
                    activeVideoAudio = null;
                    showOverlay();
                    
                    // Restore background music volume
                    if (siteAudio && audioEnabled && !siteAudio.muted) {
                        siteAudio.volume = 0.3;
                    }
                }
            }
            
            // Event listeners for play button
            playButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleVideoSound();
            });
            
            playButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleVideoSound();
                }
            });
            
            // Initialize with overlay showing
            showOverlay();
        }
        
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

console.log('Lil Movements website initialized successfully');