// DOM elements
const soundToggleButtons = document.querySelectorAll('.sound-toggle');
const videos = document.querySelectorAll('video');
const v916Videos = document.querySelectorAll('.v916');
const testimonialsTrack = document.querySelector('.testimonials-track');
const logoLink = document.querySelector('.logo-link');
const missionVideos = document.querySelectorAll('.mission-video');
const meetVideos = document.querySelectorAll('.meet-video');
const interviewVideos = document.querySelectorAll('.interview-video');
const testimonialVideos = document.querySelectorAll('.testimonial-video');
const videoSoundToggles = document.querySelectorAll('.video-sound-toggle');
const testimonialSoundToggles = document.querySelectorAll('.testimonial-sound-toggle');
const mediaControls = document.querySelectorAll('.media-control');

// Navigation elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Carousel elements
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
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
        initializeV916Videos();
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

    // Track various user interactions
    document.addEventListener('click', trackInteraction);
    document.addEventListener('touchstart', trackInteraction);
    document.addEventListener('keydown', trackInteraction);
}

// Hero animation choreography - Apple-style color crossfade
function initializeHeroAnimation() {
    const documentElement = document.documentElement;
    
    // Check for reduced motion preference - EXACT: skip animation and render final colors instantly
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Skip animation for users who prefer reduced motion - show end state immediately
        documentElement.classList.remove('is-intro');
        return;
    }

    // Ensure initial intro state is set (should already be set in HTML to prevent FOUC)
    documentElement.classList.add('is-intro');
    
    // EXACT: Use requestAnimationFrame to trigger the CSS transition
    // This ensures the initial styles are painted before the transition begins
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            // Remove the intro class to trigger the 2.6s color crossfade
            // The CSS will handle the transition with cubic-bezier(0.22, 1, 0.36, 1)
            documentElement.classList.remove('is-intro');
        });
    });
}

// Site Audio System - Clean implementation following specifications
function initializeGlobalAudio() {
    siteAudio = document.getElementById('siteAudio');
    const playMusicBtn = document.querySelector('.play-music-btn, .floating-music-btn');
    
    if (!siteAudio || !playMusicBtn) {
        console.warn('Site audio or play button not found');
        return;
    }

    // Load saved preference from localStorage
    const savedPreference = localStorage.getItem(AUDIO_PREFERENCE_KEY);
    audioEnabled = savedPreference === 'true';
    
    // Set audio properties - always start muted
    siteAudio.volume = 0.25;
    siteAudio.muted = true;
    
    // Set initial button state - always shows current state
    updateAudioButtonState(playMusicBtn, false);
    
    // Auto-play if enabled and user has interacted
    if (audioEnabled) {
        // Wait for first user interaction, then play
        const handleFirstInteraction = () => {
            if (audioEnabled && userHasInteracted) {
                playAudio(playMusicBtn);
                // Remove this listener after first use
                document.removeEventListener('click', handleFirstInteraction);
                document.removeEventListener('touchstart', handleFirstInteraction);
                document.removeEventListener('keydown', handleFirstInteraction);
            }
        };
        
        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);
    }
    
    // Play button click handler
    playMusicBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!userHasInteracted) {
            console.log('Audio requires user interaction first');
            return;
        }
        
        toggleAudio(playMusicBtn);
    });

    // Audio event handlers
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
        // Start/resume music
        playAudio(button);
    } else {
        // Pause music
        pauseAudio(button);
    }
}

