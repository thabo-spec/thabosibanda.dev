# Thabo Sibanda — Cybersecurity Portfolio

> **"From Attack Surface to Zero Risk."**

A professional cybersecurity portfolio built with Astro.js and deployed to GitHub Pages. This repository is more than a CV — it is a living record of structured security work, technical methodology, and measurable business impact.

---

## The Evidence Locker Philosophy

In security, talk is cheap. Threat actors don't care about your bullet points; they care about your controls.

The **Evidence Locker** is the core of this portfolio. Rather than listing tools or technologies in the abstract, every project entry follows a forensic documentation standard:

- **The Challenge** — the scope, target environment, and real-world threat scenario simulated
- **Tools & Methodology** — the toolchain and kill-chain phase reasoning
- **Key Findings** — documented vulnerabilities with CVSS scores and proof-of-concept evidence
- **Business Impact** — translated risk in plain language (e.g., *"This misconfiguration exposed a path to lateral movement across the internal VLAN, placing customer PII at risk of exfiltration"*)
- **Remediation** — prioritised, actionable recommendations

This structure mirrors the deliverable format expected in professional penetration testing reports and red team engagements. Every entry is evidence, not assertion.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro.js](https://astro.build) v4 |
| Styling | Tailwind CSS v3 + custom CSS variables |
| Content | Markdown / MDX (`.md` write-ups in `/src/content/projects/`) |
| Deployment | GitHub Actions → GitHub Pages |
| Fonts | Sora (headings) · DM Sans (body) · JetBrains Mono (code) |

---

## Project Structure

```
thabo-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions deployment pipeline
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ProjectCard.astro    # Evidence Locker card component
│   │   ├── SkillsRadar.astro    # D3.js radar chart
│   │   └── ThreatFeed.astro     # Live CVE/threat intelligence feed
│   ├── content/
│   │   └── projects/            # Markdown write-ups (Evidence Locker entries)
│   │       └── _template.md     # Project documentation template
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ProjectLayout.astro
│   ├── pages/
│   │   ├── index.astro          # Home / Mission
│   │   ├── about.astro          # About — story, soft skills, philosophy
│   │   ├── contact.astro        # Contact form + links
│   │   ├── skills.astro         # Skills Map — radar chart + certifications
│   │   └── evidence-locker/
│   │       └── index.astro      # Evidence Locker project listing
│   └── styles/
│       └── global.css           # CSS custom properties + base styles
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/thabosibanda/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The dev server runs at `http://localhost:4321`.

---

## Adding an Evidence Locker Entry

1. Copy `src/content/projects/_template.md` to a new file: `src/content/projects/your-project-name.md`
2. Fill in the frontmatter metadata and each section of the template
3. Commit and push — GitHub Actions deploys automatically to GitHub Pages

---

## Deployment

This site deploys automatically on every push to `main` via GitHub Actions.

**Manual setup (one-time):**
1. Go to your repo → **Settings** → **Pages**
2. Set **Source** to `GitHub Actions`
3. Push to `main` — the workflow handles the rest

Live at: `https://thabosibanda.github.io` *(update with your actual domain)*

---

## License

Content and write-ups © Thabo Sibanda. Code structure MIT licensed.
