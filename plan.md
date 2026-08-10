# Portfolio Website — Finalized Step-by-Step Implementation Plan

> **Based on:** [design_guide.mp4](file:///h:/Work/Portfolio_Website/design_guide.mp4) (reference design) + [portfolio-plan.md](file:///h:/Work/Portfolio_Website/portfolio-plan.md) (content & brand decisions)
>
> **New additions by user:**
> 1. Navbar mein **Resume Download** button
> 2. Hero section mein **View Projects** + **View Resume** dono buttons
> 3. Contact se pehle ek naya **Resume Section** — jismein Resume **Download** aur **View** dono buttons hon
> 4. **Projects Filtering & Order:** Latest to oldest sort order, Category tabs (All, Generative AI / RAG, Agentic AI, Machine Learning, etc.)
> 5. **Projects Pagination:** Pehle sirf **3 projects** dikhein + **"Show More"** button → click karne par sab expand hon aur neeche **"Show Less"** aa jaye
> 6. **Dynamic Ambient Background:** Plain flat color ki jagah subtle radial gradients, glowing ambient orbs, aur background mesh texture taaki luxury WOW-factor mile

---

## Overview — Kya Ban Raha Hai

Ek single-page dark-themed portfolio website for **Syed Ali Mehdi Bukhari** (AI/ML Engineer). Design ka layout pattern reference video se liya gaya hai (hero → about → skills → projects → resume → contact), lekin colors, fonts, aur content apne brand ke mutabiq hain.

### Section Flow (Top → Bottom)

```
┌─────────────────────────────────────────────┐
│  NAVBAR  (sticky)                           │
│  Logo | Home About Skills Projects Contact  │
│                           [📥 Resume]       │
├─────────────────────────────────────────────┤
│  HERO SECTION                               │
│  👋 Hello, I'm                              │
│  Syed Ali Mehdi Bukhari                     │
│  ✍️ Typing: "AI/ML Engineer" → ...          │
│  Tagline + Tag pills                        │
│  [View Projects] [View Resume]              │
│  📊 Stats: Certifications | Internships     │
│                        🖼️ My Photo (circle) │
├─────────────────────────────────────────────┤
│  ABOUT ME                                   │
│  Photo (rounded) | Bio + Info Cards         │
│  (Education / Certification / Learning)     │
├─────────────────────────────────────────────┤
│  EXPERIENCE                                 │
│  Experience cards (data-driven)             │
├─────────────────────────────────────────────┤
│  SKILLS                                     │
│  Skill cards with progress bars             │
│  (Python, LangChain, CrewAI, etc.)          │
├─────────────────────────────────────────────┤
│  PROJECTS                                   │
│  Card grid — title, desc, tags, buttons     │
│  (GitHub + Live Demo per card)              │
├─────────────────────────────────────────────┤
│  CERTIFICATES                               │
│  Certificate cards (data-driven)            │
├─────────────────────────────────────────────┤
│  RESUME SECTION  ← NEW                      │
│  Heading + subtext                          │
│  [📥 Download Resume] [👁️ View Resume]      │
├─────────────────────────────────────────────┤
│  CONTACT ME                                 │
│  Email | GitHub | LinkedIn cards            │
├─────────────────────────────────────────────┤
│  FOOTER                                     │
│  © 2026 Syed Ali Mehdi Bukhari              │
└─────────────────────────────────────────────┘
```

---

## Design Decisions (Video + Plan Merge)

### Colors — Dark Navy Theme (from portfolio-plan.md)

| Token Name       | Hex / Value | Usage                                                              |
|------------------|-------------|--------------------------------------------------------------------|
| `--bg-primary`   | `#0a0f30`   | Main background base color                                         |
| `--bg-card`      | `#111640`   | Card backgrounds (slightly lighter than primary)                   |
| `--bg-card-hover` | `#161d50`  | Card hover background                                              |
| `--text-primary` | `#ffffff`   | Headings, body text                                                |
| `--text-muted`   | `#a0a8c8`   | Subheadings, descriptions, secondary text                          |
| `--accent`       | `#7aa8f6`   | Buttons, links, highlights, progress bars, tags, icons, hover      |
| `--accent-hover` | `#5b8fef`   | Button hover states                                                |
| `--accent-glow`  | `rgba(122, 168, 246, 0.15)` | Subtle glow effects on cards/borders              |
| `--bg-glow-1`    | `radial-gradient(circle at 10% 20%, rgba(122, 168, 246, 0.08) 0%, transparent 50%)` | Ambient light orb top-left |
| `--bg-glow-2`    | `radial-gradient(circle at 90% 80%, rgba(91, 143, 239, 0.08) 0%, transparent 50%)` | Ambient light orb bottom-right |

### Typography

- **Primary font (Sans-serif):** `'Poppins', sans-serif` — for Navbar, Hero, Buttons, Cards, Body Text
- **Section Heading font (Serif accent):** `'Playfair Display', serif` — for elegant section titles (like "Contact Me", "About Me", "My Resume") as shown in reference video
- **Self-hosted:** Both downloaded locally in `assets/fonts/` (zero external CDN dependency)

### Layout Patterns (from reference video)

- **Navbar:** Sticky top, logo left, nav links center, resume button right
- **Hero:** Two-column — text left, circular photo right (reference had purple border → we use pastel blue border)
- **About:** Two-column — photo left (rounded corners), text + info cards right
- **Skills:** Card grid with progress bars (pastel blue fill)
- **Projects:** Responsive card grid (CSS Grid auto-fit), 3→2→1 columns on resize
- **Resume section:** Centered layout, heading + 2 buttons side by side
- **Contact:** Stacked full-width cards (reference style: Email / GitHub / LinkedIn)
- **All cards:** Slightly lighter background (`--bg-card`), subtle border, rounded corners

### Icons

- Inline SVG — pasted directly in HTML (no icon-font CDN)

---

## Folder Structure

```
Portfolio_Website/
├── index.html                                    → Single page, sab sections yahan
├── css/
│   └── style.css                                 → Saari styling + animations
├── js/
│   ├── data.js                                   → Skills aur Projects ka data (sirf yehi file update hogi future mein)
│   └── main.js                                   → Typing effect, scroll animations, card generation, nav behavior
├── assets/
│   ├── fonts/                                    → Self-hosted Poppins (Sans-serif) & Playfair Display (Serif) font files
│   ├── images/
│   │   └── profile.png                           → Meri photo (hero + about section ke liye)
│   └── syedalimehdi-resumeme.pdf                 → Downloadable resume file
├── plan.md                                       → YEH FILE — finalized implementation plan
└── .nojekyll                                     → GitHub Pages ke liye (Jekyll bypass)
```

---

## Phase 1: HTML Structure (index.html)

> **Goal:** Puri page ka skeleton tayyar karna — koi styling nahi, sirf semantic HTML.
> **Verify:** Browser mein kholo → saare sections ka text dikhna chahiye, sequentially. Ugly lagega — yeh expected hai.

### Step 1.1 — Boilerplate + Meta Tags

```
- <!DOCTYPE html>, lang="en"
- <head> mein:
  - charset UTF-8
  - viewport meta (responsive)
  - <title>Syed Ali Mehdi Bukhari | AI/ML Engineer</title>
  - Meta description (SEO)
  - Open Graph tags (og:title, og:description, og:image, og:url)
  - Favicon link (placeholder — baad mein replace karein)
  - CSS link: css/style.css
```

### Step 1.2 — Navbar (`<nav>`)

```html
<nav id="navbar">
  <div class="nav-container">
    <!-- Logo -->
    <a href="#home" class="nav-logo">AliMehdi<span class="logo-dot">.</span></a>

    <!-- Nav Links (center) -->
    <ul class="nav-links" id="nav-links">
      <li><a href="#home" class="nav-link active">Home</a></li>
      <li><a href="#about" class="nav-link">About</a></li>
      <li><a href="#skills" class="nav-link">Skills</a></li>
      <li><a href="#projects" class="nav-link">Projects</a></li>
      <li><a href="#contact" class="nav-link">Contact</a></li>
    </ul>

    <!-- Resume Download Button (right side) -->   ← USER REQUIREMENT #1
    <a href="assets/resume.pdf" download class="nav-resume-btn" id="nav-resume-btn">
      <!-- Download SVG icon -->
      Resume
    </a>

    <!-- Hamburger Menu (mobile) -->
    <button class="hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
```

### Step 1.3 — Hero Section (`<section id="home">`)

```html
<section id="home" class="hero-section">
  <div class="hero-container">
    <!-- Left: Text Content -->
    <div class="hero-text">
      <p class="hero-greeting">👋 Hello, I'm</p>
      <h1 class="hero-name">Syed Ali Mehdi Bukhari</h1>
      <h2 class="hero-title" id="typed-text"></h2>   ← JS typing target
      <p class="hero-tagline">Turning Ideas Into Production-Ready AI Systems</p>
      <div class="hero-tags">
        <span class="tag-pill">RAG</span>
        <span class="tag-pill">Agents</span>
        <span class="tag-pill">LangGraph</span>
        <span class="tag-pill">CrewAI</span>
      </div>
      <div class="hero-buttons">
        <a href="#projects" class="btn btn-primary">View Projects</a>          ← USER REQUIREMENT #2
        <a href="assets/resume.pdf" target="_blank" class="btn btn-outline">View Resume</a>  ← USER REQUIREMENT #2
      </div>
      <div class="hero-stats">
        <div class="stat-card">
          <span class="stat-number">X+</span>   ← Real number daalna hai
          <span class="stat-label">Certifications</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">X+</span>   ← Real number daalna hai
          <span class="stat-label">Internships</span>
        </div>
      </div>
    </div>
    <!-- Right: Photo -->
    <div class="hero-image">
      <div class="hero-photo-frame">
        <img src="assets/images/profile.png" alt="Syed Ali Mehdi Bukhari" id="hero-photo">
      </div>
    </div>
  </div>
</section>
```

### Step 1.4 — About Me Section (`<section id="about">`)

```html
<section id="about" class="about-section">
  <p class="section-subtitle">Get to know me</p>
  <h2 class="section-title">About Me</h2>
  <div class="about-container">
    <!-- Left: Photo -->
    <div class="about-image">
      <img src="assets/images/profile.png" alt="Ali Mehdi" id="about-photo">
    </div>
    <!-- Right: Bio + Cards -->
    <div class="about-content">
      <h3 class="about-heading">AI/ML Engineer & Generative AI Specialist</h3>
      <p class="about-bio">
        <!-- 2-3 sentences — user se lena hai -->
        Short bio about focus on Generative AI & NLP, LLMs & RAG, Agentic AI...
      </p>
      <div class="about-cards">
        <div class="info-card">
          <h4>Education</h4>
          <p>BSCS, Virtual University of Pakistan</p>
        </div>
        <div class="info-card">
          <h4>Certification</h4>
          <p>Microsoft Azure AI Certified</p>
        </div>
        <div class="info-card">
          <h4>Currently Learning</h4>
          <p>RAG Architecture, LangGraph</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Step 1.4b — Experience Section (`<section id="experience">`)

```html
<section id="experience" class="experience-section full-page-section">
  <h2 class="section-title">My Experience</h2>
  <div class="experience-grid" id="experience-grid">
    <!-- Cards JS se generate honge data.js se -->
  </div>
</section>
```

### Step 1.5 — Skills Section (`<section id="skills">`)

```html
<section id="skills" class="skills-section">
  <h2 class="section-title">Skills</h2>
  <div class="skills-grid" id="skills-grid">
    <!-- Cards JS se generate honge data.js se -->
  </div>
</section>
```

### Step 1.6 — Projects Section (`<section id="projects">`)

```html
<section id="projects" class="projects-section">
  <h2 class="section-title">Projects</h2>
  <p class="section-subtitle">Selected AI/ML & Engineering Work</p>
  
  <!-- Category Filter Tabs -->
  <div class="project-filters" id="project-filters">
    <button class="filter-btn active" data-filter="all">All Projects</button>
    <button class="filter-btn" data-filter="gen-ai">Generative AI & RAG</button>
    <button class="filter-btn" data-filter="agentic-ai">Agentic AI</button>
    <button class="filter-btn" data-filter="ml">Machine Learning</button>
  </div>

  <!-- Dynamic Card Grid -->
  <div class="projects-grid" id="projects-grid">
    <!-- Cards JS se latest-to-oldest order mein generate honge -->
  </div>

  <!-- Show More / Show Less Button Container -->
  <div class="projects-toggle-container">
    <button id="show-more-btn" class="btn btn-outline show-more-btn">
      <span>Show More</span>
      <!-- Chevron Down SVG icon -->
    </button>
  </div>
</section>
```

### Step 1.6b — Certificates Section (`<section id="certificates">`)

```html
<section id="certificates" class="certificates-section full-page-section">
  <h2 class="section-title">My Certificates</h2>
  <div class="certificates-grid" id="certificates-grid">
    <!-- Cards JS se generate honge data.js se -->
  </div>
</section>
```

### Step 1.7 — Resume Section (`<section id="resume">`) ← NEW SECTION

```html
<section id="resume" class="resume-section">
  <h2 class="section-title">My Resume</h2>
  <p class="section-subtitle">Download or view my detailed resume</p>
  <div class="resume-buttons">
    <a href="assets/resume.pdf" download class="btn btn-primary">       ← USER REQUIREMENT #3
      <!-- Download SVG icon -->
      Download Resume
    </a>
    <a href="assets/resume.pdf" target="_blank" class="btn btn-outline"> ← USER REQUIREMENT #3
      <!-- Eye/View SVG icon -->
      View Resume
    </a>
  </div>
</section>
```

### Step 1.8 — Contact Section (`<section id="contact">`)

```html
<section id="contact" class="contact-section">
  <h2 class="section-title">Contact Me</h2>
  <p class="section-subtitle">Let's build something amazing together.</p>
  <div class="contact-cards">
    <a href="mailto:YOUR_EMAIL" class="contact-card" id="contact-email">
      <!-- Email SVG icon -->
      <h4>Email</h4>
      <p>Email Me</p>
    </a>
    <a href="https://github.com/syedalimehdii" target="_blank" class="contact-card" id="contact-github">
      <!-- GitHub SVG icon -->
      <h4>GitHub</h4>
      <p>GitHub Profile</p>
    </a>
    <a href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" class="contact-card" id="contact-linkedin">
      <!-- LinkedIn SVG icon -->
      <h4>LinkedIn</h4>
      <p>LinkedIn Profile</p>
    </a>
  </div>
</section>
```

### Step 1.9 — Footer

```html
<footer class="footer">
  <p>&copy; 2026 Syed Ali Mehdi Bukhari. All rights reserved.</p>
</footer>
```

### Step 1.10 — Script Tags (bottom of body)

```html
<script src="js/data.js"></script>
<script src="js/main.js"></script>
```

### ✅ Phase 1 Verification

Browser mein `index.html` kholo:
- [ ] Saare sections ka unstyled text dikhta hai (navbar, hero, about, skills heading, projects heading, resume buttons, contact cards, footer)
- [ ] Navbar mein "Resume" link dikhta hai
- [ ] Hero mein "View Projects" aur "View Resume" dono buttons hain
- [ ] Contact se pehle "My Resume" section hai jismein Download + View dono buttons hain
- [ ] Koi console error nahi (F12 → Console check karo)

---

## Phase 2: Styling (css/style.css)

> **Goal:** Saari visual styling — colors, layout, spacing, responsiveness, animations.
> **Verify:** Browser mein refresh karo → dark navy background, pastel blue accents, responsive layout.

### Step 2.1 — CSS Reset + CSS Custom Properties (Variables)

```css
/* ===== RESET ===== */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ===== DESIGN TOKENS ===== */
:root {
  --bg-primary: #0a0f30;
  --bg-card: #111640;
  --bg-card-hover: #161d50;
  --text-primary: #ffffff;
  --text-muted: #a0a8c8;
  --accent: #7aa8f6;
  --accent-hover: #5b8fef;
  --accent-glow: rgba(122, 168, 246, 0.15);
  --border-subtle: rgba(122, 168, 246, 0.1);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 50%;
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --max-width: 1200px;
  --section-padding: 100px 0;
  --font-stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
               Oxygen, Ubuntu, Cantarell, sans-serif;
}
```

### Step 2.2 — Base Body + Section Styles

```
- body: font-family var(--font-stack), background var(--bg-primary), color var(--text-primary),
         smooth scrolling (scroll-behavior: smooth), overflow-x hidden
- .section-title: font-size 2.5rem, color accent, text-align center, margin-bottom
- .section-subtitle: color muted, text-align center
- Section containers: max-width var(--max-width), margin 0 auto, padding 0 2rem
```

### Step 2.3 — Navbar Styling

```
- nav#navbar: position fixed, top 0, width 100%, z-index 1000,
              background var(--bg-primary) with slight transparency + backdrop-filter blur
              → glassmorphism effect (reference video mein bhi navbar semi-transparent tha)
- .nav-container: display flex, align-items center, justify-content space-between,
                   max-width var(--max-width), margin auto, padding 1rem 2rem
- .nav-logo: font-weight 700, font-size 1.4rem, color white, text-decoration none
- .logo-dot: color var(--accent) — reference video mein bhi logo ka dot colored tha
- .nav-links: display flex, list-style none, gap 2rem
- .nav-link: color var(--text-muted), text-decoration none, transition color, font-weight 500
- .nav-link:hover, .nav-link.active: color var(--accent)
- .nav-resume-btn: background var(--accent), color var(--bg-primary), padding 0.5rem 1.2rem,
                    border-radius var(--radius-sm), font-weight 600, display flex, align-items center,
                    gap 0.5rem, transition background
- .nav-resume-btn:hover: background var(--accent-hover)
- .hamburger: display none (mobile mein dikhega)
```

### Step 2.4 — Hero Section Styling

```
- .hero-section: min-height 100vh, display flex, align-items center,
                  padding-top 80px (navbar ki height ke liye)
- .hero-container: display grid, grid-template-columns 1fr 1fr, gap 4rem,
                    align-items center, max-width var(--max-width), margin auto, padding 0 2rem
- .hero-greeting: color var(--accent), font-size 1.1rem, margin-bottom 0.5rem
- .hero-name: font-size 3.5rem, font-weight 700, line-height 1.1, margin-bottom 0.5rem
- .hero-title: color var(--accent), font-size 1.5rem, font-weight 600,
               min-height 2rem (typing text ke liye)
   → Typing cursor: border-right 2px solid var(--accent), animation blink 0.7s infinite
- .hero-tagline: color var(--text-muted), margin 1rem 0
- .hero-tags: display flex, flex-wrap wrap, gap 0.5rem
- .tag-pill: border 1px solid var(--accent), color var(--accent), padding 0.3rem 0.8rem,
             border-radius var(--radius-lg), font-size 0.85rem
- .hero-buttons: display flex, gap 1rem, margin-top 1.5rem
- .btn: padding 0.75rem 1.5rem, border-radius var(--radius-sm), font-weight 600,
        text-decoration none, transition all var(--transition-normal), cursor pointer,
        display inline-flex, align-items center, gap 0.5rem
- .btn-primary: background var(--accent), color var(--bg-primary)
- .btn-primary:hover: background var(--accent-hover), transform translateY(-2px),
                       box-shadow 0 8px 25px var(--accent-glow)
- .btn-outline: border 2px solid var(--accent), color var(--accent), background transparent
- .btn-outline:hover: background var(--accent), color var(--bg-primary),
                       transform translateY(-2px)
- .hero-stats: display flex, gap 1.5rem, margin-top 2rem
- .stat-card: background var(--bg-card), padding 1rem 1.5rem, border-radius var(--radius-md),
              border 1px solid var(--border-subtle)
- .stat-number: font-size 1.5rem, font-weight 700, color var(--accent), display block
- .stat-label: color var(--text-muted), font-size 0.85rem
- .hero-photo-frame: width 350px, height 350px, border-radius var(--radius-full),
                      border 4px solid var(--accent), overflow hidden,
                      box-shadow 0 0 40px var(--accent-glow)
                      → Reference video mein purple border thi → humara pastel blue
- .hero-photo-frame img: width 100%, height 100%, object-fit cover
```

### Step 2.5 — About Section Styling

```
- .about-section: padding var(--section-padding)
- .about-container: display grid, grid-template-columns 1fr 1.2fr, gap 4rem,
                     align-items center, max-width var(--max-width), margin 2rem auto, padding 0 2rem
- .about-image img: width 100%, max-width 350px, border-radius var(--radius-md),
                     box-shadow 0 10px 30px rgba(0,0,0,0.3)
                     → Reference video mein about photo rounded corners thi
- .about-heading: color var(--accent), font-size 1.5rem, margin-bottom 1rem
- .about-bio: color var(--text-muted), line-height 1.7, margin-bottom 1.5rem
- .about-cards: display grid, grid-template-columns repeat(3, 1fr), gap 1rem
- .info-card: background var(--bg-card), padding 1.2rem, border-radius var(--radius-md),
              border 1px solid var(--border-subtle), text-align center
              → Reference video mein Education / Current Semester / Focus cards the
- .info-card h4: color var(--accent), font-size 0.95rem, margin-bottom 0.5rem
- .info-card p: color var(--text-muted), font-size 0.85rem
```

### Step 2.6 — Skills Section Styling

```
- .skills-section: padding var(--section-padding)
- .skills-grid: display grid, grid-template-columns repeat(auto-fit, minmax(280px, 1fr)),
                 gap 1.5rem, max-width var(--max-width), margin 2rem auto, padding 0 2rem
- .skill-card: background var(--bg-card), padding 1.5rem, border-radius var(--radius-md),
               border 1px solid var(--border-subtle), transition transform, box-shadow
- .skill-card:hover: transform translateY(-4px), box-shadow 0 10px 30px var(--accent-glow)
- .skill-name: color var(--text-primary), font-weight 600, margin-bottom 0.8rem
- .skill-bar: background rgba(122, 168, 246, 0.1), height 8px, border-radius 4px, overflow hidden
- .skill-fill: background var(--accent), height 100%, border-radius 4px,
               transition width 1.5s ease-in-out
               → Reference video mein bhi progress bars the
- .skill-percentage: color var(--text-muted), font-size 0.85rem, float right
```

### Step 2.7 — Projects Section Styling

```
- .projects-section: padding var(--section-padding), position relative
- .project-filters: display flex, justify-content center, flex-wrap wrap, gap 0.75rem, margin 1.5rem 0 2.5rem
- .filter-btn: padding 0.5rem 1.2rem, border-radius var(--radius-lg), background transparent,
               border 1px solid var(--border-subtle), color var(--text-muted), cursor pointer,
               font-weight 500, font-size 0.85rem, transition all var(--transition-fast)
- .filter-btn:hover, .filter-btn.active: background var(--accent), color var(--bg-primary),
                                         border-color var(--accent), font-weight 600
- .projects-grid: display grid, grid-template-columns repeat(auto-fit, minmax(320px, 1fr)),
                   gap 1.5rem, max-width var(--max-width), margin auto, padding 0 2rem
- .project-card: background var(--bg-card), border-radius var(--radius-md),
                  border 1px solid var(--border-subtle), overflow hidden,
                  transition transform, box-shadow, display flex, flex-direction column
- .project-card:hover: transform translateY(-5px), box-shadow 0 15px 40px var(--accent-glow)
- .project-card-body: padding 1.5rem, flex 1, display flex, flex-direction column
- .project-title: font-size 1.2rem, font-weight 700, margin-bottom 0.5rem
- .project-desc: color var(--text-muted), font-size 0.9rem, line-height 1.6,
                  margin-bottom 1rem, flex 1
- .project-tags: display flex, flex-wrap wrap, gap 0.5rem, margin-bottom 1rem
- .project-tag: background var(--accent-glow), color var(--accent), padding 0.2rem 0.6rem,
                 border-radius var(--radius-sm), font-size 0.8rem
- .project-links: display flex, gap 0.75rem, margin-top auto
- .project-link: padding 0.5rem 1rem, border-radius var(--radius-sm), font-size 0.85rem,
                  text-decoration none, font-weight 600, display inline-flex,
                  align-items center, gap 0.4rem, transition all var(--transition-normal)
- .project-link.github: border 1px solid var(--accent), color var(--accent)
- .project-link.demo: background var(--accent), color var(--bg-primary)
- .projects-toggle-container: text-align center, margin-top 2.5rem
- .show-more-btn: margin 0 auto
```

### Step 2.8 — Resume Section Styling ← NEW

```
- .resume-section: padding var(--section-padding), text-align center
- .resume-section .section-subtitle: margin-bottom 2rem
- .resume-buttons: display flex, justify-content center, gap 1.5rem, flex-wrap wrap
   → Dono buttons (.btn-primary aur .btn-outline) already Step 2.4 mein define hain
   → Yahan unhi classes reuse hongi
   → Buttons mein SVG icons bhi honge (download icon + eye icon)
```

### Step 2.9 — Contact Section Styling

```
- .contact-section: padding var(--section-padding)
- .contact-cards: display flex, flex-direction column, gap 1rem,
                   max-width 700px, margin 2rem auto, padding 0 2rem
                   → Reference video mein contact cards vertically stacked the (full-width)
- .contact-card: background var(--bg-card), padding 1.5rem, border-radius var(--radius-md),
                  border 1px solid var(--border-subtle), text-align center,
                  text-decoration none, transition all var(--transition-normal)
- .contact-card:hover: transform translateY(-3px), border-color var(--accent),
                        box-shadow 0 10px 25px var(--accent-glow)
- .contact-card h4: color var(--accent), font-size 1.1rem, margin-bottom 0.3rem
- .contact-card p: color var(--text-muted)
```

### Step 2.10 — Footer Styling

```
- .footer: text-align center, padding 2rem, color var(--text-muted),
           border-top 1px solid var(--border-subtle), font-size 0.9rem
```

### Step 2.11 — Scroll-Reveal Animation Classes

```css
/* Elements start invisible, JS adds .revealed */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Typing cursor blink */
@keyframes blink {
  0%, 100% { border-color: var(--accent); }
  50% { border-color: transparent; }
}
```

### Step 2.12 — Responsive Design (Media Queries)

```
@media (max-width: 992px):
  - Hero grid → single column (photo ke upar ya neeche)
  - About grid → single column
  - About cards → 1 column instead of 3
  - Navbar links → hide, hamburger show

@media (max-width: 768px):
  - Hero name font size smaller
  - Section padding reduce
  - Skills/projects grid → 1 column
  - Mobile menu: nav-links as vertical fullscreen/slide-in overlay
    background var(--bg-primary), flex-direction column, position fixed, etc.

@media (max-width: 480px):
  - Even smaller font sizes
  - Hero buttons stack vertically
  - Resume buttons stack vertically
  - Stat cards flex-wrap
```

### ✅ Phase 2 Verification

Browser mein refresh karo:
- [ ] Dark navy background (`#0a0f30`) poore page par
- [ ] Navbar sticky hai, glassmorphism effect (blur background), Resume button pastel blue mein
- [ ] Hero section: two columns, photo circular with blue border glow, buttons visible
- [ ] "View Projects" button filled (blue bg), "View Resume" button outlined (blue border)
- [ ] About section: photo left, text + cards right
- [ ] Skills section: grid layout (cards abhi empty — JS se bharenge)
- [ ] Projects section: grid layout (cards abhi empty — JS se bharenge)
- [ ] Resume section: centered, dono buttons dikhte hain (Download + View)
- [ ] Contact section: three stacked cards
- [ ] Mobile mein (F12 → device toolbar): hamburger dikhta hai, layout single column
- [ ] Hover effects kaam kar rahe hain — buttons par hover karo, color change + lift hota hai
- [ ] Scroll smooth hai (navbar link click karo)

---

## Phase 3: JavaScript (js/data.js + js/main.js)

> **Goal:** Sab interactive features — typing effect, data-driven cards, scroll animations, nav behavior.
> **Verify:** Browser mein refresh karo → typing animation chale, cards dikhen, scroll-reveal kaam kare.

### Step 3.1 — data.js (Data File)

```javascript
// ===== SKILLS DATA =====
const skillsData = [
  { name: "Python",           level: 90 },
  { name: "LangChain",        level: 85 },
  { name: "LangGraph",        level: 75 },
  { name: "CrewAI",           level: 80 },
  { name: "FastAPI",          level: 70 },
  { name: "RAG / LLMs",       level: 85 },
  { name: "Microsoft Azure AI", level: 75 },
  { name: "Git",              level: 80 },
];

// ===== PROJECTS DATA =====
// Note: Latest projects pehle add hongi (id/date parameter ke sath)
const projectsData = [
  {
    id: 2,
    title: "GitHub Bug-Fixing Agent Pipeline",
    description: "Multi-agent pipeline using CrewAI and Gemini for automated GitHub issue analysis and bug fixing via MCP. Deployed on Streamlit.",
    category: "agentic-ai",  // Options: 'gen-ai', 'agentic-ai', 'ml'
    tags: ["CrewAI", "Gemini", "GitHub MCP", "Streamlit"],
    github: "https://github.com/syedalimehdii/bug-fixer-agent",
    demo: "#",
    date: "2026-08-01"
  },
  {
    id: 1,
    title: "Enterprise RAG Knowledge Base",
    description: "Production RAG system built with LangChain, Azure AI Search, and FastAPI for context-aware Q&A over enterprise documents.",
    category: "gen-ai",
    tags: ["RAG", "LangChain", "Azure AI", "FastAPI"],
    github: "https://github.com/syedalimehdii",
    demo: "#",
    date: "2026-07-15"
  }
];

// ===== EXPERIENCE DATA =====
const experienceData = [
  // Example object
  { role: "Software Engineer", company: "Tech Corp", duration: "2024 - Present", description: "Worked on AI." }
];

// ===== CERTIFICATES DATA =====
const certificatesData = [
  // Example object
  { title: "Azure AI Engineer", issuer: "Microsoft", date: "2025", link: "#" }
];

// ===== TYPING TEXT DATA =====
const typingTexts = [
  "AI/ML Engineer",
  "Generative AI & NLP",
  "Agentic AI Developer",
];
```

> **Note:** `data.js` sirf data hai. Future mein koi naya project ya skill add karna ho to BAS yahi file kholni hai — code kabhi touch nahi karna padega.

### Step 3.2 — main.js — Typing Effect

```
Function: typeEffect()
- typingTexts array se ek ek text lo
- Character by character type karo → then pause → then erase → next text
- Cursor blinking CSS se handle hogi (already Step 2.11 mein hai)
- Target element: #typed-text
- Speeds: typing 100ms, erasing 50ms, pause between words 1500ms
```

### Step 3.3 — main.js — Skills Card Generation

```
Function: renderSkills()
- skillsData array par loop
- Har skill ke liye ek card create karo:
  <div class="skill-card reveal">
    <div class="skill-header">
      <span class="skill-name">{name}</span>
      <span class="skill-percentage">{level}%</span>
    </div>
    <div class="skill-bar">
      <div class="skill-fill" style="width: 0%;" data-level="{level}"></div>
    </div>
  </div>
- Append to #skills-grid
- Progress bar width initially 0 — Intersection Observer trigger karega fill animation
```

### Step 3.4 — main.js — Projects Card Generation, Filtering & Pagination

```
Logic Overview:
- Global state: `currentCategory = 'all'`, `isExpanded = false`, `INITIAL_LIMIT = 3`

Function: getFilteredProjects()
1. projectsData ko date/id ke mutabiq Latest to Oldest sort karo (sort by date descending).
2. Agar `currentCategory !== 'all'` -> filter projects by `category === currentCategory`.
3. Return processed list.

Function: renderProjects()
1. `filtered = getFilteredProjects()`
2. Check `visibleProjects = isExpanded ? filtered : filtered.slice(0, INITIAL_LIMIT)`
3. Render `visibleProjects` in #projects-grid.
4. Show/Hide #show-more-btn:
   - Agar `filtered.length <= INITIAL_LIMIT` -> hide button.
   - Agar `filtered.length > INITIAL_LIMIT` -> show button.
   - Button text update: `isExpanded ? "Show Less" : "Show More"`.

Function: initProjectFilters()
- Category filter buttons (`.filter-btn`) click listener:
  - Active class update karo
  - `currentCategory = btn.dataset.filter`
  - `isExpanded = false` (reset expand status on filter change)
  - `renderProjects()` re-run karo.

Function: initShowMoreToggle()
- `#show-more-btn` click listener:
  - `isExpanded = !isExpanded`
  - `renderProjects()` re-run karo.
  - Agar `!isExpanded` -> `#projects` section par smooth scroll karo taaki page jumps view fix ho.
```

### Step 3.5 — main.js — Scroll-Reveal (Intersection Observer)

```
Function: initScrollReveal()
- querySelectorAll('.reveal')
- IntersectionObserver banao (threshold: 0.15)
- Jab element viewport mein aaye → class 'revealed' add karo
- Skill bars ke liye special: jab skill-fill visible ho → width set karo data-level se

Yeh browser ka built-in API hai — koi library nahi chahiye.
```

### Step 3.6 — main.js — Navbar Behavior

```
Features:
1. Scroll par navbar background darken (agar transparency/blur use kiya hai)
2. Active nav link update based on scroll position
   - Scroll event par check karo kaun sa section viewport mein hai
   - Us section ka nav link .active class mile
3. Smooth scroll for nav links (CSS scroll-behavior se bhi ho sakta hai,
   ya JS mein scrollIntoView use karo)
4. Mobile hamburger toggle:
   - #hamburger click → toggle class 'active' on #nav-links
   - Nav links click → close mobile menu
```

### Step 3.7 — main.js — Initialize Everything

```javascript
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  renderProjects();
  typeEffect();
  initScrollReveal();
  initNavbar();
});
```

### ✅ Phase 3 Verification

Browser mein refresh karo:
- [ ] Typing animation hero mein chal rahi hai: "AI/ML Engineer" type → erase → "Generative AI & NLP" type → ...
- [ ] Skills section mein cards dikhai de rahe hain with progress bars
- [ ] Jab skills section tak scroll karo → progress bars smoothly fill hote hain
- [ ] Projects section mein flagship project ka card hai (title, description, tags, GitHub + Demo buttons)
- [ ] Scroll karte waqt sections fade-in hote hain (reveal animation)
- [ ] Navbar mein active link scroll position ke saath change hota hai
- [ ] Mobile view (F12 → toggle device toolbar):
  - [ ] Hamburger icon dikhta hai
  - [ ] Click karne par menu khulta hai
  - [ ] Menu mein link click karne par menu band hota hai aur us section par scroll ho jata hai
- [ ] "View Projects" button → Projects section par le jata hai
- [ ] "View Resume" button (hero) → resume.pdf naye tab mein khulta hai
- [ ] Navbar "Resume" button → resume.pdf download hota hai
- [ ] Resume section buttons:
  - [ ] "Download Resume" → file download
  - [ ] "View Resume" → naye tab mein PDF khulta hai
- [ ] Contact cards ke links kaam karte hain (email/github/linkedin)
- [ ] Console mein koi error nahi (F12 → Console)

---

## Final Checklist — Deploy Se Pehle

| # | Task | Status |
|---|------|--------|
| 1 | Profile photo `assets/images/profile.png` mein daali | ✅ |
| 2 | Resume PDF `assets/resume.pdf` mein daali | ⬜ |
| 3 | Stat cards mein real numbers (certifications, internships) | ⬜ |
| 4 | About bio real text se replace kiya | ⬜ |
| 5 | Contact links real hain (email, github URL, linkedin URL) | ⬜ |
| 6 | Flagship project ki GitHub + Demo links real hain | ⬜ |
| 7 | `.nojekyll` file root mein hai | ⬜ |
| 8 | Favicon added | ⬜ |
| 9 | OG image for link previews | ⬜ |
| 10 | Mobile responsiveness checked (phone sizes) | ⬜ |
| 11 | All hover effects working | ⬜ |
| 12 | Scroll animations smooth | ⬜ |
| 13 | Resume download working | ⬜ |
| 14 | Resume view (new tab) working | ⬜ |
| 15 | Pushed to `syedalimehdii.github.io` repo | ⬜ |
| 16 | GitHub Pages enabled, live link tested | ⬜ |

---

## Summary of User Requirements Implementation

| # | User Requirement | Where Implemented |
|---|-----------------|-------------------|
| 1 | Navbar mein Resume Download | Step 1.2 → `nav-resume-btn` with `download` attribute |
| 2 | Hero mein View Projects + View Resume buttons | Step 1.3 → `hero-buttons` div with 2 buttons |
| 3 | Contact se pehle Resume Download + View buttons | Step 1.7 → New `resume-section` between Projects and Contact |
| 4 | Latest-to-Oldest Project Order | Step 3.4 → JS date/id descending sorting logic |
| 5 | Initial 3 Projects + Show More / Show Less | Step 1.6 & Step 3.4 → Pagination toggle logic |
| 6 | Category Filter Tabs | Step 1.6 & Step 3.4 → Interactive tab filter logic |
| 7 | Ambient Glow & Textured Dark Background | Step 2.1 & Step 2.2 → Radial gradient ambient light orbs + mesh overlay |
