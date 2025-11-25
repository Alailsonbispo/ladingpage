// script.js - LÍRIC'S & CODE'S v2.0
// Status: OTIMIZADO COM CORREÇÕES CRÍTICAS

document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('🎤 Líric\'s & Code\'s - Iniciando...');

        // ----------------------------------------------------------------
        // 1. DEBOUNCE FUNCTION - PERFORMANCE NO SCROLL
        // ----------------------------------------------------------------
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

        // ----------------------------------------------------------------
        // 2. HEADER DINÂMICO (Otimizado com Debounce)
        // ----------------------------------------------------------------
        const header = document.querySelector('.header');
        
        function handleHeaderScroll() {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
        
        window.addEventListener('scroll', debounce(handleHeaderScroll, 100));

        // ----------------------------------------------------------------
        // 3. LAZY LOADING DE VÍDEOS (Correção Crítica)
        // ----------------------------------------------------------------
        function loadLazyVideos(container) {
            const lazyVideos = container.querySelectorAll('.lazy-video');
            
            lazyVideos.forEach(iframe => {
                const src = iframe.getAttribute('data-src');
                if (src && !iframe.src) {
                    console.log('📹 Carregando vídeo:', src);
                    iframe.src = src; // ✅ CORREÇÃO: usa .src em vez de setAttribute
                    iframe.removeAttribute('data-src');
                    
                    // Dispara evento para player do Vimeo
                    iframe.onload = () => {
                        console.log('✅ Vídeo carregado com sucesso');
                    };
                }
            });
        }

        // ----------------------------------------------------------------
        // 4. REVEAL ON SCROLL + LAZY LOADING
        // ----------------------------------------------------------------
        const sections = document.querySelectorAll('.content-section');

        const observerOptions = {
            root: null,
            threshold: 0.15, // Mais sensível
            rootMargin: '0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('🎯 Seção visível:', entry.target.id);
                    
                    // 1. REVEAL ANIMATION
                    entry.target.classList.add('reveal');

                    // 2. LAZY LOAD VÍDEOS (apenas para seção de vídeos)
                    if (entry.target.id === 'videos') {
                        loadLazyVideos(entry.target);
                    }

                    // 3. PARA DE OBSERVAR (performance)
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Inicia observação de todas as seções
        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        // ----------------------------------------------------------------
        // 5. TYPEWRITER EFFECT (Melhorado com Error Handling)
        // ----------------------------------------------------------------
        function initTypeWriter() {
            const titleElement = document.getElementById('hero-title');
            
            // Fail safe - se elemento não existe
            if (!titleElement) {
                console.warn('❌ Elemento hero-title não encontrado');
                return;
            }

            const textToType = "ESTE É O MEU MUNDO.";
            const typingSpeed = 100;
            const startDelay = 800; // Delay maior para página carregar

            function typeWriter(text, i, callback) {
                if (i < text.length) {
                    // Adiciona caractere + cursor
                    titleElement.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
                    
                    setTimeout(() => {
                        typeWriter(text, i + 1, callback);
                    }, typingSpeed);
                } 
                else if (typeof callback === 'function') {
                    // DIGITAÇÃO COMPLETA
                    titleElement.innerHTML = text;
                    titleElement.classList.add('typed-complete');
                    console.log('✅ Typewriter completo');
                    
                    setTimeout(callback, 1000);
                }
            }

            // Inicia com delay para melhor UX
            setTimeout(() => {
                typeWriter(textToType, 0, () => {
                    // Callback opcional após conclusão
                    console.log('🎉 Animação de digitação finalizada');
                });
            }, startDelay);
        }

        // Inicia Typewriter
        initTypeWriter();

        // ----------------------------------------------------------------
        // 6. SMOOTH SCROLL PARA LINKS INTERNOS
        // ----------------------------------------------------------------
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    console.log('🔍 Scroll para:', targetId);
                }
            });
        });

        // ----------------------------------------------------------------
        // 7. KEYBOARD SHORTCUTS (Feature Extra)
        // ----------------------------------------------------------------
        document.addEventListener('keydown', (e) => {
            // M - Música
            if (e.key === 'm' || e.key === 'M') {
                e.preventDefault();
                document.querySelector('#music').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
            // V - Vídeos
            if (e.key === 'v' || e.key === 'V') {
                e.preventDefault();
                document.querySelector('#videos').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });

        console.log('🚀 Líric\'s & Code\'s - Inicializado com sucesso!');

    } catch (error) {
        console.error('💥 Erro crítico no script:', error);
        
        // FALLBACK: Garante que o conteúdo seja visível mesmo com JS quebrado
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'none';
        });
        
        // Fallback para vídeos
        document.querySelectorAll('.lazy-video').forEach(iframe => {
            const src = iframe.getAttribute('data-src');
            if (src) {
                iframe.src = src;
            }
        });
    }
});

// ----------------------------------------------------------------
// 8. LOADING STATES (Feedback visual)
// ----------------------------------------------------------------
window.addEventListener('load', () => {
    console.log('📄 Página totalmente carregada');
    
    // Remove possível estado de loading
    document.body.classList.add('loaded');
});

// ----------------------------------------------------------------
// 9. PERFORMANCE MONITORING (Opcional)
// ----------------------------------------------------------------
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Performance: Carregamento em ${loadTime}ms`);
        }, 0);
    });
}