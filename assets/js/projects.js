const selector = document.getElementById("project-selector");
const prevBtn = document.getElementById("prev-project");
const nextBtn = document.getElementById("next-project");
const badge = document.getElementById("project-badge");
const browserTitle =
document.getElementById("browser-title");

const browserURL =
document.getElementById("browser-url");
const previewImage =
document.getElementById("project-preview-image");
const modal =
document.getElementById("case-study-modal");
const openCase =
document.getElementById("open-case-study");
const projectPrimaryButton =
document.getElementById("project-primary-btn");
const projectSecondaryButton =
document.getElementById("project-secondary-btn");
const sourceCodeModal =
document.getElementById("source-code-modal");
const closeSourceCode =
document.getElementById("close-source-code");
const closeCase =
document.getElementById("close-case-study");
const caseTitle =
document.getElementById("case-title");
const caseSubtitle =
document.getElementById("case-subtitle");
const caseImage =
document.getElementById("case-image");
const modalContent =
document.getElementById("case-content");
const galleryTitle =
document.getElementById("gallery-title");
const galleryDescription =
document.getElementById("gallery-description");
const progressBarsContainer =
document.getElementById("progress-bars");
const projectContainer = document.getElementById("project-container");
const loadingPlaceholder = document.getElementById("image-loading-placeholder");
let fadeItems =
document.querySelectorAll(".fade-item");



let currentProject = 0;
let currentGallery = 0;
let progressInterval = null;
let hasRenderedOnce = false;
let lastMouseX = -1;
let lastMouseY = -1;
let imageCache = {};

const title = document.getElementById("project-title");
const description = document.getElementById("project-description");
const stack = document.getElementById("project-stack");
const roadmap = document.getElementById("project-roadmap");
const roadmapTitle = document.getElementById("roadmap-title");
const roadmapDescription = document.getElementById("roadmap-description");
const projectCard = document.querySelector(".featured-project");
const completedSystemsCount = document.getElementById("completed-systems-count");

const projectYear =
document.getElementById("project-year");

const projectRole =
document.getElementById("project-role");

const projectDuration =
document.getElementById("project-duration");

const projectStatus =
document.getElementById("project-status");

const projectPlatform =
document.getElementById("project-platform");

function updateCompletedSystemsCount(){
    if (!completedSystemsCount || !Array.isArray(projects)) return;

    const projectCount = projects.length;
    completedSystemsCount.textContent = `${projectCount}+`;
}

// ======================================
// IMAGE PRELOADING & CACHING
// ======================================
function preloadProjectImages() {
    projects.forEach(project => {
        if (project.preview && project.preview.gallery) {
            project.preview.gallery.forEach((item, index) => {
                const imageUrl = item.image;
                if (!imageCache[imageUrl]) {
                    const img = new Image();
                    img.src = imageUrl;
                    imageCache[imageUrl] = img;
                }
            });
        }
    });
}

// Initialize preloading
preloadProjectImages();

function renderProject(index) {

    const project = projects[index];

    currentGallery = 0;

    badge.innerHTML = project.badge;
    // -------------------
    // TITLE
    // -------------------

    title.innerHTML = project.title;

    // -------------------
    // DESCRIPTION
    // -------------------

    description.innerHTML = project.description;

    browserTitle.innerHTML =
project.preview.browserTitle;

browserURL.innerHTML =
project.preview.url;

    // Preload and set first image
    const firstImage = project.preview.gallery[0].image;

    // Show loading placeholder
    if (loadingPlaceholder) {
        loadingPlaceholder.classList.add('active');
    }

    previewImage.onload = () => {
        if (loadingPlaceholder) {
            loadingPlaceholder.classList.remove('active');
        }
    };

    if (imageCache[firstImage]) {
        previewImage.src = firstImage;
        // Hide loading placeholder if cached
        if (loadingPlaceholder) {
            loadingPlaceholder.classList.remove('active');
        }
    } else {
        previewImage.src = firstImage;
        // Cache it for future use
        const img = new Image();
        img.src = firstImage;
        imageCache[firstImage] = img;
    }

projectYear.innerHTML =
project.details.year;

projectRole.innerHTML =
project.details.role;

projectDuration.innerHTML =
project.details.duration;

projectStatus.innerHTML =
project.details.status;

projectPlatform.innerHTML =
project.details.platform;
    // -------------------
    // STACK
    // -------------------

    stack.innerHTML = project.stack
        .map(skill => `<span>${skill}</span>`)
        .join("");

    // -------------------
    // ROADMAP TITLE
    // -------------------

    roadmapTitle.innerHTML = project.roadmapTitle;

    roadmapDescription.innerHTML = project.roadmapDescription;
    renderCaseStudy(project);

    currentGallery = 0;
    renderGallery(project);
    initProgressBars(project);
    // -------------------
    // ROADMAP ITEMS
    // -------------------

    roadmap.innerHTML = project.roadmap
        .map(item => `
            <div class="roadmap-item glass fade-item fade-left">
                <div class="roadmap-number">${item.number}</div>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `)
        .join("");

  

    if(window.initScrollReveal){
        window.initScrollReveal();
    }

    if(hasRenderedOnce && window.staggerReveal){
        window.staggerReveal(roadmap.querySelectorAll(".roadmap-item"));
    }

    fadeItems = document.querySelectorAll(".fade-item");
    playStaggerAnimation();

}

