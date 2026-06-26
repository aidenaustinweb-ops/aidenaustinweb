# Aiden & Austin Watches — Premium Horology Showroom

A premium, highly animated, and mobile-optimized luxury website for **Aiden & Austin Watches** (Pulpally, Wayanad) and its heritage flagship branch **Modern Radios** (serving customers since 1967 in Mananthavady, Wayanad).

This project features a state-of-the-art cinematic scrolling user experience, custom 3D web graphics, and direct integration with WhatsApp messaging for immediate customer acquisition.

---

## Key Features

- 🌌 **Cinematic Scrolling**: Custom scroll-driven timeline transitions using GSAP and ScrollTrigger, giving a premium editorial feel.
- ⚙️ **Three.js Loader**: A custom loading overlay featuring an interactive 3D watch gear movement rendered in real-time.
- 📱 **Mobile Responsiveness**: Tailored layout grids and typography scaling for Android, iOS, tablets, and low-end mobile devices.
- 🚀 **Performance Optimized**: Converted all photography to optimized `.webp` assets, reducing asset sizes by 90% and yielding instantaneous loading speeds.
- 🟢 **Dynamic WhatsApp Inquiry**: A styled inquiry form that automatically routes customer details to the chosen showroom location on WhatsApp.
- 📈 **SEO & Metadata**: Complete local business schema (JSON-LD), customized Open Graph headers, robots.txt, sitemap.xml, and target keywords for maximum Google Search indexing.

---

## Technology Stack

- **Core**: Vanilla HTML5, CSS3, ES6+ JavaScript.
- **Animation Suite**:
  - [GSAP (GreenSock)](https://gsap.com/) — High-performance timelines and staggers.
  - [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — Scroll-tied animation pinning.
  - [Lenis](https://lenis.darkroom.engineering/) — Smooth-scrollbar wrapper.
  - [SplitType](https://github.com/lucasconstantino/split-type) — Cinematic text reveals.
- **3D Engine**: [Three.js](https://threejs.org/) — Interactive 3D graphics inside the loading screen.
- **Hosting**: Pre-configured for direct Vercel static deployment and GitHub pages.

---

## Folder Structure

```
├── assets/
│   └── images/          # Compressed WebP assets & branding vectors
├── css/
│   ├── index.css        # Root variables & color system
│   ├── layout.css       # Core container grids
│   ├── components.css   # Buttons, form components, cursor, and nav
│   ├── sections.css     # Section layouts (Hero, collections, clocks, contact, footer)
│   └── animations.css   # Keyframes and utility hover animations
├── js/
│   ├── app.js           # Main application orchestrator & form router
│   ├── cinematic.js     # GSAP ScrollTrigger timeline configuration
│   ├── loader.js        # Three.js 3D loading animation loop
│   ├── nav.js           # Responsive header & link highlights
│   ├── cursor.js        # Custom cursor circle follower
│   ├── magnetic.js      # Elastic magnetic button physics
│   ├── smooth-scroll.js # Lenis scroll initializer
│   └── animations.js    # Standard stagger entry points
├── index.html           # Main markup & Local Business JSON-LD schema
├── robots.txt           # Crawling permissions
├── sitemap.xml          # Site crawling index map
└── .gitignore           # Ignored system and IDE metadata
```

---

## Deployment & Hosting

### Deploying to Vercel
This project is fully ready for zero-configuration deployment to [Vercel](https://vercel.com).
1. Push this repository to your GitHub account.
2. Go to Vercel, click **Add New Project**, and select this repository.
3. Keep the default settings (Vercel automatically detects the static HTML project).
4. Click **Deploy**.

### Deploying to GitHub Pages
1. Go to your repository **Settings** > **Pages**.
2. Under **Build and deployment**, select **Deploy from a branch** (choose `main` or `master` and path `/root`).
3. Save, and your site will be live.
