window.addEventListener('load', () => {
    const animated = document.querySelectorAll('.fade-in');
    animated.forEach((node, index) => {
        node.style.animationDelay = `${index * 0.12}s`;
    });
});
