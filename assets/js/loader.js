// ======================================
// SMART LOADER ENGINE
// ======================================

(() => {

    const loader = document.getElementById("page-loader");
    if (!loader) return;

    const progressBar = loader.querySelector(".loader-progress");
    const percentEl = loader.querySelector(".loader-percent");

    const MIN_DISPLAY = 350; // shorter display gives a content-first reveal while preserving polish

    const startTime = performance.now();

    let progress = 0;   // real underlying progress, eases toward 92% while we wait
    let displayed = 0;  // what's actually shown on screen, eases toward `progress`
    let rafId;

    // PERFORMANCE NOTE:
    // The old version used setInterval() to animate `.style.width` every
    // 80ms/18ms. Both parts were a problem: setInterval isn't synced to the
    // screen's refresh rate (so it drifts/stutters differently per browser),
    // and `width` is a layout-triggering property — changing it forces the
    // browser to re-run layout + repaint on every tick, which is expensive
    // next to this loader's blurred glow background. Now the bar animates
    // via `transform: scaleX()` inside a requestAnimationFrame loop:
    // scaleX is compositor-only (GPU), so it never touches layout, and rAF
    // is frame-synced, so it stays smooth and consistent in Chrome, Edge,
    // and Brave alike.

    function loadingTick() {
        progress += (92 - progress) * 0.03;
        render();
        rafId = requestAnimationFrame(loadingTick);
    }

    function render() {
        displayed += (progress - displayed) * 0.25;
        const shown = Math.min(displayed, 100);

        if (progressBar) progressBar.style.transform = `scaleX(${shown / 100})`;
        if (percentEl) percentEl.textContent = `${Math.floor(shown)}%`;
    }

    rafId = requestAnimationFrame(loadingTick);

    // Legacy fallback: if any section still carries the older
    // .initial-reveal class, this staggers it in too. Harmless no-op if
    // none exist — the real reveal now comes from the "site-loaded" class
    // added below, which the CSS already handles automatically.
    function revealHome() {
        document.querySelectorAll(".initial-reveal").forEach((section, index) => {
            setTimeout(() => {
                section.classList.add("show");
            }, index * 140);
        });
    }

    function finish() {
        cancelAnimationFrame(rafId);

        const elapsed = performance.now() - startTime;
        const remaining = Math.max(MIN_DISPLAY - elapsed, 0);

        setTimeout(() => {

            // Ease the bar/number to a clean 100% instead of snapping.
            const finishStart = performance.now();
            const from = displayed;

            function completeTick(now) {
                const t = Math.min((now - finishStart) / 260, 1);
                displayed = from + (100 - from) * t;

                if (progressBar) progressBar.style.transform = `scaleX(${displayed / 100})`;
                if (percentEl) percentEl.textContent = `${Math.floor(displayed)}%`;

                if (t < 1) {
                    requestAnimationFrame(completeTick);
                    return;
                }

                loader.classList.add("loader-finished");

                // This CSS's reveal system is driven entirely by this one
                // class: body:not(.site-loaded) hides the navbar/hero/stats,
                // and .navbar/.hero__content/.hero__card/.stats each have
                // their own transition + transition-delay, so adding
                // "site-loaded" here is what triggers the whole staggered
                // cinematic reveal automatically — no extra JS needed for it.
                document.body.classList.add("site-loaded");
                window.dispatchEvent(new Event("site-loaded"));

                const onEnd = (e) => {
                    if (e.target !== loader || e.propertyName !== "opacity") return;
                    loader.removeEventListener("transitionend", onEnd);
                    loader.remove();
                    revealHome();
                };
                loader.addEventListener("transitionend", onEnd);

                // fallback in case transitionend never fires (e.g. tab backgrounded)
                setTimeout(() => {
                    if (document.body.contains(loader)) {
                        loader.removeEventListener("transitionend", onEnd);
                        loader.remove();
                        revealHome();
                    }
                }, 1000);
            }

            requestAnimationFrame(completeTick);

        }, remaining);
    }

    const loaderReady = () => {
        if (loader.dataset.finished) return;
        loader.dataset.finished = 'true';
        finish();
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        loaderReady();
    } else {
        document.addEventListener('DOMContentLoaded', loaderReady, { once: true });
        window.addEventListener('load', loaderReady, { once: true });
    }

    setTimeout(loaderReady, 1500);

})();