function playAudio(button) {
    siteAudio.muted = false;
    
    const playPromise = siteAudio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Audio started successfully
            audioEnabled = true;
            localStorage.setItem(AUDIO_PREFERENCE_KEY, 'true');
            updateAudioButtonState(button, true);
            console.log('Site audio started successfully');
        }).catch((error) => {
            // Audio failed to start
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

// Improved Chakra cursor system with better click handling
function initializeChakraCursor() {
    // Skip cursor on mobile or touch devices
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
        return;
    }

    // Create cursor element
    cursor = document.createElement('div');
    cursor.className = 'chakra-cursor';
    cursor.style.pointerEvents = 'none'; // Ensure cursor never blocks clicks
    document.body.appendChild(cursor);
    cursorActive = true;

    // Track mouse movement with throttling for performance
    let mouseMoveTimeout;
    document.addEventListener('mousemove', (e) => {
        if (!cursorActive) return;
        
        // Throttle cursor updates for performance
        if (mouseMoveTimeout) {
            cancelAnimationFrame(mouseMoveTimeout);
        }
        
        mouseMoveTimeout = requestAnimationFrame(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    });

    // Update cursor color on scroll with throttling
    let colorUpdateTimeout;
    window.addEventListener('scroll', () => {
        if (!cursorActive) return;
        
        if (colorUpdateTimeout) {
            clearTimeout(colorUpdateTimeout);
        }
        
        colorUpdateTimeout = setTimeout(() => {
            updateChakraCursorColor();
        }, 16); // ~60fps
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.opacity = '0.8';
    });

    // Hide cursor over interactive elements to prevent interference
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

    // Calculate color progression through chakras
    const colorIndex = scrollPercentage * (chakraColors.length - 1);
    const lowerIndex = Math.floor(colorIndex);
    const upperIndex = Math.min(lowerIndex + 1, chakraColors.length - 1);
    const ratio = colorIndex - lowerIndex;

    // Interpolate between two chakra colors
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

// Universal 9:16 Video System - Updated for new .media wrapper pattern
function initializeV916Videos() {
    // Use throttled observer for better performance
    const v916Observer = createThrottledObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Use requestAnimationFrame for smooth playback
                requestAnimationFrame(() => {
                    if (video.readyState >= 2) { // HAVE_CURRENT_DATA
                        video.play().catch(() => {
                            console.log('V916 video autoplay prevented');
                        });
                    }
                });
            } else {
                // Pause videos that are out of viewport to save resources
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '100px 0px 100px 0px'
    });

    // Observe all .v916 videos with the new .media wrapper pattern
    v916Videos.forEach(video => {
        // Set default attributes as specified
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('loop', '');
        video.setAttribute('preload', 'metadata');
        
        // Observe for play/pause
        v916Observer.observe(video);
        
        // Find the media container and control
        const mediaContainer = video.closest('.media');
        const mediaControl = mediaContainer?.querySelector('.media-control');
        
        if (mediaControl) {
            // Enhanced ARIA attributes
            mediaControl.setAttribute('aria-pressed', 'false');
            mediaControl.setAttribute('tabindex', '0');
            
            // Click handler for center overlay control
            const handleControlClick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (userHasInteracted) {
                    toggleVideoSound(video);
                }
            };
            
            mediaControl.addEventListener('click', handleControlClick);
            
            // Keyboard support
            mediaControl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleControlClick(e);
                }
            });
        }
        
        // Also handle video clicks
        video.addEventListener('click', (e) => {
            e.preventDefault();
            if (userHasInteracted) {
                toggleVideoSound(video);
            }
        });
        
        // Error handling
        video.addEventListener('error', (e) => {
            console.error('Video loading error:', e);
            video.setAttribute('aria-label', 'Video unavailable');
            if (mediaControl) {
                mediaControl.disabled = true;
                mediaControl.setAttribute('aria-label', 'Video unavailable');
            }
        });
    });
}

function toggleVideoSound(targetVideo) {
    if (!userHasInteracted) return;
    
    const targetContainer = targetVideo.closest('.media');
    const targetControl = targetContainer?.querySelector('.media-control');
    
    if (targetVideo.muted) {
        // Mute all other videos first
        v916Videos.forEach(video => {
            if (video !== targetVideo) {
                video.muted = true;
                const container = video.closest('.media');
                const control = container?.querySelector('.media-control');
                if (control) {
                    control.textContent = '🔊'; // Muted state - show speaker icon
                    control.classList.remove('active');
                    control.setAttribute('aria-pressed', 'false');
                }
            }
        });
        
        // Lower background music when video audio is active
        if (siteAudio && audioEnabled && !siteAudio.muted) {
            siteAudio.volume = 0.1;
        }
        
        // Unmute target video
        targetVideo.muted = false;
        if (targetControl) {
            targetControl.textContent = '🔇'; // Playing with sound - show muted speaker icon
            targetControl.classList.add('active');
            targetControl.setAttribute('aria-pressed', 'true');
        }
        
        console.log('Video sound enabled');
    } else {
        // Mute target video
        targetVideo.muted = true;
        if (targetControl) {
            targetControl.textContent = '🔊'; // Muted state - show speaker icon
            targetControl.classList.remove('active');
            targetControl.setAttribute('aria-pressed', 'false');
        }
        
        // Restore background music volume
        if (siteAudio && audioEnabled && !siteAudio.muted) {
            siteAudio.volume = 0.25;
        }
        
        console.log('Video sound disabled');
    }
}

