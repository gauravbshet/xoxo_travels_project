/* Global UI behaviors: mobile menu, active nav, form handlers, toast, basic booking state */
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-page');

    // Mobile menu
    const toggle = document.querySelector('.mobile-toggle');
    const mobile = document.querySelector('.mobile-menu');
    const close = document.querySelector('.mobile-menu-close');
    if (toggle && mobile) {
        toggle.addEventListener('click', () => mobile.classList.toggle('active'));
    }
    if (close) {
        close.addEventListener('click', () => mobile.classList.remove('active'));
    }

    // Highlight active navigation link
    (function highlightActiveNav() {
        const links = document.querySelectorAll('.nav-links a');
        const current = window.location.pathname.split('/').pop() || 'index.html';
        links.forEach(a => {
            const href = (a.getAttribute('href') || '').split('/').pop();
            if (!href) return;
            if (href === current) a.classList.add('active');
        });
    })();

    // Simple toast helper
    function createToast() {
        let t = document.querySelector('.xoxo-toast');
        if (t) return t;
        t = document.createElement('div');
        t.className = 'xoxo-toast';
        document.body.appendChild(t);
        return t;
    }
    function showToast(msg, timeout = 2500) {
        const t = createToast();
        t.textContent = msg;
        t.classList.add('show');
        clearTimeout(t._timer);
        t._timer = setTimeout(() => t.classList.remove('show'), timeout);
    }

    // Load user state and update header/dashboard
    (function restoreUser() {
        try {
            const user = JSON.parse(localStorage.getItem('xoxo_user') || 'null');
            if (user && user.name) {
                const signIn = document.querySelector('.nav-actions .btn-secondary');
                if (signIn) {
                    signIn.textContent = `Hi, ${user.name.split(' ')[0]}`;
                    signIn.href = '#';
                }
                // Update dashboard greeting if present
                const heading = document.querySelector('.section-heading');
                if (heading && /welcome back/i.test(heading.textContent)) {
                    heading.textContent = `Welcome back, ${user.name.split(' ')[0]}. Your next journey is ready.`;
                }
            }
        } catch (e) { /* ignore JSON errors */ }
    })();

    // Booking/search form handlers - store last search in localStorage
    document.querySelectorAll('.booking-search').forEach(form => {
        const btn = form.querySelector('button[type="button"]');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const fields = form.querySelectorAll('input, select, textarea');
            const data = {};
            fields.forEach(f => {
                if (f.type === 'button') return;
                if (f.type === 'checkbox') data[f.name || f.placeholder || 'checkbox'] = f.checked;
                else data[f.name || f.placeholder || f.previousElementSibling?.textContent?.trim() || 'field'] = f.value;
            });
            localStorage.setItem('xoxo_last_search', JSON.stringify(data));
            showToast('Saved search — mock results are shown locally');
        });
    });

    // Payment page handler: simulate payment, save confirmation, redirect to confirmation page
    if (document.title && /payment/i.test(document.title)) {
        const pay = document.querySelector('.btn-primary');
        if (pay) {
            pay.addEventListener('click', () => {
                const ref = `XOXO-${Date.now().toString().slice(-6)}`;
                const confirmation = {
                    ref,
                    date: new Date().toLocaleDateString(),
                    service: document.querySelector('input[readonly]')?.value || 'Luxury booking',
                };
                localStorage.setItem('xoxo_last_confirmation', JSON.stringify(confirmation));
                showToast('Payment processed — redirecting...');
                setTimeout(() => window.location.href = '../booking/confirmation.html', 900);
            });
        }
    }

    // Confirmation page: hydrate with last confirmation data
    if (document.title && /confirmation/i.test(document.title)) {
        try {
            const c = JSON.parse(localStorage.getItem('xoxo_last_confirmation') || 'null');
            if (c) {
                const refInput = document.querySelector('input[value="XOXO-987654"]') || document.querySelector('input[readonly]');
                if (refInput) refInput.value = c.ref || refInput.value;
                const dateInput = document.querySelector('input[value="April 28, 2026"]') || document.querySelector('input[readonly]');
                if (dateInput) dateInput.value = c.date || dateInput.value;
            }
        } catch (e) { }
    }

    // Contact form handler
    if (document.title && /contact/i.test(document.title)) {
        const send = document.querySelector('.btn-primary');
        if (send) send.addEventListener('click', () => showToast('Message sent. Our concierge will reply shortly.'));
    }

    // Seat selection storage helper (works with existing .seat elements)
    document.addEventListener('click', (e) => {
        const seat = e.target.closest('.seat');
        if (!seat) return;
        seat.classList.toggle('selected');
        const selected = Array.from(document.querySelectorAll('.seat.selected')).map(s => s.textContent.trim());
        localStorage.setItem('xoxo_selected_seats', JSON.stringify(selected));
        showToast(`${selected.length} seat(s) selected`);
    });
});