updateCompletedSystemsCount();
renderProject(currentProject);

hasRenderedOnce = true;
// ======================================
// PROJECT CURSOR LIGHT EFFECT
// Optimized mouse tracking
// ======================================

const project3D =
    document.getElementById("project-container");

if(project3D){

    let ticking = false;
    let projectRect = null;

    function updateProjectRect(){
        projectRect =
            project3D.getBoundingClientRect();
    }

    updateProjectRect();

    window.addEventListener(
        "resize",
        updateProjectRect,
        { passive:true }
    );

    project3D.addEventListener(
        "mousemove",
        // PERFORMANCE NOTE: --mouse-x/--mouse-y are now stored in px
        // and consumed via `transform` in projects.css (not top/left),
        // so this glow moves on the GPU compositor only — no layout
        // recalculation next to the preview window's blurred glass.
        (e)=>{

            if(ticking) return;

            ticking = true;

            requestAnimationFrame(()=>{

                if(!projectRect){
                    updateProjectRect();
                }

                const mouseX =
                    e.clientX - projectRect.left;

                const mouseY =
                    e.clientY - projectRect.top;
                if(
                     Math.abs(mouseX - lastMouseX) > 0.5 ||
                     Math.abs(mouseY - lastMouseY) > 0.5
                ){

                      project3D.style.setProperty(
                      "--mouse-x",
                      `${mouseX}px`
               );

                  project3D.style.setProperty(
                     "--mouse-y",
                    `${mouseY}px`
               );

    lastMouseX = mouseX;
    lastMouseY = mouseY;

}

                ticking = false;

            });

        },
        { passive:true }
    );

}

function renderSelector() {

    selector.innerHTML = "";

    projects.forEach((project, index) => {

        selector.innerHTML += `

        <button
            class="project-tab fade-item ${index === currentProject ? "active" : ""}"
            onclick="changeProject(${index})">

            ${project.title}

        </button>

        `;

    });

    if(window.initScrollReveal){
        window.initScrollReveal();
    }

    if(hasRenderedOnce && window.staggerReveal){
        window.staggerReveal(selector.querySelectorAll(".project-tab"));
    }

}

function changeProject(index){

    // Clear any existing timers to prevent conflicts
    clearInterval(progressInterval);

    projectContainer.classList.add("project-transition");

    setTimeout(() => {

        currentProject = index;

        renderProject(currentProject);

        renderSelector();

        projectContainer.classList.remove("project-transition");

    },450);

}

prevBtn.addEventListener("click", () => {

    currentProject--;

    if(currentProject < 0){

        currentProject = projects.length - 1;

    }

    changeProject(currentProject);

});

nextBtn.addEventListener("click", () => {

    currentProject++;

    if(currentProject >= projects.length){

        currentProject = 0;

    }

    changeProject(currentProject);

});

projectSecondaryButton.addEventListener("click", () => {
    sourceCodeModal.classList.add("active");
});

closeSourceCode.addEventListener("click", () => {
    sourceCodeModal.classList.remove("active");
});

sourceCodeModal.addEventListener("click", (e) => {
    if (e.target === sourceCodeModal) {
        sourceCodeModal.classList.remove("active");
    }
});

function renderCaseStudy(project){

    caseTitle.textContent = project.title;

    caseSubtitle.textContent = project.caseStudy.subtitle;

   caseImage.src = project.preview.gallery[0].image;

    modalContent.innerHTML = `

   <div class="case-section reveal">

        <h3>📖 Overview</h3>

        <p>

            ${project.caseStudy.overview}

        </p>

    </div>

  <div class="case-section reveal">

        <h3>⚡ Challenge</h3>

        <p>

            ${project.caseStudy.challenge}

        </p>

    </div>

    <div class="case-section reveal">

        <h3>💡 Solution</h3>

        <p>

            ${project.caseStudy.solution}

        </p>

    </div>

    <div class="case-section reveal">

        <h3>🛠 Technologies</h3>

        <div class="case-tech">

            ${project.caseStudy.technologies
                .map(tech => `<span>${tech}</span>`)
                .join("")}

        </div>

    </div>
<div class="case-section reveal">

    <h3>✨ Key Features</h3>

    <div class="case-features">

        ${project.caseStudy.features
            .map(feature => `

          <div class="feature-card reveal">

                <div class="feature-icon">

                    ${feature.icon}

                </div>

                <h4>

                    ${feature.title}

                </h4>

                <p>

                    ${feature.description}

                </p>

            </div>

            `)
            .join("")}

    </div>

</div>

    <div class="case-section reveal">

        <h3>📚 Lessons Learned</h3>

        <p>

            ${project.caseStudy.lessons}

        </p>

    </div>

    <div class="case-section reveal">

        <h3>🚀 Future Improvements</h3>

        <p>

            ${project.caseStudy.future}

        </p>

    </div>

    `;

    if(window.staggerReveal){
        window.staggerReveal(
            modalContent.querySelectorAll(".case-section, .feature-card")
        );
    }

}