// Enhanced testimonial carousel with Apple-style peek functionality and fixed video overlay controls
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
    let autoScrollInterval = null;
    let isAutoScrollPaused = false;
    
    // Drag-to-scroll variables
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let dragThreshold = 8; // Minimum pixels to start horizontal drag
    
    // Calculate scroll positions based on card width + gap
    const getScrollPosition = (index) => {
        const cardWidth = testimonialItems[0]?.offsetWidth || 0;
        const gap = parseInt(getComputedStyle(testimonialsTrack).gap) || 32;
        return index * (cardWidth + gap);
    };
    
    // Update progress bar based on current slide
    function updateProgressBar() {
        if (progressBar && progressContainer) {
            const progress = ((currentSlide + 1) / totalSlides) * 100;
            progressBar.style.width = `${progress}%`;
            progressContainer.setAttribute('aria-valuenow', Math.round(progress));
        }
    }
    
    // Throttled navigation to prevent rapid-fire interactions
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
            announceSlideChange();
            pauseAutoScroll();
        }
    }
    
    // Update carousel position with smooth scrolling
    function updateCarousel() {
        const scrollPosition = getScrollPosition(currentSlide);
        testimonialsTrack.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        updateProgressBar();
        
        // Update navigation button states
        prevBtn.setAttribute('aria-label', 
            `Previous testimonial (${currentSlide + 1} of ${totalSlides})`);
        nextBtn.setAttribute('aria-label', 
            `Next testimonial (${currentSlide + 1} of ${totalSlides})`);
    }
    
    // Screen reader announcements
    function announceSlideChange() {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Showing testimonial ${currentSlide + 1} of ${totalSlides}`;
        
        document.body.appendChild(announcement);
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Enhanced wheel scroll handling - allow vertical scroll but handle horizontal
    function handleWheelScroll(e) {
        const deltaX = Math.abs(e.deltaX);
        const deltaY = Math.abs(e.deltaY);
        
        // Only prevent default for primarily horizontal scrolling
        if (deltaX > deltaY) {
            e.preventDefault();
            
            const threshold = 50;
            if (deltaX > threshold) {
                if (e.deltaX > 0) {
                    throttledNavigation('next');
                } else {
                    throttledNavigation('prev');
                }
            }
        }
        // Allow vertical scrolling to pass through for deltaY > deltaX
    }
    
    // Enhanced drag-to-scroll with horizontal threshold
    function handlePointerDown(e) {
        if (e.target.closest('.video-overlay')) return; // Don't drag when clicking overlay
        
        isDragging = false; // Don't start dragging yet
        startX = e.clientX;
        startY = e.clientY;
        scrollLeft = testimonialsTrack.scrollLeft;
        
        testimonialsTrack.style.cursor = 'grabbing';
        testimonialsTrack.style.userSelect = 'none';
        
        // Set touch-action to allow vertical panning initially
        testimonialsTrack.style.touchAction = 'pan-y';
    }
    
    function handlePointerMove(e) {
        if (!startX && !startY) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        // Check if movement is primarily horizontal
        if (!isDragging && (Math.abs(deltaX) > Math.abs(deltaY) + dragThreshold)) {
            isDragging = true;
            // Now prevent vertical scrolling for this gesture
            testimonialsTrack.style.touchAction = 'none';
            pauseAutoScroll();
        }
        
        if (isDragging) {
            e.preventDefault();
            const scrollPosition = scrollLeft - deltaX;
            testimonialsTrack.scrollLeft = scrollPosition;
        }
    }
    
    function handlePointerUp(e) {
        if (isDragging) {
            // Snap to nearest item after drag
            const scrollLeft = testimonialsTrack.scrollLeft;
            const cardWidth = testimonialItems[0]?.offsetWidth || 0;
            const gap = parseInt(getComputedStyle(testimonialsTrack).gap) || 32;
            const newIndex = Math.round(scrollLeft / (cardWidth + gap));
            
            if (newIndex !== currentSlide && newIndex >= 0 && newIndex < totalSlides) {
                currentSlide = newIndex;
                updateCarousel();
            }
        }
        
        // Reset drag state
        isDragging = false;
        startX = 0;
        startY = 0;
        testimonialsTrack.style.cursor = '';
        testimonialsTrack.style.userSelect = '';
        testimonialsTrack.style.touchAction = 'pan-y'; // Reset to allow vertical
    }
    
    // Keyboard navigation - arrow keys move one snap
    function handleCarouselKeyboard(e) {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                throttledNavigation('prev');
                break;
            case 'ArrowRight':
                e.preventDefault();
                throttledNavigation('next');
                break;
            case 'Home':
                e.preventDefault();
                currentSlide = 0;
                updateCarousel();
                announceSlideChange();
                pauseAutoScroll();
                break;
            case 'End':
                e.preventDefault();
                currentSlide = totalSlides - 1;
                updateCarousel();
                announceSlideChange();
                pauseAutoScroll();
                break;
        }
    }
    
    // Auto-advance every ~5s when idle
    function startAutoScroll() {
        if (autoScrollInterval) return;
        
        autoScrollInterval = setInterval(() => {
            if (!isAutoScrollPaused && !isNavigating && !isDragging) {
                throttledNavigation('next');
            }
        }, 5000); // Every 5 seconds
    }
    
    // Pause on hover/focus/interact
    function pauseAutoScroll() {
        isAutoScrollPaused = true;
        setTimeout(() => {
            isAutoScrollPaused = false;
        }, 10000); // Resume after 10 seconds
    }
    
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }
    
    // Event listeners for carousel navigation
    prevBtn.addEventListener('click', () => throttledNavigation('prev'));
    nextBtn.addEventListener('click', () => throttledNavigation('next'));
    
    // Enhanced scroll handling - allow vertical, handle horizontal
    testimonialsTrack.addEventListener('wheel', handleWheelScroll, { passive: false });
    
    // Drag-to-scroll with horizontal threshold
    testimonialsTrack.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    
    // Touch events for mobile
    testimonialsTrack.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        handlePointerDown({ clientX: touch.clientX, clientY: touch.clientY });
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            e.preventDefault(); // Only prevent when actively dragging horizontally
        }
        const touch = e.touches[0];
        if (touch) {
            handlePointerMove({ clientX: touch.clientX, clientY: touch.clientY, preventDefault: () => e.preventDefault() });
        }
    }, { passive: false });
    
    document.addEventListener('touchend', handlePointerUp, { passive: true });
    
    // Keyboard navigation
    testimonialsTrack.addEventListener('keydown', handleCarouselKeyboard);
    
    // Pause auto-scroll on hover/focus/interact
    const carousel = document.querySelector('.apple-carousel') || testimonialsTrack.parentElement;
    carousel.addEventListener('mouseenter', pauseAutoScroll);
    carousel.addEventListener('focus', pauseAutoScroll, true);
    carousel.addEventListener('pointerdown', pauseAutoScroll);
    carousel.addEventListener('touchstart', pauseAutoScroll);
    
    // Touch/scroll detection for manual scrolling
    let scrollTimeout;
    let userScrolling = false;
    
    testimonialsTrack.addEventListener('scroll', () => {
        if (userScrolling || isDragging) return;
        
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            const scrollLeft = testimonialsTrack.scrollLeft;
            const cardWidth = testimonialItems[0]?.offsetWidth || 0;
            const gap = parseInt(getComputedStyle(testimonialsTrack).gap) || 32;
            const newIndex = Math.round(scrollLeft / (cardWidth + gap));
            
            if (newIndex !== currentSlide && newIndex >= 0 && newIndex < totalSlides) {
                currentSlide = newIndex;
                userScrolling = true;
                updateProgressBar();
                pauseAutoScroll();
                setTimeout(() => { userScrolling = false; }, 100);
            }
        }, 150);
    });
    
    // Initialize video overlay controls for testimonials
    initializeTestimonialVideoOverlays();
    
    // Lazy loading and IntersectionObserver for videos - pause off-screen videos
    const videoObserver = createThrottledObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                // Lazy load video if not already loaded
                if (video.preload === 'none') {
                    video.preload = 'metadata';
                }
                
                requestAnimationFrame(() => {
                    if (video.readyState >= 2) {
                        video.play().catch(() => {
                            console.log('Testimonial video autoplay prevented');
                        });
                    }
                });
            } else {
                // Pause videos that are out of view
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '50px 0px 50px 0px'
    });

    // Observe all testimonial videos
    const testimonialVideos = document.querySelectorAll('.testimonial-video');
    testimonialVideos.forEach(video => {
        videoObserver.observe(video);
        
        // Set default attributes for testimonial videos
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('loop', '');
        video.setAttribute('preload', 'metadata');
        video.setAttribute('autoplay', '');
        
        // Set initial lazy loading for performance
        video.preload = 'none';
        
        // Error handling
        video.addEventListener('error', (e) => {
            console.error('Testimonial video loading error:', e);
            video.setAttribute('aria-label', 'Video unavailable');
        });
    });
    
    // Enhanced ARIA labels for testimonial items
    testimonialItems.forEach((item, index) => {
        item.setAttribute('aria-label', `Community testimonial ${index + 1} of ${totalSlides}`);
    });
    
    // Initialize carousel
    updateCarousel();
    
    // Start auto-advance after initial load
    setTimeout(() => {
        startAutoScroll();
    }, 2000);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 250);
    }, { passive: true });
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        stopAutoScroll();
        videoObserver.disconnect();
    });
}

// New function: Initialize video overlay controls specifically for testimonials
function initializeTestimonialVideoOverlays() {
    const testimonialVideos = document.querySelectorAll('.testimonial-video');
    
    testimonialVideos.forEach(video => {
        const mediaContainer = video.closest('.media');
        if (!mediaContainer) return;
        
        // Create video overlay with PLAY button
        const overlay = document.createElement('button');
        overlay.className = 'video-overlay';
        overlay.setAttribute('tabindex', '0');
        overlay.setAttribute('aria-pressed', 'false');
        overlay.setAttribute('aria-label', 'Play with sound');
        
        // Create play icon SVG
        overlay.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
            </svg>
        `;
        
        // Insert overlay into media container
        mediaContainer.appendChild(overlay);
        
        // Track mute state (all testimonial videos start muted)
        let isMuted = true;
        
        // Overlay click handler
        const handleOverlayClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (!userHasInteracted) {
                console.log('Video overlay requires user interaction first');
                return;
            }
            
            if (isMuted) {
                // Mute all other testimonial videos first
                testimonialVideos.forEach(otherVideo => {
                    if (otherVideo !== video) {
                        otherVideo.muted = true;
                        const otherContainer = otherVideo.closest('.media');
                        const otherOverlay = otherContainer?.querySelector('.video-overlay');
                        if (otherOverlay) {
                            otherOverlay.classList.remove('hidden');
                            otherOverlay.setAttribute('aria-pressed', 'false');
                            otherOverlay.setAttribute('aria-label', 'Play with sound');
                        }
                    }
                });
                
                // Lower background music when video audio is active
                if (siteAudio && audioEnabled && !siteAudio.muted) {
                    siteAudio.volume = 0.1;
                }
                
                // Unmute target video and hide overlay
                video.muted = false;
                overlay.classList.add('hidden');
                overlay.setAttribute('aria-pressed', 'true');
                overlay.setAttribute('aria-label', 'Mute');
                
                isMuted = false;
                console.log('Testimonial video sound enabled');
            } else {
                // Mute target video and show overlay
                video.muted = true;
                overlay.classList.remove('hidden');
                overlay.setAttribute('aria-pressed', 'false');
                overlay.setAttribute('aria-label', 'Play with sound');
                
                // Restore background music volume
                if (siteAudio && audioEnabled && !siteAudio.muted) {
                    siteAudio.volume = 0.25;
                }
                
                isMuted = true;
                console.log('Testimonial video sound disabled');
            }
        };
        
        // Event listeners for overlay
        overlay.addEventListener('click', handleOverlayClick);
        
        // Keyboard support for overlay
        overlay.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOverlayClick(e);
            }
        });
        
        // Also handle direct video clicks for secondary toggle
        video.addEventListener('click', (e) => {
            e.preventDefault();
            if (userHasInteracted && !isMuted) {
                // Only handle click if video is currently unmuted (overlay is hidden)
                handleOverlayClick(e);
            }
        });
        
        // Ensure overlay starts visible for all testimonial videos
        overlay.classList.remove('hidden');
    });
}

