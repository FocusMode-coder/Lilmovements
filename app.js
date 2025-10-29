// DOM elements
const soundToggleButtons = document.querySelectorAll('.sound-toggle');
const videos = document.querySelectorAll('video');
const v916Videos = document.querySelectorAll('.v916');
const testimonialsTrack = document.querySelector('.testimonials-track');
const logoLink = document.querySelector('.logo-link');

// Navigation elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Carousel elements
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const paginationDots = document.querySelectorAll('.pagination-dot');
let currentSlide = 0;
const slideWidth = 280 + 32; // card width + gap

// Modal elements
const modal = document.getElementById('registration-modal');
const registerBtn = document.querySelector('.register-btn');
const modalClose = document.querySelector('.modal-close');
const cancelBtn = document.getElementById('cancel-btn');
const registrationForm = document.getElementById('registration-form');
const formSuccess = document.getElementById('form-success');

// Chakra cursor
let cursor;
let cursorActive = false;
const chakraColors = [
    '#ff0000', // Red
    '#ff8c00', // Orange  
    '#ffff00', // Yellow
    '#00ff00', // Green
    '#00ffff', // Cyan
    '#4b0082', // Indigo
    '#8b00ff'  // Violet
];

// Global Audio System
let siteAudio = null;
let audioEnabled = false;
let userHasInteracted = false;
const AUDIO_PREFERENCE_KEY = 'audioEnabled';

// Performance optimization
let isScrolling = false;
let scrollTimeout;

// Initialize app with performance considerations
document.addEventListener('DOMContentLoaded', () => {
    // Critical path - immediate initialization
    initializeUserInteractionTracking();
    initializeHeroAnimation();
    initializeGlobalAudio();
    
    // Defer non-critical functionality
    requestIdleCallback(() => {
        initializeChakraCursor();
        initializeUnifiedVideoSystem(); // ONLY this video system now
        initializeTestimonialCarousel();
        initializeRegistrationModal();
        initializeLogoClick();
        initializeNavigation();
        initializeMobileOptimizations();
        initializePerformanceMonitoring();
    });
    
    // Defer scroll animations until after initial load
    setTimeout(() => {
        initializeScrollAnimations();
    }, 100);
});

// Track user interaction for audio compliance
function initializeUserInteractionTracking() {
    const trackInteraction = () => {
        if (!userHasInteracted) {
            userHasInteracted = true;
            console.log('User interaction detected - audio now available');
        }
    };

    document.addEventListener('click', trackInteraction);
    document.addEventListener('touchstart', trackInteraction);
    document.addEventListener('keydown', trackInteraction);
}

// Hero animation choreography - Apple-style color crossfade
function initializeHeroAnimation() {
    const documentElement = document.documentElement;
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        documentElement.classList.remove('is-intro');
        return;
    }

    documentElement.classList.add('is-intro');
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            documentElement.classList.remove('is-intro');
        });
    });
}

// Site Audio System - Clean implementation
function initializeGlobalAudio() {
    siteAudio = document.getElementById('siteAudio');
    const playMusicBtn = document.querySelector('.play-music-btn, .floating-music-btn');
    
    if (!siteAudio || !playMusicBtn) {
        console.warn('Site audio or play button not found');
        return;
    }

    const savedPreference = localStorage.getItem(AUDIO_PREFERENCE_KEY);
    audioEnabled = savedPreference === 'true';
    
    siteAudio.volume = 0.25;
    siteAudio.muted = true;
    
    updateAudioButtonState(playMusicBtn, false);
    
    if (audioEnabled) {
        const handleFirstInteraction = () => {
            if (audioEnabled && userHasInteracted) {
                playAudio(playMusicBtn);
                document.removeEventListener('click', handleFirstInteraction);
                document.removeEventListener('touchstart', handleFirstInteraction);
                document.removeEventListener('keydown', handleFirstInteraction);
            }
        };
        
        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);
    }
    
    playMusicBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!userHasInteracted) {
            console.log('Audio requires user interaction first');
            return;
        }
        
        toggleAudio(playMusicBtn);
    });

    siteAudio.addEventListener('loadeddata', () => {
        console.log('Site audio loaded successfully');
    });

    siteAudio.addEventListener('error', (e) => {
        console.error('Site audio failed to load:', e);
        playMusicBtn.textContent = 'Audio Unavailable';
        playMusicBtn.disabled = true;
        playMusicBtn.setAttribute('aria-label', 'Background music unavailable');
        playMusicBtn.setAttribute('aria-pressed', 'false');
    });

    siteAudio.addEventListener('play', () => {
        console.log('Site audio started playing');
        updateAudioButtonState(playMusicBtn, true);
    });

    siteAudio.addEventListener('pause', () => {
        console.log('Site audio paused');
        updateAudioButtonState(playMusicBtn, false);
    });
}

