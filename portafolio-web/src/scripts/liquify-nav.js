// scripts/liquify-nav.js
(() => {
    const nav = document.querySelector('.bubbles-home');
    if (!nav) return;

    const bubbles = Array.from(nav.children);
    // Capturamos el logo una sola vez para usarlo en el hover
    const logo = document.querySelector('.logo-header');

    bubbles.forEach((btn, i) => {
        // --- EXISTING CLICK LOGIC (Se mantiene sin cambios) ---
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const url = this.href;

            /* 1) Efecto líquido en el botón */
            this.classList.add('liquify');

            /* 2) Empuja vecinos (onda) */
            const prev = bubbles[i - 1];
            const next = bubbles[i + 1];
            // Aseguramos que los efectos de hover sean anulados temporalmente
            prev && prev.style.setProperty('--moveX', '-35px');
            next && next.style.setProperty('--moveX', '35px');

            /* 3) 🔮 LIQUID-PORTAL LOGO (solo al clic) */
            if (logo) {
                logo.classList.add('liquify-portal');   // brillo + gotas
                setTimeout(() => logo.classList.add('portal-out'), 400); // diluye
            }

            /* 4) Absorción final y redirección */
            this.style.animation = 'absorb 0.6s forwards';
            this.addEventListener('animationend', () => {
                window.location.href = url;
            }, { once: true });
        });

        // --- NUEVA LÓGICA HOVER (Efecto de Campo de Fuerza/Material You) ---
        btn.addEventListener('mouseover', function () {
            // 1. Atenúa y encoge las burbujas que NO están siendo sobrevoladas
            bubbles.forEach((otherBtn, j) => {
                if (i !== j) {
                    otherBtn.style.transform = 'scale(0.9)'; // Encoge ligeramente
                    otherBtn.style.opacity = '0.7';          // Atenúa
                }
            });

            // 2. El logo reacciona con un brillo sutil
            if (logo) {
                logo.classList.add('logo-glow');
            }
        });

        btn.addEventListener('mouseout', function () {
            // 1. Restablece la escala y opacidad de TODAS las burbujas
            bubbles.forEach(otherBtn => {
                otherBtn.style.transform = '';
                otherBtn.style.opacity = '';
            });

            // 2. Remueve el brillo del logo
            if (logo) {
                logo.classList.remove('logo-glow');
            }
        });
        // --- FIN NUEVA LÓGICA HOVER ---

    });
})();

// Lógica de decoraciones para Home, encapsulada y protegida: (se mantiene sin cambios)
(() => {
    /* ---------- LUCIÉRNAGAS HOME (instantáneas + 3 tamaños) ---------- */
    if (document.body.classList.contains('home')) {
        const sizes = [2, 3, 5]; // px
        const qty = 18;

        const container = document.createElement('div');
        container.className = 'fireflies';

        for (let i = 0; i < qty; i++) {
            const fly = document.createElement('div');
            fly.className = 'firefly';
            fly.style.left = `${Math.random() * 100}%`;
            fly.style.animationDelay = `${Math.random() * 1}s`; // 0-1s max
            fly.style.animationDuration = `${6 + Math.random() * 4}s`;
            fly.style.width = `${sizes[Math.floor(Math.random() * sizes.length)]}px`;
            fly.style.height = fly.style.width;
            container.appendChild(fly);
        }
        document.body.appendChild(container);

        /* ---------- HAZ DE LUZ FULL-WIDTH ---------- */
        const beam = document.createElement('div');
        beam.className = 'light-beam';
        document.body.appendChild(beam);
    }
})();