// Enhanced performance monitoring
function initializePerformanceMonitoring() {
    // Monitor Long Tasks
    if ('PerformanceObserver' in window) {
        try {
            const longTaskObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.duration > 50) {
                        console.warn(`Long task detected: ${entry.duration}ms`);
                    }
                });
            });
            longTaskObserver.observe({ entryTypes: ['longtask'] });
        } catch (e) {
            console.log('Long task monitoring not supported');
        }
    }
    
    // Monitor memory usage
    if ('memory' in performance) {
        const checkMemory = () => {
            const memory = performance.memory;
            const usageRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
            
            if (usageRatio > 0.9) {
                console.warn('High memory usage detected:', {
                    used: Math.round(memory.usedJSHeapSize / 1048576) + 'MB',
                    limit: Math.round(memory.jsHeapSizeLimit / 1048576) + 'MB'
                });
                
                // Show performance warning
                showPerformanceWarning('High memory usage detected');
            }
        };
        
        // Check every 30 seconds
        setInterval(checkMemory, 30000);
    }
    
    // Monitor FPS
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsSum = 0;
    
    function measureFPS() {
        const now = performance.now();
        const delta = now - lastTime;
        lastTime = now;
        
        const fps = 1000 / delta;
        fpsSum += fps;
        frameCount++;
        
        if (frameCount >= 60) { // Check average FPS every 60 frames
            const avgFPS = fpsSum / frameCount;
            
            if (avgFPS < 30) {
                console.warn(`Low FPS detected: ${avgFPS.toFixed(1)}`);
                showPerformanceWarning('Performance issues detected');
            }
            
            frameCount = 0;
            fpsSum = 0;
        }
        
        requestAnimationFrame(measureFPS);
    }
    
    // Start FPS monitoring only if no reduced motion preference
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        requestAnimationFrame(measureFPS);
    }
}

