---
layout: default
title: CV
---

<!-- Sticky Navigation Header -->
<nav class="sticky-nav">
    <div class="nav-container">
        <div class="nav-brand">Ömer Tekin</div>
        <ul class="nav-menu">
            <li><a href="#personal-info">About</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#game">Game</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </div>
</nav>

<!-- Personal Information Section -->
<section id="personal-info">
    <h2>Personal Information</h2>
    <div class="info-grid">
        <div class="info-item">
            <strong>Name:</strong> Ömer Tekin
        </div>
        <div class="info-item">
            <strong>Email:</strong> <a href="mailto:omertekin2002@hotmail.com">omertekin2002@hotmail.com</a>
        </div>
        <div class="info-item">
            <strong>Phone:</strong> <a href="tel:+905383690521">+90 (538) 369 05 21</a>
        </div>
        <div class="info-item">
            <strong>Location:</strong> Istanbul, Türkiye
        </div>
    </div>
</section>

<!-- Education Section -->
<section id="education">
    <h2>Education</h2>
    <div class="section-content">
        <div class="education-item">
            <h3>Degree</h3>
            <p>University Name, 20XX–20XX</p>
        </div>
    </div>
</section>

<!-- Experience Section -->
<section id="experience">
    <h2>Experience</h2>
    <div class="section-content">
        <div class="experience-item">
            <h3>Job Title</h3>
            <p class="company">Company Name — 20XX–20XX</p>
            <p>Brief description of responsibilities or achievements.</p>
        </div>
    </div>
</section>

<!-- Skills Section -->
<section id="skills">
    <h2>Skills</h2>
    <div class="section-content">
        <div class="skills-grid">
            <div class="skill-category">
                <h3>Programming Languages</h3>
                <ul>
                    <li>Skill one</li>
                    <li>Skill two</li>
                    <li>Skill three</li>
                </ul>
            </div>
            <div class="skill-category">
                <h3>Frameworks & Tools</h3>
                <ul>
                    <li>Framework one</li>
                    <li>Framework two</li>
                    <li>Tool one</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contact">
    <h2>Contact</h2>
    <div class="section-content">
        <div class="contact-grid">
            <div class="contact-item">
                <strong>Email:</strong> <a href="mailto:omertekin2002@hotmail.com">omertekin2002@hotmail.com</a>
            </div>
            <div class="contact-item">
                <strong>Phone:</strong> <a href="tel:+905383690521">+90 (538) 369 05 21</a>
            </div>
            <div class="contact-item">
                <strong>GitHub:</strong> <a href="https://github.com/omertekin2002" target="_blank">@omertekin2002</a>
            </div>
            <div class="contact-item">
                <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/ömer-tekin" target="_blank">ömer-tekin</a>
            </div>
        </div>
    </div>
</section>

<!-- Snake Game Section -->
<section id="game">
    <h2>Take a Break - Play Snake!</h2>
    <div class="game-section">
        <iframe src="./assets/game/snake/index.html" width="450" height="600" frameborder="0" scrolling="no"></iframe>
    </div>
</section>

<!-- Navigation and Styling -->
<style>
/* Sticky Navigation Styles */
.sticky-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(40, 44, 52, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 2px solid #61dafb;
    z-index: 1000;
    transition: all 0.3s ease;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
}

.nav-brand {
    color: #61dafb;
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 30px;
}

.nav-menu li a {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    padding: 8px 16px;
    border-radius: 20px;
}

.nav-menu li a:hover {
    color: #61dafb;
    background: rgba(97, 218, 251, 0.1);
}

/* Section Styles */
section {
    padding: 80px 20px 40px;
    max-width: 1200px;
    margin: 0 auto;
}

section h2 {
    color: #61dafb;
    font-size: 2rem;
    margin-bottom: 30px;
    text-align: center;
    border-bottom: 2px solid #61dafb;
    padding-bottom: 10px;
}

/* Personal Info Styles */
.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 30px;
}

.info-item {
    background: rgba(58, 64, 77, 0.8);
    padding: 20px;
    border-radius: 10px;
    border-left: 4px solid #61dafb;
}

.info-item a {
    color: #61dafb;
    text-decoration: none;
}

.info-item a:hover {
    text-decoration: underline;
}

/* Section Content Styles */
.section-content {
    background: rgba(58, 64, 77, 0.8);
    padding: 30px;
    border-radius: 10px;
    border: 1px solid rgba(97, 218, 251, 0.3);
}

.education-item, .experience-item {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(97, 218, 251, 0.2);
}

.education-item:last-child, .experience-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.education-item h3, .experience-item h3 {
    color: #61dafb;
    margin-bottom: 10px;
}

.company {
    color: #a0a0a0;
    font-style: italic;
    margin-bottom: 10px;
}

/* Skills Styles */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.skill-category h3 {
    color: #61dafb;
    margin-bottom: 15px;
}

.skill-category ul {
    list-style: none;
    padding: 0;
}

.skill-category li {
    background: rgba(97, 218, 251, 0.1);
    margin: 8px 0;
    padding: 10px 15px;
    border-radius: 5px;
    border-left: 3px solid #61dafb;
}

/* Contact Styles */
.contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.contact-item {
    background: rgba(97, 218, 251, 0.1);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    border: 1px solid rgba(97, 218, 251, 0.3);
}

.contact-item a {
    color: #61dafb;
    text-decoration: none;
    font-weight: 500;
}

.contact-item a:hover {
    text-decoration: underline;
}

/* Game Section Styles */
.game-section {
    text-align: center;
    background: rgba(58, 64, 77, 0.8);
    padding: 30px;
    border-radius: 10px;
    border: 1px solid rgba(97, 218, 251, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        gap: 15px;
    }
    
    .nav-menu li a {
        padding: 6px 12px;
        font-size: 0.9rem;
    }
    
    section {
        padding: 70px 15px 30px;
    }
    
    .info-grid, .skills-grid, .contact-grid {
        grid-template-columns: 1fr;
    }
}

/* Smooth Scrolling */
html {
    scroll-behavior: smooth;
}

/* Body padding to account for fixed header */
body {
    padding-top: 60px;
}
</style>