function toggleAudio(button) {
    if (!userHasInteracted) {
        console.log('Cannot toggle audio - no user interaction yet');
        return;
    }

    if (!audioEnabled || siteAudio.paused) {
        playAudio(button);
    } else {
        pauseAudio(button);
    }
}

function playAudio(button) {
    siteAudio.muted = false;
    
    const playPromise = siteAudio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            audioEnabled = true;
            localStorage.setItem(AUDIO_PREFERENCE_KEY, 'true');
            updateAudioButtonState(button, true);
            console.log('Site audio started successfully');
        }).catch((error) => {
            console.warn('Audio play failed:', error);
            audioEnabled = false;
            siteAudio.muted = true;
            localStorage.setItem(AUDIO_PREFERENCE_KEY, 'false');
            updateAudioButtonState(button, false);
        });
    }
}

function pauseAudio(button) {
    siteAudio.pause();
    siteAudio.muted = true;
    audioEnabled = false;
    localStorage.setItem(AUDIO_PREFERENCE_KEY, 'false');
    updateAudioButtonState(button, false);
    console.log('Site audio paused by user');
}

function updateAudioButtonState(button, isPlaying) {
    if (isPlaying && audioEnabled && !siteAudio.paused) {
        button.textContent = '♪';
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        button.setAttribute('aria-label', 'Pause background music');
    } else {
        button.textContent = '♪';
        button.classList.remove('active');
        button.setAttribute('aria-pressed', 'false');
        button.setAttribute('aria-label', 'Play background music');
    }
}