function showPerformanceWarning(message) {
    let warning = document.querySelector('.performance-warning');
    
    if (!warning) {
        warning = document.createElement('div');
        warning.className = 'performance-warning';
        document.body.appendChild(warning);
    }
    
    warning.textContent = message;
    warning.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        warning.classList.remove('show');
    }, 5000);
}

// Enhanced scroll animations with throttling
function initializeScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .mission-item, .interview-card, .testimonial-item');
    
    // Throttled intersection observer for animations
    const animationObserver = createThrottledObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Unobserve after animation to improve performance
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

// Enhanced registration modal with full accessibility
function initializeRegistrationModal() {
    if (!modal || !registerBtn || !modalClose || !cancelBtn) return;
    
    // Track focusable elements for focus trap
    let focusableElements = [];
    let firstFocusable, lastFocusable;
    
    function updateFocusableElements() {
        focusableElements = modal.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
        );
        firstFocusable = focusableElements[0];
        lastFocusable = focusableElements[focusableElements.length - 1];
    }
    
    // Enhanced focus trap
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
    
    // Open modal with enhanced accessibility
    function openModal() {
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Update focusable elements
        updateFocusableElements();
        
        // Focus management
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
        
        // Add event listeners
        modal.addEventListener('keydown', trapFocus);
        
        // Announce modal opening to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.className = 'sr-only';
        announcement.textContent = 'Registration form opened';
        modal.appendChild(announcement);
    }
    
    // Close modal with cleanup
    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Remove event listeners
        modal.removeEventListener('keydown', trapFocus);
        
        // Return focus to trigger button
        registerBtn.focus();
        
        // Reset form
        resetForm();
    }
    
    // Event listeners
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
    
    modalClose.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Enhanced form validation
    if (registrationForm) {
        const formFields = registrationForm.querySelectorAll('input[required], textarea[required]');
        
        // Real-time validation with debouncing
        formFields.forEach(field => {
            let validationTimeout;
            
            const validateField = () => {
                const isValid = field.checkValidity();
                const errorContainer = document.getElementById(`${field.id}-error`);
                
                field.setAttribute('aria-invalid', (!isValid).toString());
                
                if (!isValid && field.validationMessage) {
                    errorContainer.textContent = field.validationMessage;
                    errorContainer.classList.remove('sr-only');
                    field.setAttribute('aria-describedby', errorContainer.id);
                } else {
                    errorContainer.textContent = '';
                    errorContainer.classList.add('sr-only');
                    field.removeAttribute('aria-describedby');
                }
                
                return isValid;
            };
            
            // Debounced validation
            const debouncedValidation = () => {
                if (validationTimeout) {
                    clearTimeout(validationTimeout);
                }
                validationTimeout = setTimeout(validateField, 300);
            };
            
            field.addEventListener('blur', validateField);
            field.addEventListener('input', debouncedValidation);
        });
        
        // Form submission with loading state
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Set loading state
            const submitBtn = registrationForm.querySelector('[type="submit"]');
            submitBtn.setAttribute('aria-busy', 'true');
            submitBtn.disabled = true;
            
            // Validate all fields
            let isFormValid = true;
            formFields.forEach(field => {
                const isValid = field.checkValidity();
                field.setAttribute('aria-invalid', (!isValid).toString());
                if (!isValid) isFormValid = false;
            });

            // Simulate processing delay
            setTimeout(() => {
                submitBtn.setAttribute('aria-busy', 'false');
                submitBtn.disabled = false;
                
                if (isFormValid) {
                    // Show success
                    registrationForm.style.display = 'none';
                    const successMessage = document.getElementById('form-success');
                    successMessage.classList.remove('hidden');
                    successMessage.focus();
                    
                    // Auto-close after 3 seconds
                    setTimeout(closeModal, 3000);
                } else {
                    // Focus first invalid field
                    const firstInvalid = registrationForm.querySelector('[aria-invalid="true"]');
                    if (firstInvalid) {
                        firstInvalid.focus();
                    }
                }
            }, 1000);
        });
    }
}

