document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dashboard-action').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.textContent = 'Viewed';
            btn.disabled = true;
        });
    });
});
