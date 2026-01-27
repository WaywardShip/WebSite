// Wait for DOM to be fully loaded
window.addEventListener('DOMContentLoaded', function() {
    console.log('🎸 Wayward Ship - Site loaded');
    
    // ===== PAGE NAVIGATION =====
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    
    console.log('Found', navButtons.length, 'nav buttons');
    console.log('Found', pages.length, 'pages');
    
    // Switch page function
    function switchPage(pageId) {
        console.log('Switching to:', pageId);
        
        // Hide all pages
        pages.forEach(function(page) {
            page.classList.remove('active');
        });
        
        // Remove active from all buttons
        navButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });
        
        // Show selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Activate selected button
        const targetBtn = document.querySelector('[data-page="' + pageId + '"]');
        if (targetBtn) {
            targetBtn.classList.add('active');
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    // Add click event to navigation buttons
    navButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            console.log('Button clicked:', pageId);
            switchPage(pageId);
        });
    });
    
    // ===== MUSIC PLATFORM SELECTION =====
    const platformModal = document.getElementById('platformModal');
    const platformButtons = document.querySelectorAll('.platform-btn');
    const modalChoices = document.querySelectorAll('.modal-btn[data-choice]');
    let currentQuery = '';
    
    // Open platform selection
    platformButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentQuery = this.getAttribute('data-query');
            
            // Check if user has a preference
            const pref = localStorage.getItem('musicPlatform');
            if (pref) {
                openPlatform(pref, currentQuery);
            } else {
                platformModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Handle platform choice
    modalChoices.forEach(function(choice) {
        choice.addEventListener('click', function() {
            const platform = this.getAttribute('data-choice');
            localStorage.setItem('musicPlatform', platform);
            openPlatform(platform, currentQuery);
            platformModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Open music platform
    function openPlatform(platform, query) {
        let url = '';
        if (platform === 'spotify') {
            url = 'https://open.spotify.com/search/' + encodeURIComponent(query);
        } else if (platform === 'deezer') {
            url = 'https://www.deezer.com/search/' + encodeURIComponent(query);
        }
        if (url) {
            window.open(url, '_blank');
        }
    }
    
    // ===== MODAL SYSTEM =====
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const legalLinks = document.querySelectorAll('.legal-link[data-modal]');
    
    // Open legal modals
    legalLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            if (modalId === 'terms') {
                document.getElementById('termsModal').classList.add('active');
            } else if (modalId === 'privacy') {
                document.getElementById('privacyModal').classList.add('active');
            }
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modals
    closeButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close modal on background click
    modals.forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(function(modal) {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
    
    // ===== SETLIST ANIMATIONS =====
    const setlistItems = document.querySelectorAll('.setlist-item');
    
    setlistItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            const number = this.querySelector('.setlist-number');
            if (number) {
                number.style.color = 'var(--color-primary)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const number = this.querySelector('.setlist-number');
            if (number) {
                number.style.color = 'var(--color-text-dim)';
            }
        });
    });
    
    // ===== HERO GLITCH EFFECT =====
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        
        setInterval(function() {
            if (Math.random() > 0.95) {
                const glitchText = originalText.split('').map(function(char) {
                    if (Math.random() > 0.5) {
                        return char;
                    } else {
                        return String.fromCharCode(33 + Math.floor(Math.random() * 94));
                    }
                }).join('');
                
                heroTitle.textContent = glitchText;
                
                setTimeout(function() {
                    heroTitle.textContent = originalText;
                }, 50);
            }
        }, 100);
    }
    
    // ===== PARALLAX EFFECT =====
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero-section');
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
            hero.style.opacity = 1 - (scrolled / 500);
        }
    });
    
    // ===== CURSOR PARTICLES =====
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.85) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'rgba(255, 0, 51, 0.6)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.left = e.clientX + 'px';
            particle.style.top = e.clientY + 'px';
            particle.style.transition = 'opacity 0.5s ease';
            
            document.body.appendChild(particle);
            
            setTimeout(function() {
                particle.style.opacity = '0';
                setTimeout(function() {
                    particle.remove();
                }, 500);
            }, 50);
        }
    });
    
    console.log('🔥 All systems ready!');
});
