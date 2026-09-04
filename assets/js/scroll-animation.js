// =========================
// Scroll Reveal Engine
// =========================

const STAGGER_STEP = 40; // ms delay between each item inside a group
const STAGGER_BASE_DELAY = 20;

// Containers whose own children should cascade in one after another
// (instead of all appearing together) once the container itself
// scrolls into view, or is already on screen when it gets rebuilt
// (e.g. switching projects).
const STAGGER_GROUP_SELECTOR =
    ".project-selector, .roadmap";

function staggerReveal(elements, baseDelay = STAGGER_BASE_DELAY){

    elements.forEach((element,index)=>{

        element.classList.remove("active");

        element.style.transitionDelay =
            `${baseDelay + index * STAGGER_STEP}ms`;

        requestAnimationFrame(()=>{

            element.classList.add("active");

        });

    });

}
function revealChildren(container){

   const children = container.querySelectorAll(".fade-item");

    if(!children.length){
        container.classList.add("active");
        return;
    }

    staggerReveal(children);

}

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        const el = entry.target;

if(entry.isIntersecting){

    if(!el.classList.contains("active")){

        if(el.matches(STAGGER_GROUP_SELECTOR)){

            revealChildren(el);

        }else{

            el.classList.add("active");

        }

    }

}

    });

},{
    threshold:0.05,
    rootMargin: "0px 0px -20% 0px"
});

// Scans for any .reveal / .fade-item / stagger-group element that isn't
// being watched yet and starts observing it. Safe to call again after
// new content is injected into the page - elements already on screen
// reveal immediately (staggered), elements still off-screen wait for
// the user to actually scroll to them, same as on first page load.
function initScrollReveal(root = document){

   const selector = `

.reveal,

.reveal-up,

.reveal-down,

.reveal-left,

.reveal-right,

.reveal-scale,

.fade-item,

${STAGGER_GROUP_SELECTOR}

`;
    root.querySelectorAll(selector).forEach(element => {

        if(element.dataset.revealBound) return;

        element.dataset.revealBound = "true";

        revealObserver.observe(element);

    });

}

// Expose globally so projects.js can re-scan after re-rendering
// dynamic content, and can directly cascade-reveal content that's
// already on screen (e.g. right after switching projects) without
// needing to wait for another scroll.
window.initScrollReveal = initScrollReveal;
window.staggerReveal = staggerReveal;

initScrollReveal();

// Smooth scrolling physics are disabled because the current stylesheet does not consume
// the generated CSS custom properties. Removing this unused loop improves Chrome/Edge
// responsiveness by avoiding extra requestAnimationFrame work and style updates.

