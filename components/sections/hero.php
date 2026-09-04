<?php

date_default_timezone_set('Asia/Manila');

$hour = date('G');

if ($hour >= 5 && $hour < 12) {
    $greeting = "☀ Good Morning,";
} elseif ($hour >= 12 && $hour < 18) {
    $greeting = "🌤 Good Afternoon,";
} else {
    $greeting = "🌙 Good Evening,";
}
?>

<section
class="hero initial-reveal"
id="hero">
<!-- here -->

<div
class="hero-floating"
id="hero-floating">

<div class="float-orb orb-1"></div>

<div class="float-orb orb-2"></div>

<div class="float-orb orb-3"></div>

<div class="float-orb orb-4"></div>

<div
class="particles-container"
id="hero-particles">

<div class="particle"></div>

<div class="particle"></div>

<div class="particle"></div>

<div class="particle"></div>

<div class="particle"></div>

<div class="particle"></div>

<div class="particle"></div>

<div class="particle"></div>

</div>

<div
class="light-blobs"
id="hero-blobs">

<div class="light-blob blob-1"></div>

<div class="light-blob blob-2"></div>

<div class="light-blob blob-3"></div>

</div>

<div
class="accent-glows"
id="hero-glows">

<div class="accent-glow glow-1"></div>

<div class="accent-glow glow-2"></div>

</div>

</div>

    <div class="container">

        <div
        class="hero__wrapper"
        id="hero-wrapper">
<!-- here -->

<div class="hero__content hero-sequence">

    <p class="hero__greeting hero-item">
        <?= $greeting ?>
    </p>

 <h1 class="hero__title hero-item hero-title-reveal">

<span class="hero-line">

Helping Businesses

</span>

<span class="hero-highlight">

Work Smarter

</span>

<span class="hero-line">

Through Technology.

</span>
</h1>

   <p class="hero__subtitle hero-item">

        Hi, I'm <strong>AJ Llanera</strong> —
a BSIT graduate passionate about web technologies,
AI-powered tools, and helping businesses improve their digital workflows.

    </p>

   <div class="hero__roles hero-item">

        <span>BSIT Graduate</span>

        <span>•</span>

        <span>Tech Virtual Assistant</span>

        <span>•</span>

        <span>Web Developer</span>

    </div>


<p class="hero__description hero-item">

        I help businesses streamline workflows,
        build modern web solutions,
        and leverage AI tools to work smarter.

    </p>

    <div class="hero__buttons hero-item">

        <a href="#projects" class="primary-btn">

            View Projects

        </a>

        <a
             href="#"
             class="secondary-btn"
             id="open-resume">

            Download Resume

        </a>

    </div>

</div>

<div
class="hero__card glass hero-item hero-card-enter"
id="hero-card">
<!-- here -->

    <div class="hero__avatar-wrapper">

        <div class="hero__avatar-ring">

            <div class="hero__avatar">

                <img
                    src="assets/images/profile/ajllanera.jpg"
                    alt="AJ Llanera"
                    loading="eager">

            </div>

        </div>

    </div>

    <h3 class="hero__card-name">

        AJ Llanera

    </h3>

    <p class="hero__card-role">

        Tech Virtual Assistant

    </p>

    <div class="status-chip">

        🟢 Available for Work

    </div>

    <div class="hero__info">

        <div class="hero__info-item">

            <span>🎓</span>

            <p>BSIT Graduate</p>

        </div>

        <div class="hero__info-item">

            <span>📍</span>

            <p>Philippines</p>

        </div>

        <div class="hero__info-item">

            <span>🌐</span>

            <p>Remote Ready</p>

        </div>

    </div>

    <div class="hero__tech">

        <span>HTML</span>

        <span>CSS</span>

        <span>PHP</span>

        <span>JavaScript</span>

        <span>Git</span>

        <span>AI Tools</span>

    </div>

</div>
</div>

<!-- ======================================
        PREMIUM RESUME MODAL
====================================== -->

<div
class="resume-modal"
id="resume-modal">

    <div class="resume-backdrop"></div>

    <div class="resume-container glass">

        <button
        class="resume-close"
        id="close-resume">

            ✕

        </button>

        <div class="resume-header">

            <span class="resume-tag">

                📄 Resume

            </span>

            <h2>

                AJ Llanera

            </h2>

            <p>

                BSIT Graduate • Tech Virtual Assistant

            </p>

        </div>

    
<div class="resume-toolbar glass">

    <button
    class="resume-tool"
    id="zoom-resume"
    title="Zoom">

        🔍

    </button>

    <button
    class="resume-tool"
    id="print-resume"
    title="Print">

        🖨

    </button>

    <button
    class="resume-tool"
    id="fullscreen-resume"
    title="Fullscreen">

        ⛶

    </button>

    <a

    href="assets/resume/AJ-Llanera-Resume.pdf"

    download

    class="resume-tool"

    title="Download">

        ⬇

    </a>

</div>

<div class="resume-preview">

    <iframe

        id="resume-frame"

        class="resume-frame"

            src="about:blank"

            data-src="assets/resume/AJ-Llanera-Resume.pdf"

            loading="lazy"

            title="Resume Preview">

        </iframe>

</div>

        <div class="resume-actions">

           <a

            href="assets/resume/AJ-Llanera-Resume.pdf"

            download

            class="primary-btn"

            id="download-resume">

            ⬇ Download Resume

           </a>

        </div>

    </div>

</div>

</section>