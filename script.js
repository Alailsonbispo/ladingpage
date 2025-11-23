document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------
    // 1. REVEAL ON SCROLL & LAZY LOADING DE MÍDIA
    // ----------------------------------------------------------------

    const sections = document.querySelectorAll('.content-section');

    const observerOptions = {
        root: null, // usa a viewport como root
        threshold: 0.2, // 20% da seção deve estar visível
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. REVEAL: Adiciona a classe 'reveal' que dispara a transição CSS
                entry.target.classList.add('reveal');

                // 2. LAZY LOADING: Verifica se a seção tem mídia para carregar
                const lazyVideos = entry.target.querySelectorAll('.lazy-video');
                
                lazyVideos.forEach(video => {
                    const src = video.getAttribute('data-src');
                    if (src) {
                        video.setAttribute('src', src); // Move o data-src para src
                        video.removeAttribute('data-src'); // Remove o atributo para limpeza
                    }
                });

                // Para de observar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa todas as seções
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ----------------------------------------------------------------
    // 2. HEADER DINÂMICO (Encolhe e Adiciona Sombra ao Rolar)
    // ----------------------------------------------------------------

    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        // Adiciona/remove a classe 'scrolled' dependendo da posição de rolagem
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ----------------------------------------------------------------
    // 3. TYPEWRITER EFFECT (Efeito Máquina de Escrever no Título)
    // ----------------------------------------------------------------

    const titleElement = document.getElementById('hero-title');
    // A string que será escrita no H2
    const textToType = "ESTE É O MEU MUNDO."; 
    const typingSpeed = 100; // Velocidade em milissegundos por letra

    function typeWriter(text, i, fnCallback) {
        // Se ainda houver caracteres para escrever
        if (i < text.length) {
            // Adiciona o próximo caractere e o cursor
            titleElement.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';

            // Chama a função novamente após o tempo definido
            setTimeout(function() {
                typeWriter(text, i + 1, fnCallback)
            }, typingSpeed);
        } 
        // Quando terminar
        else if (fnCallback) {
            // Remove o cursor padrão e adiciona o cursor final (que o CSS estiliza)
            titleElement.innerHTML = text + '<span class="cursor typed-end"></span>';
            // Chama a função de callback após 1 segundo
            setTimeout(fnCallback, 1000); 
        }
    }

    // Inicia o efeito Typewriter quando a página carrega
    if (titleElement) {
        typeWriter(textToType, 0, function() {
            // Callback: garante que o cursor final fique ativo
        });
    }

});