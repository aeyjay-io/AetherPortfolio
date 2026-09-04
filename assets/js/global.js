// ======================================
// GLOBAL SECTION TRANSITION SYSTEM
// ======================================

// Phase 17.3

const sections =
    document.querySelectorAll("section");

const sectionObserver =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            const section = entry.target;

            if (entry.isIntersecting) {

                if (!section.classList.contains("section-visible")) {

                    section.classList.add("section-visible");

                    section.classList.remove(
                        "section-hidden",
                        "section-past"
                    );

                }

            } else {

                if (entry.boundingClientRect.top > 0) {

                    if (!section.classList.contains("section-hidden")) {

                        section.classList.add("section-hidden");

                        section.classList.remove(
                            "section-visible",
                            "section-past"
                        );

                    }

                } else {

                    if (!section.classList.contains("section-past")) {

                        section.classList.add("section-past");

                        section.classList.remove(
                            "section-hidden",
                            "section-visible"
                        );

                    }

                }

            }

        });

    },
    {
        threshold: 0.05,
        rootMargin: "0px 0px -20% 0px"
    }
);

sections.forEach(section => {

    section.classList.add("section-hidden");

    sectionObserver.observe(section);

});

// ======================================
// GLOBAL AMBIENT GLOW SYSTEM
// Phase 17.3
// ======================================

const glowSections =
    document.querySelectorAll("section[id]");

const glowObserver =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const nextClass =
                    `section-${entry.target.id}`;

                if (!document.body.classList.contains(nextClass)) {

                    document.body.classList.remove(
                        "section-hero",
                        "section-about",
                        "section-journey",
                        "section-skills",
                        "section-projects",
                        "section-contact"
                    );

                    document.body.classList.add(nextClass);

                }

                if (window.updateNavbarActiveLink) {

                    window.updateNavbarActiveLink(
                        entry.target.id
                    );

                }

            }

        });

    },
    {
        threshold: 0.35
    }
);

glowSections.forEach(section => {

    glowObserver.observe(section);

});

// ======================================
// NAVBAR SECTION HIGHLIGHTING
// ======================================

const navbarLinks =
    document.querySelectorAll(
        ".navbar__menu a"
    );

function updateNavbarActiveLink(sectionId) {

    navbarLinks.forEach(link => {

        const target =
            link.getAttribute("href")?.replace("#", "");

        if (target === sectionId) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

}

navbarLinks.forEach(link => {

    link.addEventListener("click", () => {

        const target =
            link.getAttribute("href")?.replace("#", "");

        if (target) {

            updateNavbarActiveLink(target);

        }

    });

});

window.updateNavbarActiveLink =
    updateNavbarActiveLink;

// Mark Home on load if no section active yet
if (!document.querySelector(".navbar__menu a.active")) {

    updateNavbarActiveLink("hero");

}

// ======================================
// GLOBAL AMBIENT LIGHT ENGINE
// ======================================

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

const body = document.body;
let ambientTicking = false;
let lastAmbientX = 0;
let lastAmbientY = 0;

// Capability detection: prefer advanced effects only on capable devices
const hwConcurrency = navigator.hardwareConcurrency || 4;
const deviceMemory = navigator.deviceMemory || 4;
let enableAdvancedEffects = !prefersReducedMotion && hwConcurrency >= 4 && deviceMemory >= 3;

// Expose flag to other scripts (cursor.js etc.)
window.__enableAdvancedEffects = enableAdvancedEffects;

if (prefersReducedMotion) {
    body.classList.add("reduced-motion");
}

if (!enableAdvancedEffects) {
    // Light-weight fallback: mark body so CSS can tone down heavy filters/animations
    body.classList.add("reduced-effects");
}

function detectRenderingPerformance(){
    if (prefersReducedMotion || !enableAdvancedEffects) return;

    const frameTimes = [];
    let lastTime = performance.now();

    function sampleFrame(now){
        const delta = now - lastTime;
        lastTime = now;
        frameTimes.push(delta);

        if (frameTimes.length >= 10) {
            const averageFrame = frameTimes.reduce((sum, value) => sum + value, 0) / frameTimes.length;
            const slowFrames = frameTimes.filter(value => value > 33).length;

            if (averageFrame > 24 || slowFrames >= 2) {
                body.classList.add("reduced-effects");
                enableAdvancedEffects = false;
                window.__enableAdvancedEffects = false;
                window.dispatchEvent(new Event("advanced-effects-change"));
            }

            return;
        }

        requestAnimationFrame(sampleFrame);
    }

    requestAnimationFrame(sampleFrame);
}

detectRenderingPerformance();

// Create ambient orb elements that move via transform (compositor-only)
(function createAmbientOrbs(){
    if (document.getElementById('ambient-orbs')) return;
    const container = document.createElement('div');
    container.id = 'ambient-orbs';
    container.setAttribute('aria-hidden','true');
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = -3;

    const orbCount = 3;
    for(let i=1;i<=orbCount;i++){
        const orb = document.createElement('div');
        orb.className = `ambient-orb orb-${i}`;
        container.appendChild(orb);
    }

    document.body.appendChild(container);
})();

// Ambient movement updates: use transform on the created elements instead of updating large background gradients
const ambientOrbs = document.querySelectorAll('.ambient-orb');

document.addEventListener('mousemove',(e)=>{
    if (prefersReducedMotion) return;

    // Throttle to one rAF
    if (!ambientTicking) {
        ambientTicking = true;
        requestAnimationFrame(()=>{
            const x = e.clientX;
            const y = e.clientY;

            // Use small movement deltas and per-orb multipliers for depth
            ambientOrbs.forEach((orb, idx) => {
                const depth = 0.06 + idx * 0.06; // 0.06, 0.12, 0.18
                const tx = (x - window.innerWidth/2) * depth;
                const ty = (y - window.innerHeight/2) * depth;
                orb.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
            });

            // Keep CSS vars for elements that still read them, but update infrequently
            if (Math.abs(x - lastAmbientX) > 8) {
                body.style.setProperty('--mouse-x', `${x}px`);
                lastAmbientX = x;
            }
            if (Math.abs(y - lastAmbientY) > 8) {
                body.style.setProperty('--mouse-y', `${y}px`);
                lastAmbientY = y;
            }

            ambientTicking = false;
        });
    }
}, { passive: true });
