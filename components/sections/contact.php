<section
class="contact section initial-reveal"
id="contact">

<div class="container">

<div class="section-heading reveal">

<span class="section-tag glass">

Let's Connect

</span>

<h2 class="section-title">

Let's Build
<span>Something Amazing.</span>

</h2>

<p class="section-description">

Whether you're looking for a Tech Virtual Assistant,
a Web Developer,
or someone to help automate your workflow,
I'd love to hear about your project.

</p>

</div>

<div class="contact-layout">

<div class="contact-card glass">

<div class="contact-profile">

<div class="contact-avatar">

<img
    src="assets/images/profile/ajllanera.jpg"
    alt="AJ Llanera"
    loading="lazy">

</div>

<h3>

AJ Llanera

</h3>

<p>

Tech Virtual Assistant

</p>

<div class="contact-status">

🟢 Available for Freelance

</div>

</div>

<div class="contact-info">

<div class="contact-info-item">

<span>📧</span>

<div>

<h4>Email Account:</h4>

<p>ajllanera.mmiv@gmail.com</p>

</div>

</div>

<div class="contact-info-item">

<span>📍</span>

<div>

<h4>Location</h4>

<p>Philippines</p>

</div>

</div>

<div class="contact-info-item">

<span>🌐</span>

<div>

<h4>Work Setup</h4>

<p>Remote Worldwide</p>

</div>

</div>

<div class="contact-info-item">

<span>⚡</span>

<div>

<h4>Response Time</h4>

<p>Within 24 Hours</p>

</div>

</div>

<div class="contact-info-item">

<span>💼</span>

<div>

<h4>Status</h4>

<p>Open for Opportunities</p>

</div>

</div>

</div>

<div class="contact-services">

<h4>

Services

</h4>

<div class="service-tags">

<span>Web Development</span>

<span>Tech VA</span>

<span>WordPress</span>

<span>AI Tools</span>

<span>Automation</span>

</div>

</div>

<div class="contact-social">

<a href="https://github.com" target="_blank" rel="noopener">GitHub</a>

<a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>

<a href="https://www.facebook.com/share/1JizZYwq7F/" target="_blank" rel="noopener">Facebook</a>

</div>

</div>

<div class="contact-form glass">

<h3>

Let's Build Something Amazing

</h3>

<p class="contact-form-subtitle">

Tell me about your project and I'll get back to you as soon as possible.

</p>

<div class="service-selector">

<h4>

What can I help you with?

</h4>

<div class="service-chip-group">

<button
type="button"
class="service-chip"
data-service="Website Development">

🌐 Website

</button>

<button
type="button"
class="service-chip"
data-service="Tech Virtual Assistant">

💼 Tech VA

</button>

<button
type="button"
class="service-chip"
data-service="WordPress">

🟦 WordPress

</button>

<button
type="button"
class="service-chip"
data-service="AI Automation">

🤖 AI Automation

</button>

<button
type="button"
class="service-chip"
data-service="Consultation">

💬 Consultation

</button>

</div>

</div>

<!-- Form -->   

<form
    class="premium-contact-form"
    id="contact-form"
    action="actions/contact-submit.php"
    method="POST"
>   

<input
    type="hidden"
    name="csrf_token"
    value="<?= htmlspecialchars(
        $_SESSION['csrf_token'] ?? '',
        ENT_QUOTES,
        'UTF-8'
    ) ?>"
>

<div
    class="form-honeypot"
    aria-hidden="true"
>
    <label for="website">
        Website
    </label>

    <input
        type="text"
        id="website"
        name="website"
        tabindex="-1"
        autocomplete="off"
    >
</div>

<div class="form-group">

<input
    type="text"
    name="name"
    placeholder=" "
    required
    autocomplete="name">

<label>

Full Name

</label>

</div>

<div class="form-group">

<input
    type="email"
    name="email"
    placeholder=" "
    required
    autocomplete="email">

<label>

Email Address

</label>

</div>

<div class="form-row">

<div class="form-group">

<input
    type="text"
    id="project-type"
    name="project_type"
    placeholder=" "
    required
    autocomplete="off">

<label>

Project Type

</label>

</div>

<div class="form-group">

<input
    type="text"
    name="budget"
    placeholder=" "
    required
    autocomplete="off">

<label>

Budget

</label>

</div>

</div>

<div class="form-group">

<select
    required
    name="timeline">

<option value=""></option>

<option>

ASAP

</option>

<option>

1–2 Weeks

</option>

<option>

1 Month

</option>

<option>

Flexible

</option>

</select>

<label>

Timeline

</label>

</div>

<div class="form-group">

<textarea
    name="message"
    rows="6"
    placeholder=" "
    required></textarea>

<label>

Tell me about your project...

</label>

</div>

<button
type="submit"
class="primary-btn contact-submit">

<span>

Send Message

</span>

<svg
width="18"
height="18"
viewBox="0 0 24 24"
fill="none">

<path

d="M5 12H19"

stroke="currentColor"

stroke-width="2"

stroke-linecap="round"/>

<path

d="M13 6L19 12L13 18"

stroke="currentColor"

stroke-width="2"

stroke-linecap="round"

stroke-linejoin="round"/>

</svg>

</button>

</form>

<div class="contact-cta">

    <div class="contact-availability">

        <span class="online-dot"></span>

        <span>

            Available for New Projects

        </span>

    </div>

    <p class="contact-response">

        Usually replies within 24 hours

    </p>

    <div class="contact-divider"></div>

    <p class="contact-cta-text">

        Let's build something amazing together.

        Whether you need a modern website,

        AI automation,

        or technical assistance,

        I'm ready to help.

    </p>

</div>

</div>

</div>

</div>

</section>