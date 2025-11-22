document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todas as seções que queremos animar
    const sections = document.querySelectorAll('.content-section');

    // Configurações do observador
    const options = {
        root: null, // viewport como root
        threshold: 0.2, // 20% da seção deve estar visível para disparar
        rootMargin: '0px'
    };

    // Callback que será executado quando a interseção ocorrer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se a seção está na viewport, adiciona a classe 'reveal'
                entry.target.classList.add('reveal');
                // Para de observar depois de animar (otimização)
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Começa a observar cada seção
    sections.forEach(section => {
        observer.observe(section);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------
    // 1. REVEAL ON SCROLL (CÓDIGO ANTERIOR)
    // ... [Seu código do Intersection Observer aqui] ...
    // ----------------------------------------------------------------

    // ----------------------------------------------------------------
    // 2. HEADER DINÂMICO (NOVO CÓDIGO)
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        // Se a posição da rolagem for maior que 50px, adiciona a classe 'scrolled'
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            // Caso contrário, remove a classe
            header.classList.remove('scrolled');
        }
    });
    // ----------------------------------------------------------------
});