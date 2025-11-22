document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------
    // 1. REVEAL ON SCROLL (Surgimento Suave de Seções)
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
                // Adiciona a classe 'reveal' que dispara a transição CSS
                entry.target.classList.add('reveal');
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
        // Se a posição da rolagem for maior que 50px, adiciona a classe 'scrolled'
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            // Caso contrário, remove a classe
            header.classList.remove('scrolled');
        }
    });

});