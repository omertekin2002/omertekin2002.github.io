---
layout: default
title: CV
---

<!-- Sticky Navigation Header -->
<nav class="sticky-nav">
    <div class="nav-container">
        <div class="nav-brand">Ömer Tekin</div>
        <ul class="nav-menu">
            <li><a href="#cv">CV</a></li>
            <li><a href="#game">Game</a></li>
        </ul>
    </div>
</nav>



<!-- Hero Section -->
<section class="hero">
    <div class="hero-content">
        <h1>Ömer Tekin</h1>
        <p class="hero-subtitle">Law & Business Enthusiast</p>
        <div class="hero-links">
            <a href="mailto:omertekin2002@hotmail.com" class="hero-btn">Get in Touch</a>
            <a href="{{ '/assets/Omer%20Tekin%20CV%20n.pdf' | relative_url }}" class="hero-btn secondary" download="Omer_Tekin_CV.pdf" target="_blank" rel="noopener">Download CV (PDF)</a>
        </div>
        <div class="social-links">
            <a href="https://linkedin.com/in/%C3%B6mer-tekin" target="_blank" class="social-link">
                <span class="social-icon">💼</span>
                <span>LinkedIn</span>
            </a>
        </div>
    </div>
</section>

 

<!-- CV Section -->
<section id="cv" class="section">
    <div class="container">
        <h2>Experience & Skills</h2>
        <div class="cv-grid">
            <div class="cv-card">
                <h3>Education</h3>
                <div class="cv-item">
                    <h4>Bachelor of Laws (LLB)</h4>
                    <p>Koç University, 2022–2026</p>
                </div>
                <div class="cv-item">
                    <h4>High School</h4>
                    <p>6 A-Grade GCSE's taken, 2017-2022</p>
                </div>
            </div>
            
            <div class="cv-card">
                <h3>Work Experience</h3>
                <div class="cv-item">
                    <h4>Summer Intern</h4>
                    <p class="company">Çakmak Attorney Partnership — September 2025</p>
                </div>
                <div class="cv-item">
                    <h4>Summer Intern</h4>
                    <p class="company">Bezen Attorney Partnership — August 2025</p>
                </div>
                <div class="cv-item">
                    <h4>Intern</h4>
                    <p class="company">Ak & Daniş Attorney Partnership — January 2025</p>
                </div>
                <div class="cv-item">
                    <h4>Participant & Oralist</h4>
                    <p class="company">Frankfurt Investment Arbitration Moot Court — September 2024 – June 2025</p>
                </div>
                <div class="cv-item">
                    <h4>Intern</h4>
                    <p class="company">DNPartners — October 2024 – November 2024</p>
                </div>
                <div class="cv-item">
                    <h4>Tutor</h4>
                    <p class="company">Koç University Office of Teaching and Learning (Python) — October 2023 – January 2024</p>
                </div>
            </div>
            
            <div class="cv-card">
                <h3>Skills</h3>
                <div class="skills-list">
                    <span class="skill-tag">Microsoft Power BI</span>
                    <span class="skill-tag">Excel</span>
                    <span class="skill-tag">SQL</span>
                    <span class="skill-tag">UYAP</span>
                    <span class="skill-tag">Python</span>
                    <span class="skill-tag">Office Suite</span>
                    <span class="skill-tag">MCP Integration</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Game Section -->
<section id="game" class="section">
    <div class="container">
        <div class="game-container">
            <div class="game-embed">
                <iframe src="{{ '/assets/game/snake/index.html' | relative_url }}" loading="lazy" referrerpolicy="no-referrer"></iframe>
            </div>
        </div>
    </div>
</section>

<!-- Modern Styling -->
<style>
/* Hide Jekyll Dinky Theme Header */
header, .header, .site-header, .site-title, .site-nav, .site-nav ul, .site-nav li {
    display: none !important;
}

/* Remove any theme-generated header spacing */
body {
    padding-top: 0 !important;
}

/* Ensure our custom navigation is properly positioned */
.sticky-nav {
    top: 0 !important;
}

/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #fafafa;
}

/* Sticky Navigation */
.sticky-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: all 0.3s ease;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}

.nav-brand {
    color: #2563eb;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.025em;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 32px;
}

.nav-menu li a {
    color: #64748b;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    padding: 8px 16px;
    border-radius: 8px;
}

.nav-menu li a:hover {
    color: #2563eb;
    background: rgba(37, 99, 235, 0.1);
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 120px 24px 80px;
    text-align: center;
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-content h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 16px;
    letter-spacing: -0.025em;
}

.hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 32px;
    opacity: 0.9;
    font-weight: 400;
}

.hero-links {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
}

.hero-btn {
    display: inline-block;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;
    border: 2px solid transparent;
}

.hero-btn:first-child {
    background: white;
    color: #2563eb;
}

.hero-btn:first-child:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.hero-btn.secondary {
    background: transparent;
    color: white;
    border-color: rgba(255, 255, 255, 0.3);
}

.hero-btn.secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
}

/* Social Links in Hero */
.social-links {
    display: flex;
    gap: 24px;
    justify-content: center;
    margin-top: 32px;
}

.social-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    padding: 12px 20px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.social-link:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
}

.social-icon {
    font-size: 1.2rem;
}

.social-link span:last-child {
    font-weight: 500;
    font-size: 0.95rem;
}

/* Section Styles */
.section {
    padding: 80px 0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

.section h2 {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 48px;
    color: #1e293b;
    letter-spacing: -0.025em;
}

/* About section styles removed */

/* CV Section */
.cv-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 32px;
}

.cv-card {
    background: white;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.cv-card h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 24px;
    color: #1e293b;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 12px;
}

.cv-item h4 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #2563eb;
}

.cv-item p {
    color: #64748b;
    margin-bottom: 8px;
}

.company {
    color: #94a3b8;
    font-style: italic;
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.skill-tag {
    background: #f1f5f9;
    color: #475569;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid #e2e8f0;
}

/* Game Section */
.game-container {
    text-align: center;
    background: white;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.05);
}

/* Responsive iframe wrapper for the game */
.game-embed {
    width: 100%;
    max-width: min(96vw, 85vh, 1600px);
    margin: 0 auto;
}

.game-embed iframe {
    width: 100%;
    aspect-ratio: 1 / 1;
    border: 0;
    display: block;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    max-height: 85vh;
}

/* Allow the game section to use more horizontal space */
#game .container {
    max-width: min(96vw, 1600px);
}

/* Slightly reduce vertical padding for the game section */
#game.section {
    padding: 60px 0;
}



/* Responsive Design */
@media (max-width: 768px) {
    .hero-content h1 {
        font-size: 2.5rem;
    }
    
    .hero-subtitle {
        font-size: 1.125rem;
    }
    
    .hero-links {
        flex-direction: column;
        align-items: center;
    }
    
    .nav-menu {
        gap: 16px;
    }
    
    .nav-menu li a {
        padding: 6px 12px;
        font-size: 0.875rem;
    }
    
    .section {
        padding: 60px 0;
    }
    
    .section h2 {
        font-size: 2rem;
        margin-bottom: 32px;
    }
    
    .about-grid, .cv-grid {
        grid-template-columns: 1fr;
    }
    
    .cv-card {
        padding: 24px;
    }
}

/* Smooth Scrolling */
html {
    scroll-behavior: smooth;
}

/* Body padding for fixed header */
body {
    padding-top: 70px;
}
</style>
