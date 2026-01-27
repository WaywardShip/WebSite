window.addEventListener('DOMContentLoaded', function() {
    console.log('Wayward Ship - Site loaded');
    
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
            var pageId = this.getAttribute('data-page');
            switchPage(pageId);
        });
    });
    
    var platformModal = document.getElementById('platformModal');
    var platformButtons = document.querySelectorAll('.platform-btn');
    var modalChoices = document.querySelectorAll('.modal-btn[data-choice]');
    var currentQuery = '';
    
    platformButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentQuery = this.getAttribute('data-query');
            
            var pref = localStorage.getItem('musicPlatform');
            if (pref) {
                openPlatform(pref, currentQuery);
            } else {
                platformModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    modalChoices.forEach(function(choice) {
        choice.addEventListener('click', function() {
            var platform = this.getAttribute('data-choice');
            localStorage.setItem('musicPlatform', platform);
            openPlatform(platform, currentQuery);
            platformModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    function openPlatform(platform, query) {
        var url = '';
        if (platform === 'spotify') {
            url = 'https://open.spotify.com/search/' + encodeURIComponent(query);
        } else if (platform === 'deezer') {
            url = 'https://www.deezer.com/search/' + encodeURIComponent(query);
        }
        if (url) {
            window.open(url, '_blank');
        }
    }
    
    var modals = document.querySelectorAll('.modal');
    var closeButtons = document.querySelectorAll('.modal-close');
    var legalLinks = document.querySelectorAll('.legal-link[data-modal]');
    
    legalLinks.forEach(function(link) {
        link.addEventListener('click', function() {
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
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(function(modal) {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
    
    var setlistItems = document.querySelectorAll('.setlist-item');
    
    setlistItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            var number = this.querySelector('.setlist-number');
            if (number) {
                number.style.color = 'var(--color-primary)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            var number = this.querySelector('.setlist-number');
            if (number) {
                number.style.color = 'var(--color-text-dim)';
            }
        });
    });
    
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
    
    window.addEventListener('scroll', function() {
        var hero = document.querySelector('.hero-section');
        if (hero) {
            var scrolled = window.pageYOffset;
            hero.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
            hero.style.opacity = 1 - (scrolled / 500);
        }
    });
    
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
    
    console.log('All systems ready!');
});