// Enhanced mobile optimizations
function initializeMobileOptimizations() {
    // Detect mobile/touch devices
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    if (isMobile) {
        // Disable cursor on mobile
        cursorActive = false;
        if (cursor) {
            cursor.style.display = 'none';
        }
        
        // Optimize touch scrolling
        document.body.style.touchAction = 'manipulation';
        
        // Prevent zoom on input focus
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.type !== 'file') {
                input.style.fontSize = '16px'; // Prevent iOS zoom
            }
        });
    }
    
    // Handle orientation change with throttling
    let orientationTimeout;
    window.addEventListener('orientationchange', () => {
        if (orientationTimeout) {
            clearTimeout(orientationTimeout);
        }
        
        orientationTimeout = setTimeout(() => {
            // Recalculate layouts after orientation change
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }, { passive: true });
    
    // Optimized scroll handling with throttling
    let scrollTimeout;
    const optimizedScrollHandler = () => {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            if (cursorActive) {
                updateChakraCursorColor();
            }
            scrollTimeout = null;
        }, 16); // ~60fps
    };
    
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
}

// Throttled intersection observer for better performance
function createThrottledObserver(callback, options = {}) {
    const defaultOptions = {
        threshold: 0.3,
        rootMargin: '50px 0px 50px 0px',
        ...options
    };
    
    let timeoutId;
    const throttledCallback = (entries) => {
        if (timeoutId) return;
        
        timeoutId = setTimeout(() => {
            callback(entries);
            timeoutId = null;
        }, 16); // ~60fps
    };
    
    return new IntersectionObserver(throttledCallback, defaultOptions);
}

