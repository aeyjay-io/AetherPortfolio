let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Honor global capability flag - if disabled, we'll fall back to a minimal cursor
const advancedCursorEnabled = () =>
    window.__enableAdvancedEffects !== false &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateCursorFallback(){
    if (!advancedCursorEnabled()) {
        if (ring) ring.style.display = 'none';
        if (glow) glow.style.display = 'none';
        if (label) label.style.display = 'none';
    }
}

window.addEventListener('advanced-effects-change', updateCursorFallback);


// PERFORMANCE NOTE:
// This cursor now positions dot/ring/glow purely via `transform`
// (translate3d), never `left`/`top`. left/top are layout-triggering
// properties — changing them every animation frame forces the browser
// to re-run layout + repaint, which is extremely expensive next to
// backdrop-filter/blur layers (like the project preview window).
// transform is compositor-only (GPU), so it stays smooth regardless
// of how many blurred glass panels are nearby.
// Requires .cursor-dot / .cursor-ring / .cursor-glow to be
// `position:fixed; top:0; left:0;` in CSS (no separate CSS transform
// on them) — this JS supplies the full transform, including centering.

let ringX = mouseX;
let ringY = mouseY;

let glowX = mouseX;
let glowY = mouseY;

// ======================================
// CURSOR VELOCITY
// ======================================

let previousX = mouseX;
let previousY = mouseY;

let velocityX = 0;
let velocityY = 0;

const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
const glow = document.querySelector(".cursor-glow");
const label = document.querySelector(".cursor-label");

// If advanced cursor is not enabled, hide heavy parts and use only the dot
updateCursorFallback();


// ======================================
// SHORT REFERENCES
// ======================================

const cursorDot = dot;
const cursorRing = ring;
const cursorGlow = glow;

let cursorAnimationFrame = null;
let cursorActive = false;

// Loader mouse movement is recorded without rendering. Once the loader is
// gone, the cursor can appear at the real pointer position instead of briefly
// flashing at its default centre position.
window.addEventListener("site-loaded", () => {
    ringX = mouseX;
    ringY = mouseY;
    glowX = mouseX;
    glowY = mouseY;
    previousX = mouseX;
    previousY = mouseY;

    if (dot) dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%,-50%)`;
    if (ring) ring.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%,-50%)`;
    if (glow) glow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%,-50%)`;
});

window.addEventListener(
    "mousemove",
    (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        // Keep the cursor effect completely dormant while the page loader is
        // visible.  Besides preventing it from appearing over the loader,
        // this avoids starting its animation frame work during the critical
        // loading/reveal sequence.
        if (!document.body.classList.contains("site-loaded")) return;

        if (!cursorActive) {

            cursorActive = true;

            cursorAnimationFrame =
                requestAnimationFrame(
                    animateCursor
                );

        }

    },
    {
        passive: true
    }
);

function animateCursor(){

    // If advanced cursor disabled, only update the dot and do minimal math
    if (!advancedCursorEnabled()) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%,-50%)`;
        cursorAnimationFrame = requestAnimationFrame(animateCursor);
        return;
    }

    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    glowX += (mouseX - glowX) * 0.10;
    glowY += (mouseY - glowY) * 0.10;

    // CURSOR VELOCITY
    velocityX = ringX - previousX;
    velocityY = ringY - previousY;
    previousX = ringX;
    previousY = ringY;

    // Use an approximated length to avoid sqrt when possible (micro-optimization)
    const absVX = Math.abs(velocityX), absVY = Math.abs(velocityY);
    const approxVel = Math.max(absVX, absVY) + 0.5 * Math.min(absVX, absVY);
    const velocity = Math.min(approxVel, 30);

    const angle = Math.atan2(velocityY, velocityX);
    const stretch = velocity * 0.018;

    // CURSOR POSITION (compositor-only)
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%,-50%)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%,-50%) rotate(${angle}rad) scale(${1 + stretch}, ${1 - stretch * 0.45})`;
    glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%,-50%)`;

    const ringDistance = Math.abs(mouseX - ringX) + Math.abs(mouseY - ringY);
    const glowDistance = Math.abs(mouseX - glowX) + Math.abs(mouseY - glowY);

    if (ringDistance > 0.1 || glowDistance > 0.1) {
        cursorAnimationFrame = requestAnimationFrame(animateCursor);
    } else {
        cursorActive = false;
        cursorAnimationFrame = null;
    }

}

// ======================================
// SMART CURSOR STATES
// ======================================

const interactiveElements = document.querySelectorAll(`
a,
button,
.primary-btn,
.secondary-btn,
.project-tab,
.floating-nav-btn,
.preview-open-btn,
.resume-toolbar button,
input,
textarea,
.project-card,
.featured-project
`);

interactiveElements.forEach(el=>{

el.addEventListener("mouseenter",()=>{

ring.classList.remove("show-label");

label.textContent = "";

cursorRing.classList.remove(
"cursor-button",
"cursor-card",
"cursor-image",
"cursor-text"
);

if(

el.matches(
".primary-btn,.secondary-btn,.floating-nav-btn,.project-tab,.preview-open-btn"
)

){

ring.classList.add(
"cursor-button",
"show-label"
);

label.textContent="VIEW";

cursorDot.classList.add("cursor-button");

}

else if(

el.matches(
".glass,.stats__card,.featured-project,.hero__card,.contact-card"
)

){

cursorRing.classList.add("cursor-card");

}

else if(

el.matches("img,.preview-image")

){

cursorRing.classList.add("cursor-image");

}

else if(

el.matches("p,h1,h2,h3,h4,span,a")

){

cursorRing.classList.add("cursor-text");

}

});

el.addEventListener("mouseleave",()=>{

cursorRing.classList.remove(
"cursor-button",
"cursor-card",
"cursor-image",
"cursor-text"
);

ring.classList.remove("show-label");

label.textContent="";

cursorDot.classList.remove("cursor-button");

});

});

// ======================================
// PREMIUM MAGNETIC CURSOR
// ======================================

const magneticElements = document.querySelectorAll(`
.primary-btn,
.secondary-btn,
.project-tab,
.floating-nav-btn,
.preview-open-btn,
.resume-toolbar button
`);

magneticElements.forEach(el=>{

    el.addEventListener("mousemove",(e)=>{

        const rect = el.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;

        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform =
        `
        translate(${x * .18}px, ${y * .18}px)
        scale(1.05)
        `;

    });

    el.addEventListener("mouseleave",()=>{

        el.style.transform =
        `
        translate(0px,0px)
        scale(1)
        `;

    });

});