// ===== UNIFIED VIDEO SYSTEM - FIXED IMPLEMENTATION =====
function initializeUnifiedVideoSystem() {
    console.log('Initializing unified video system...');
    
    const allVideos = document.querySelectorAll('video');
    let activeVideoAudio = null; // Track which video currently has sound
    
    allVideos.forEach(video => {
        if (video.dataset.videoInitialized === 'true') return;
        video.dataset.videoInitialized = 'true';
        
        // Ensure proper video attributes for autoplay and looping
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('preload', 'metadata');
        
        // Find container
        let container = video.closest('.media');
        if (!container) {
            container = video.parentElement;
            if (!container) return;
        }
        
        // Ensure relative positioning
        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }
        
        // Remove existing overlays to prevent duplicates
        const existingOverlays = container.querySelectorAll('.video-overlay, .video-control, .media-control');
        existingOverlays.forEach(overlay => overlay.remove());
        
        // Create video overlay with play button
        const overlay = document.createElement('div');
        overlay.className = 'video-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: inherit;
            z-index: 2;
            opacity: 1;
            pointer-events: auto;
        `;
        
        const playButton = document.createElement('button');
        playButton.className = 'video-ctl';
        playButton.type = 'button';
        playButton.setAttribute('aria-label', 'Play with sound');
        playButton.setAttribute('aria-pressed', 'false');
        playButton.tabIndex = 0;
        playButton.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            color: #000;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        `;
        
        playButton.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="width: 24px; height: 24px; margin-left: 2px;">
                <path d="M8 5v14l11-7z"/>
            </svg>
        `;
        
        overlay.appendChild(playButton);
        container.appendChild(overlay);
        
        // Video state management
        let isVideoMuted = true;
        
        function showOverlay() {
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
            playButton.setAttribute('aria-label', 'Play with sound');
            playButton.setAttribute('aria-pressed', 'false');
        }
        
        function hideOverlay() {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            playButton.setAttribute('aria-label', 'Mute video');
            playButton.setAttribute('aria-pressed', 'true');
        }
        
        function toggleVideoSound() {
            if (!userHasInteracted) {
                console.log('Video sound requires user interaction first');
                return;
            }
            
            if (isVideoMuted) {
                // Mute any currently active video
                if (activeVideoAudio && activeVideoAudio !== video) {
                    activeVideoAudio.muted = true;
                    const activeContainer = activeVideoAudio.closest('.media') || activeVideoAudio.parentElement;
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
                
                console.log('Video sound enabled');
            } else {
                // Mute this video
                video.muted = true;
                isVideoMuted = true;
                activeVideoAudio = null;
                showOverlay();
                
                // Restore background music volume
                if (siteAudio && audioEnabled && !siteAudio.muted) {
                    siteAudio.volume = 0.25;
                }
                
                console.log('Video sound disabled');
            }
        }
        
        // Event listeners
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
        
        // Also allow clicking directly on video when overlay is hidden
        video.addEventListener('click', (e) => {
            e.preventDefault();
            if (userHasInteracted && !isVideoMuted) {
                toggleVideoSound();
            }
        });
        
        // Handle video events
        video.addEventListener('volumechange', () => {
            isVideoMuted = video.muted;
            if (isVideoMuted) {
                showOverlay();
            } else {
                hideOverlay();
            }
        });
        
        video.addEventListener('loadeddata', () => {
            // Ensure video starts playing when loaded
            if (video.paused) {
                video.play().catch(() => {
                    console.log('Video autoplay prevented');
                });
            }
        });
        
        video.addEventListener('error', (e) => {
            console.error('Video loading error:', e);
            playButton.disabled = true;
            playButton.setAttribute('aria-label', 'Video unavailable');
            overlay.style.background = 'rgba(128, 128, 128, 0.5)';
        });
        
        // Ensure video loops properly
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play().catch(() => {
                console.log('Video replay failed');
            });
        });
        
        // Initialize with overlay showing
        showOverlay();
        
        console.log('Video overlay initialized');
    });
    
    // Intersection observer for performance - pause videos out of view
    const videoObserver = new IntersectionObserver((entries) => {
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
    
    // Observe all videos
    allVideos.forEach(video => {
        videoObserver.observe(video);
    });
}

// Enhanced testimonial carousel
function initializeTestimonialCarousel() {
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const progressBar = document.querySelector('.progress-fill');
    const progressContainer = document.querySelector('.carousel-progress');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    
    if (!testimonialsTrack || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    const totalSlides = testimonialItems.length;
    let isNavigating = false;
    
    const getScrollPosition = (index) => {
        const cardWidth = testimonialItems[0]?.offsetWidth || 0;
        const gap = parseInt(getComputedStyle(testimonialsTrack).gap) || 32;
        return index * (cardWidth + gap);
    };
    
    function updateProgressBar() {
        if (progressBar && progressContainer) {
            const progress = ((currentSlide + 1) / totalSlides) * 100;
            progressBar.style.width = `${progress}%`;
            progressContainer.setAttribute('aria-valuenow', Math.round(progress));
        }
    }
    
    function throttledNavigation(direction) {
        if (isNavigating) return;
        
        isNavigating = true;
        setTimeout(() => {
            isNavigating = false;
        }, 300);
        
        const prevSlide = currentSlide;
        
        if (direction === 'prev') {
            currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
        } else if (direction === 'next') {
            currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        }
        
        if (currentSlide !== prevSlide) {
            updateCarousel();
        }
    }
    
    function updateCarousel() {
        const scrollPosition = getScrollPosition(currentSlide);
        testimonialsTrack.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        updateProgressBar();
        
        prevBtn.setAttribute('aria-label', 
            `Previous testimonial (${currentSlide + 1} of ${totalSlides})`);
        nextBtn.setAttribute('aria-label', 
            `Next testimonial (${currentSlide + 1} of ${totalSlides})`);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => throttledNavigation('prev'));
    nextBtn.addEventListener('click', () => throttledNavigation('next'));
    
    // Initialize
    updateCarousel();
}

// Improved Chakra cursor system with better click handling
function initializeChakraCursor() {
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
        return;
    }

    cursor = document.createElement('div');
    cursor.className = 'chakra-cursor';
    cursor.style.pointerEvents = 'none';
    document.body.appendChild(cursor);
    cursorActive = true;

    let mouseMoveTimeout;
    document.addEventListener('mousemove', (e) => {
        if (!cursorActive) return;
        
        if (mouseMoveTimeout) {
            cancelAnimationFrame(mouseMoveTimeout);
        }
        
        mouseMoveTimeout = requestAnimationFrame(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    });

    let colorUpdateTimeout;
    window.addEventListener('scroll', () => {
        if (!cursorActive) return;
        
        if (colorUpdateTimeout) {
            clearTimeout(colorUpdateTimeout);
        }
        
        colorUpdateTimeout = setTimeout(() => {
            updateChakraCursorColor();
        }, 16);
    });
    
    document.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.opacity = '0.8';
    });

    const interactiveElements = document.querySelectorAll('button, a, input, textarea, select, video, [role="button"], [tabindex]');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (cursor) {
                cursor.style.opacity = '0';
                cursor.style.transform = 'translate(-50%, -50%) scale(0.3)';
            }
        });

        element.addEventListener('mouseleave', () => {
            if (cursor) {
                cursor.style.opacity = '0.8';
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    });
}

function updateChakraCursorColor() {
    if (!cursor || !cursorActive) return;
    
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.min(scrollTop / documentHeight, 1);

    const colorIndex = scrollPercentage * (chakraColors.length - 1);
    const lowerIndex = Math.floor(colorIndex);
    const upperIndex = Math.min(lowerIndex + 1, chakraColors.length - 1);
    const ratio = colorIndex - lowerIndex;

    const lowerColor = hexToRgb(chakraColors[lowerIndex]);
    const upperColor = hexToRgb(chakraColors[upperIndex]);

    const r = Math.round(lowerColor.r + (upperColor.r - lowerColor.r) * ratio);
    const g = Math.round(lowerColor.g + (upperColor.g - lowerColor.g) * ratio);
    const b = Math.round(lowerColor.b + (upperColor.b - lowerColor.b) * ratio);

    const currentColor = `rgb(${r}, ${g}, ${b})`;
    cursor.style.background = currentColor;
    cursor.style.boxShadow = `0 0 20px ${currentColor}`;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function initializeRegistrationModal() {
    if (!modal || !registerBtn || !modalClose || !cancelBtn) return;
    
    let focusableElements = [];
    let firstFocusable, lastFocusable;
    
    function updateFocusableElements() {
        focusableElements = modal.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
        );
        firstFocusable = focusableElements[0];
        lastFocusable = focusableElements[focusableElements.length - 1];
    }
    
    function trapFocus(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
        
        if (e.key === 'Escape') {
            closeModal();
        }
    }
    
    function openModal() {
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        updateFocusableElements();
        
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
        
        modal.addEventListener('keydown', trapFocus);
    }
    
    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        modal.removeEventListener('keydown', trapFocus);
        registerBtn.focus();
        resetForm();
    }
    
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
    
    modalClose.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function initializeLogoClick() {
    const brandLinks = document.querySelectorAll('.brand, .hero__logo');
    brandLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                window.scrollTo(0, 0);
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeNavigation() {
    const allNavLinks = document.querySelectorAll('.nav a, .footer-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    window.scrollTo(0, targetPosition);
                } else {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initializeMobileOptimizations() {
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    if (isMobile) {
        cursorActive = false;
        if (cursor) {
            cursor.style.display = 'none';
        }
        
        document.body.style.touchAction = 'manipulation';
        
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.type !== 'file') {
                input.style.fontSize = '16px';
            }
        });
    }
}

function initializeScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

function initializePerformanceMonitoring() {
    console.log('Performance monitoring initialized');
}

function resetForm() {
    if (registrationForm) {
        registrationForm.style.display = 'block';
        registrationForm.reset();
        
        if (formSuccess) {
            formSuccess.classList.add('hidden');
        }
    }
}