// Enhanced navigation system - includes footer links
function initializeNavigation() {
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.setAttribute('aria-expanded', (!isExpanded).toString());
            navMenu.classList.toggle('active');
            
            // Update hamburger icon
            navToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
            
            // Manage focus
            if (navMenu.classList.contains('active')) {
                const firstNavLink = navMenu.querySelector('.nav-link');
                if (firstNavLink) {
                    setTimeout(() => firstNavLink.focus(), 100);
                }
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.textContent = '☰';
                }
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.textContent = '☰';
                navToggle.focus();
            }
        });
    }
    
    // Smooth scrolling for all navigation links (header and footer)
    const allNavLinks = document.querySelectorAll('.nav-link, .footer-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.textContent = '☰';
                }
                
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('#header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20; // Extra 20px padding
                
                // Smooth scroll with reduced motion support
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    window.scrollTo(0, targetPosition);
                } else {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // Update focus for accessibility
                targetSection.setAttribute('tabindex', '-1');
                setTimeout(() => {
                    targetSection.focus();
                    targetSection.removeAttribute('tabindex');
                }, 300);
            }
        });
    });

    // Navigation active state tracking
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav a[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Account for fixed header
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // Handle specific section mappings
            if (href === '#mission' && currentSection === 'mission') {
                link.classList.add('active');
            } else if (href === '#meet' && (currentSection === 'meet-lily' || currentSection === 'lily-speaks')) {
                link.classList.add('active');
            } else if (href === '#classes' && currentSection === 'classes') {
                link.classList.add('active');
            } else if (href === '#community' && (currentSection === 'testimonials' || currentSection === 'social')) {
                link.classList.add('active');
            }
        });
    }
    
    // Add scroll listener for navigation
    window.addEventListener('scroll', updateActiveNavigation);
    window.addEventListener('load', updateActiveNavigation);
}

// Logo click functionality
function initializeLogoClick() {
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Scroll to top
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                window.scrollTo(0, 0);
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            
            // Focus hero for accessibility
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.setAttribute('tabindex', '-1');
                setTimeout(() => {
                    hero.focus();
                    hero.removeAttribute('tabindex');
                }, 300);
            }
        });
    }
}

// Reset form function
function resetForm() {
    if (registrationForm) {
        registrationForm.style.display = 'block';
        registrationForm.reset();
        
        // Reset form validation states
        const formFields = registrationForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.setAttribute('aria-invalid', 'false');
            field.removeAttribute('aria-describedby');
        });
        
        // Hide error messages
        const errorMessages = registrationForm.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.classList.add('sr-only');
        });
        
        // Hide success message
        if (formSuccess) {
            formSuccess.classList.add('hidden');
        }
    }
}

