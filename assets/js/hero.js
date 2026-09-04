// ======================================
// HERO ENTRANCE CHOREOGRAPHY
// ======================================

function revealHeroItems() {
    const heroItems = Array.from(
        document.querySelectorAll(".hero-item:not(.hero-card-enter)")
    );
    const heroCard = document.querySelector(".hero-card-enter");

    heroItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add("show");
        }, index * 180);
    });

    if (heroCard) {
        setTimeout(() => {
            heroCard.classList.add("show");
        }, 320);
    }
}

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    revealHeroItems();
} else {
    document.addEventListener("DOMContentLoaded", revealHeroItems, { once: true });
}

// ======================================
// HERO PARALLAX ENGINE
// ======================================

const hero =
document.getElementById("hero");

const heroCard =
document.getElementById("hero-card");

if (hero && heroCard) {

    if (window.__enableAdvancedEffects) {
        let ticking = false;
        let heroRect = hero.getBoundingClientRect();

        function updateHeroRect() {
            heroRect = hero.getBoundingClientRect();
        }

        window.addEventListener("resize", updateHeroRect, { passive: true });

        hero.addEventListener("mousemove", (e) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const x = e.clientX - heroRect.left;
                    const y = e.clientY - heroRect.top;
                    const centerX = heroRect.width / 2;
                    const centerY = heroRect.height / 2;
                    const rotateY = (x - centerX) / 40;
                    const rotateX = -(y - centerY) / 40;

                    heroCard.style.setProperty("--rotateX", `${rotateX}deg`);
                    heroCard.style.setProperty("--rotateY", `${rotateY}deg`);

                    ticking = false;
                });
            }

            ticking = true;
        });

        hero.addEventListener("mouseleave", () => {
            heroCard.style.setProperty("--rotateX", "0deg");
            heroCard.style.setProperty("--rotateY", "0deg");
        });
    }

}



// ======================================
// PREMIUM HERO BUTTONS
// ======================================

const heroButtons =
document.querySelectorAll(
".hero__buttons a"
);

if (window.__enableAdvancedEffects) {
    heroButtons.forEach(button=>{

    let ticking = false;

    button.addEventListener("mousemove",(e)=>{

    if(!ticking){

    requestAnimationFrame(()=>{

    const rect=
    button.getBoundingClientRect();

    const x=
e.clientX-rect.left;

    const y=
e.clientY-rect.top;

    const moveX=
    (x-rect.width/2)/9;

    const moveY=
    (y-rect.height/2)/9;

    button.style.transform=
    `
    translate(${moveX}px,${moveY}px)
    scale(1.05)
    `;

    ticking = false;

    });

    ticking = true;

    }

    });

    button.addEventListener("mouseleave",()=>{

    button.style.transform=
    "translate(0,0) scale(1)";

    });

    });
}


// ======================================
// PREMIUM RESUME MODAL
// ======================================

const resumeModal =
    document.getElementById("resume-modal");

const openResume =
    document.getElementById("open-resume");

const closeResume =
    document.getElementById("close-resume");

if (resumeModal && openResume && closeResume) {

    openResume.addEventListener("click", (e) => {

        e.preventDefault();

        if (pdfFrame && !pdfFrame.src.length || pdfFrame?.src === "about:blank") {
            const resumeSrc = pdfFrame.dataset.src;
            if (resumeSrc) {
                pdfFrame.src = resumeSrc;
            }
        }

        resumeModal.classList.add("active");

        document.body.classList.add("resume-open");

    });

    closeResume.addEventListener("click", () => {

        resumeModal.classList.remove("active");

        document.body.classList.remove("resume-open");

    });

    resumeModal.addEventListener("click", (e) => {

        if (e.target === resumeModal) {

            resumeModal.classList.remove("active");

            document.body.classList.remove("resume-open");

        }

    });

}

// ======================================
// RESUME TOOLBAR
// ======================================

const pdfFrame =
    document.getElementById("resume-frame");

const printResume =
    document.getElementById("print-resume");

const fullscreenResume =
    document.getElementById("fullscreen-resume");

const zoomResume =
    document.getElementById("zoom-resume");

let zoom = 1;

if (zoomResume && pdfFrame) {

    zoomResume.addEventListener("click", () => {

        zoom += 0.1;

        pdfFrame.style.transform =
            `scale(${zoom})`;

        pdfFrame.style.transformOrigin =
            "top center";

    });

}

if (printResume) {

    printResume.addEventListener("click", () => {

        window.open(
            "assets/resume/AJ-Llanera-Resume.pdf"
        ).print();

    });

}

if (fullscreenResume && pdfFrame) {

    fullscreenResume.addEventListener("click", () => {

        if (pdfFrame.requestFullscreen) {

            pdfFrame.requestFullscreen();

        }

    });

}

// ======================================
// LAYERED PARALLAX ENGINE
// Optimized scroll-based parallax
// ======================================

const heroFloating =
    document.getElementById("hero-floating");

const heroParticles =
    document.getElementById("hero-particles");

const heroBlobs =
    document.getElementById("hero-blobs");

const heroGlows =
    document.getElementById("hero-glows");

let heroParallaxFrame = null;

function updateHeroParallax() {

    heroParallaxFrame = null;

    // Stop updating once the hero is completely
    // outside the viewport.
    if (
        !hero ||
        hero.getBoundingClientRect().bottom <= 0
    ) {
        return;
    }

    const scroll = window.scrollY;

    if (heroFloating) {

        heroFloating.style.transform =
            `translateY(${scroll * 0.10}px)`;

    }

    if (heroParticles) {

        heroParticles.style.transform =
            `translateY(${scroll * 0.18}px)`;

    }

    if (heroBlobs) {

        heroBlobs.style.transform =
            `translateY(${scroll * 0.28}px)`;

    }

    if (heroGlows) {

        heroGlows.style.transform =
            `translateY(${scroll * 0.40}px)`;

    }

}

window.addEventListener(
    "scroll",
    () => {

        if (heroParallaxFrame === null) {

            heroParallaxFrame =
                requestAnimationFrame(
                    updateHeroParallax
                );

        }

    },
    {
        passive: true
    }
);