function closeCaseStudy(){

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

}

openCase.addEventListener("click",(e)=>{

    e.preventDefault();

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    const pageLoader = document.getElementById("page-loader");

    if(pageLoader){
        pageLoader.classList.add("loader-finished");
    }

});

projectPrimaryButton.addEventListener("click",(e)=>{

    e.preventDefault();

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    const pageLoader = document.getElementById("page-loader");

    if(pageLoader){
        pageLoader.classList.add("loader-finished");
    }

});

closeCase.addEventListener("click",(e)=>{

    e.preventDefault();

    e.stopPropagation();

    closeCaseStudy();

}, true);

modal.addEventListener("click",(e)=>{

    if(e.target===modal){

        closeCaseStudy();

    }

});



// =========================
// PROGRESS BARS (Facebook Stories Style)
// =========================
function initProgressBars(project){
    clearInterval(progressInterval);
    
    const gallery = project.preview.gallery;
    progressBarsContainer.innerHTML = "";
    
    gallery.forEach((item, index) => {
        const barItem = document.createElement("div");
        barItem.className = "progress-bar-item";
        barItem.id = `progress-${index}`;
        
        const barFill = document.createElement("div");
        barFill.className = "progress-bar-fill";
        
        barItem.appendChild(barFill);
        progressBarsContainer.appendChild(barItem);
    });
    
    updateProgressBars();
    startProgressTimer(project);
}

function updateProgressBars(){
    const bars = progressBarsContainer.querySelectorAll(".progress-bar-item");
    bars.forEach((bar, index) => {
        bar.classList.remove("active", "completed");
        if(index < currentGallery){
            bar.classList.add("completed");
        } else if(index === currentGallery){
            bar.classList.add("active");
        }
    });
}

function startProgressTimer(project){
    clearInterval(progressInterval);

    progressInterval = setInterval(() => {
        currentGallery++;

        if(currentGallery >= project.preview.gallery.length){
            currentGallery = 0;
        }

        renderGallery(project);
        updateProgressBars();
    }, 4000);
}

// =========================
// INTERACTIVE GALLERY
// =========================
function renderGallery(project){

    const gallery = project.preview.gallery;
    const newImageSrc = gallery[currentGallery].image;

    // Show loading placeholder
    if (loadingPlaceholder) {
        loadingPlaceholder.classList.add('active');
    }

    // Fade out effect
    previewImage.style.opacity = '0';

    setTimeout(() => {
        // Use cached image if available
        if (imageCache[newImageSrc]) {
            previewImage.src = newImageSrc;
            // Hide loading placeholder immediately if cached
            if (loadingPlaceholder) {
                loadingPlaceholder.classList.remove('active');
            }
        } else {
            // Fallback to direct loading
            previewImage.src = newImageSrc;
        }

        // Fade in effect
        previewImage.onload = () => {
            previewImage.style.opacity = '1';
            // Hide loading placeholder when image loads
            if (loadingPlaceholder) {
                loadingPlaceholder.classList.remove('active');
            }
        };

        // Update text content
        galleryTitle.textContent = gallery[currentGallery].title;
        galleryDescription.textContent = gallery[currentGallery].description;

        // Force fade in even if already loaded
        if (previewImage.complete) {
            previewImage.style.opacity = '1';
            if (loadingPlaceholder) {
                loadingPlaceholder.classList.remove('active');
            }
        }
    }, 150); // Wait for fade out

}

function playStaggerAnimation(){

    fadeItems.forEach(item=>{

        item.classList.remove("show");

    });

    fadeItems.forEach((item,index)=>{

        setTimeout(()=>{

            item.classList.add("show");

        },index*75);

    });

}

// ===================================
// MAGNETIC BUTTONS
// ===================================

const magneticButtons = document.querySelectorAll(
`
.primary-btn,
.secondary-btn,
.project-tab,
.floating-nav-btn,
.preview-open-btn
`
);

if (window.__enableAdvancedEffects) {
magneticButtons.forEach(button=>{

let ticking = false;

button.addEventListener("mousemove",(e)=>{

if(!ticking){

requestAnimationFrame(()=>{

const rect = button.getBoundingClientRect();

const x = e.clientX - rect.left - rect.width/2;

const y = e.clientY - rect.top - rect.height/2;

button.style.transform =
`translate(${x*0.10}px, ${y*0.10}px) scale(1.02)`;

ticking = false;

});

ticking = true;

}

});

button.addEventListener("mouseleave",()=>{

button.style.transform =
"translate(0,0) scale(1)";

});

});
}