// ===== Global Video PLAY Button System =====
function initializeGlobalVideoOverlays() {
    const allVideos = document.querySelectorAll('video');
    
    allVideos.forEach(video => {
        // Skip if already initialized
        if (video.dataset.overlayInitialized) return;
        video.dataset.overlayInitialized = 'true';
        
        // Set video attributes for proper autoplay
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.loop = true;
        video.muted = true;
        video.autoplay = true;
        video.preload = 'metadata';
        
        // Find or create container
        const container = video.closest('.media') || video.parentElement;
        if (!container) return;
        
        // Ensure container is positioned relatively
        const computedStyle = getComputedStyle(container);
        if (computedStyle.position === 'static') {
            container.style.position = 'relative';
        }
        
        // Create overlay if it doesn't exist
        let overlay = container.querySelector('.video-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'video-overlay';
            overlay.innerHTML = `
                <button class="video-ctl" aria-pressed="false" aria-label="Play with sound" tabindex="0">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </button>
            `;
            container.appendChild(overlay);
        }
        
        const playButton = overlay.querySelector('.video-ctl');
        
        // Toggle sound function
        function toggleVideoSound() {
            if (!userHasInteracted) {
                console.log('Video sound requires user interaction first');
                return;
            }
            
            if (video.muted) {
                // Mute all other videos first
                document.querySelectorAll('video').forEach(otherVideo => {
                    if (otherVideo !== video && !otherVideo.muted) {
                        otherVideo.muted = true;
                        const otherContainer = otherVideo.closest('.media') || otherVideo.parentElement;
                        const otherOverlay = otherContainer?.querySelector('.video-overlay');
                        if (otherOverlay) {
                            otherOverlay.classList.remove('is-hidden');
                            const otherButton = otherOverlay.querySelector('.video-ctl');
                            if (otherButton) {
                                otherButton.setAttribute('aria-pressed', 'false');
                                otherButton.setAttribute('aria-label', 'Play with sound');
                            }
                        }
                    }
                });
                
                // Lower background music volume if playing
                if (siteAudio && audioEnabled && !siteAudio.muted) {
                    siteAudio.volume = 0.1;
                }
                
                // Unmute this video and hide overlay
                video.muted = false;
                overlay.classList.add('is-hidden');
                playButton.setAttribute('aria-pressed', 'true');
                playButton.setAttribute('aria-label', 'Mute video');
                
                // Ensure video is playing
                video.play().catch(() => {
                    console.log('Video play failed');
                });
                
                console.log('Video sound enabled');
            } else {
                // Mute this video and show overlay
                video.muted = true;
                overlay.classList.remove('is-hidden');
                playButton.setAttribute('aria-pressed', 'false');
                playButton.setAttribute('aria-label', 'Play with sound');
                
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
        
        // Also allow clicking on video itself to toggle
        video.addEventListener('click', (e) => {
            e.preventDefault();
            toggleVideoSound();
        });
        
        // Initial state - overlay visible, video muted
        overlay.classList.remove('is-hidden');
        playButton.setAttribute('aria-pressed', 'false');
        playButton.setAttribute('aria-label', 'Play with sound');
        
        // Error handling
        video.addEventListener('error', (e) => {
            console.error('Video loading error:', e);
            playButton.disabled = true;
            playButton.setAttribute('aria-label', 'Video unavailable');
        });
    });
}

// Initialize video overlays when DOM is ready and when new videos are added
document.addEventListener('DOMContentLoaded', initializeGlobalVideoOverlays);

// Watch for dynamically added videos
const videoObserverForOverlays = new MutationObserver(() => {
    initializeGlobalVideoOverlays();
});

videoObserverForOverlays.observe(document.body, {
    childList: true,
    subtree: true
});

// Safety check on window load to ensure all videos are muted initially
window.addEventListener('load', () => {
    document.querySelectorAll('video').forEach(video => {
        if (!video.muted) {
            video.muted = true;
            const container = video.closest('.media') || video.parentElement;
            const overlay = container?.querySelector('.video-overlay');
            if (overlay) {
                overlay.classList.remove('is-hidden');
            }
        }
    });
});

// Unified Video Overlay System - Centered PLAY Button for All Videos
function initializeVideoOverlays() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Ensure video container has relative positioning
        const container = video.closest('.media') || video.parentElement;
        if (container && !container.style.position) {
            container.style.position = 'relative';
        }
        
        // Create overlay structure
        const overlay = document.createElement('div');
        overlay.className = 'video-overlay';
        
        const playButton = document.createElement('button');
        playButton.className = 'video-ctl';
        playButton.setAttribute('aria-label', 'Toggle video sound');
        playButton.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
            </svg>
        `;
        
        overlay.appendChild(playButton);
        container.appendChild(overlay);
        
        // Handle video state
        function updateVideoState() {
            if (video.muted) {
                overlay.classList.remove('is-hidden');
                playButton.innerHTML = `
                    <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                `;
                playButton.setAttribute('aria-label', 'Unmute video');
            } else {
                overlay.classList.add('is-hidden');
                playButton.innerHTML = `
                    <svg viewBox="0 0 24 24">
                        <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                `;
                playButton.setAttribute('aria-label', 'Mute video');
            }
        }
        
        // Click handler for play button
        playButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle mute state
            video.muted = !video.muted;
            updateVideoState();
            
            // Ensure video is playing
            if (video.paused) {
                video.play().catch(console.warn);
            }
        });
        
        // Show overlay when video is hovered
        container.addEventListener('mouseenter', () => {
            if (!video.muted) {
                overlay.classList.remove('is-hidden');
            }
        });
        
        container.addEventListener('mouseleave', () => {
            if (!video.muted) {
                overlay.classList.add('is-hidden');
            }
        });
        
        // Initialize state
        video.muted = true; // Start muted
        updateVideoState();
        
        // Handle video events
        video.addEventListener('loadeddata', updateVideoState);
        video.addEventListener('volumechange', updateVideoState);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeVideoOverlays);
} else {
    initializeVideoOverlays();
}