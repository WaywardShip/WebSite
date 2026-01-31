window.addEventListener('DOMContentLoaded', function() {
    console.log('Wayward Ship - Site loaded');
    
    // ===== SOUND EFFECTS =====
    var clickSound = new Audio('clique.mp3');
    clickSound.volume = 0.3;

    var sounds = {
        click: function() {
            clickSound.currentTime = 0;
            clickSound.play().catch(function(e) { console.log('Audio play failed:', e); });
        },
        hover: function() {
            // Light click sound for hover
            var hoverSound = clickSound.cloneNode();
            hoverSound.volume = 0.1;
            hoverSound.currentTime = 0;
            hoverSound.play().catch(function(e) {});
        }
    };

    // ===== AMBIENT MUSIC (AUTOPLAY) =====
    var ambientAudio = new Audio('fond.mp3');
    ambientAudio.loop = true;
    ambientAudio.volume = 0.3;
    var isPlaying = false;

    // Auto-démarrage de la musique
    setTimeout(function() {
        ambientAudio.play().then(function() {
            isPlaying = true;
            var audioBtn = document.getElementById('audioToggle');
            if (audioBtn) audioBtn.classList.add('playing');
        }).catch(function(e) {
            console.log('Autoplay failed (browser policy):', e);
            // Si l'autoplay échoue, on attend le premier clic
            var firstClick = function() {
                if (!isPlaying) {
                    ambientAudio.play().then(function() {
                        isPlaying = true;
                        var audioBtn = document.getElementById('audioToggle');
                        if (audioBtn) audioBtn.classList.add('playing');
                    }).catch(function(err) { console.log('Audio play failed:', err); });
                }
                document.removeEventListener('click', firstClick);
            };
            document.addEventListener('click', firstClick);
        });
    }, 500);

    var audioToggle = document.getElementById('audioToggle');
    if (audioToggle) {
        audioToggle.addEventListener('click', function() {
            sounds.click();
            if (isPlaying) {
                ambientAudio.pause();
                isPlaying = false;
                this.classList.remove('playing');
            } else {
                ambientAudio.play().catch(function(e) { console.log('Audio play failed:', e); });
                isPlaying = true;
                this.classList.add('playing');
            }
        });
        
        audioToggle.addEventListener('mouseenter', function() {
            sounds.hover();
        });
    }

    // ===== NAVIGATION =====
    var navButtons = document.querySelectorAll('.nav-btn');
    var pages = document.querySelectorAll('.page');
    
    function switchPage(pageId) {
        pages.forEach(function(page) {
            page.classList.remove('active');
        });
        
        navButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });
        
        var targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        var targetBtn = document.querySelector('[data-page="' + pageId + '"]');
        if (targetBtn) {
            targetBtn.classList.add('active');
        }
        
        window.scrollTo(0, 0);
    }
    
    navButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            sounds.click();
            var pageId = this.getAttribute('data-page');
            switchPage(pageId);
        });
    });
    
    // ===== PLATFORM BUTTONS - DIRECT LINKS =====
    var platformButtons = document.querySelectorAll('.platform-btn');
    
    platformButtons.forEach(function(btn, index) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            sounds.click();
            
            var query = this.getAttribute('data-query');
            var url = '';
            
            // Détecter par le SVG - Spotify a un path avec "17.34", Deezer a des rect
            var svg = this.querySelector('svg');
            var hasPath = svg.querySelector('path');
            var hasRect = svg.querySelector('rect');
            
            if (hasPath && !hasRect) {
                // Spotify
                url = 'https://open.spotify.com/search/' + encodeURIComponent(query);
            } else if (hasRect) {
                // Deezer
                url = 'https://www.deezer.com/search/' + encodeURIComponent(query);
            }
            
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
    
    // ===== CALENDAR FUNCTIONALITY =====
    var calendarButtons = document.querySelectorAll('.calendar-btn');
    
    calendarButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            sounds.click();
            var title = this.getAttribute('data-title');
            var location = this.getAttribute('data-location');
            var startDate = this.getAttribute('data-start');
            var endDate = this.getAttribute('data-end');
            
            // Create ICS file content
            var icsContent = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'PRODID:-//Wayward Ship//Concert//FR',
                'BEGIN:VEVENT',
                'UID:' + Date.now() + '@waywardship.com',
                'DTSTAMP:' + formatICSDate(new Date()),
                'DTSTART:' + formatICSDate(new Date(startDate)),
                'DTEND:' + formatICSDate(new Date(endDate)),
                'SUMMARY:' + title,
                'LOCATION:' + location,
                'DESCRIPTION:Concert de Wayward Ship',
                'STATUS:CONFIRMED',
                'BEGIN:VALARM',
                'TRIGGER:-PT2H',
                'ACTION:DISPLAY',
                'DESCRIPTION:Rappel: Concert dans 2 heures',
                'END:VALARM',
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\r\n');
            
            // Download ICS file
            var blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'wayward-ship-concert.ics';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
    
    function formatICSDate(date) {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }
    
    // ===== LEGAL MODALS =====
    var modals = document.querySelectorAll('.modal');
    var closeButtons = document.querySelectorAll('.modal-close');
    var legalLinks = document.querySelectorAll('.legal-link[data-modal]');
    
    legalLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            sounds.click();
            var modalId = this.getAttribute('data-modal');
            if (modalId === 'terms') {
                document.getElementById('termsModal').classList.add('active');
            } else if (modalId === 'privacy') {
                document.getElementById('privacyModal').classList.add('active');
            }
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            sounds.click();
            var modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    modals.forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                sounds.click();
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            sounds.click();
            modals.forEach(function(modal) {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
    
    // ===== SETLIST INTERACTIONS (HOVER SOUND) =====
    var setlistItems = document.querySelectorAll('.setlist-item');
    
    setlistItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            sounds.hover();
            var number = this.querySelector('.setlist-number');
            if (number) {
                number.style.color = 'var(--color-primary)';
                number.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            var number = this.querySelector('.setlist-number');
            if (number) {
                number.style.color = 'var(--color-text-dim)';
                number.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // ===== CONCERT CARDS HOVER SOUND (only when not "aucune date") =====
    var concertCards = document.querySelectorAll('.concert-card');
    concertCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            sounds.hover();
        });
    });
    
    // ===== SOCIAL LINKS SOUND =====
    var socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            sounds.click();
        });
    });
    
    // ===== TICKET BUTTONS SOUND =====
    var ticketButtons = document.querySelectorAll('.ticket-btn');
    ticketButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            sounds.click();
        });
    });
    
    // ===== CONTACT EMAIL SOUND =====
    var contactEmail = document.querySelector('.contact-email');
    if (contactEmail) {
        contactEmail.addEventListener('click', function() {
            sounds.click();
        });
    }
    
    // ===== GLITCH EFFECT =====
    var heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        var originalText = heroTitle.textContent;
        
        setInterval(function() {
            if (Math.random() > 0.95) {
                var glitchText = originalText.split('').map(function(char) {
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
    
    // ===== PARALLAX HERO =====
    window.addEventListener('scroll', function() {
        var hero = document.querySelector('.hero-section');
        if (hero) {
            var scrolled = window.pageYOffset;
            hero.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
            hero.style.opacity = 1 - (scrolled / 500);
        }
    });
    
    // ===== CURSOR TRAIL PARTICLES =====
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.85) {
            var particle = document.createElement('div');
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
    
    // ===== RANDOM SCREEN SHAKE ON LOGO CLICK =====
    var logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.addEventListener('click', function() {
            sounds.click();
            document.body.style.animation = 'shake 0.5s';
            setTimeout(function() {
                document.body.style.animation = '';
            }, 500);
        });
    }
    
    // Add shake animation to CSS
    var style = document.createElement('style');
    style.textContent = '\
        @keyframes shake {\
            0%, 100% { transform: translateX(0); }\
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }\
            20%, 40%, 60%, 80% { transform: translateX(5px); }\
        }\
    ';
    document.head.appendChild(style);
    
    console.log('All systems ready! 🤘');
});
