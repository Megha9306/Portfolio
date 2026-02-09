# Megha Pareek — Portfolio Website

A dynamic, animated portfolio website with a data science/AI themed design.

## 🌐 Live Demo

After deploying to GitHub Pages, your site will be available at:
`https://YOUR-USERNAME.github.io/work-portfolio/`

---

## 🚀 Deploying to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click **New repository** (+ icon in top right)
3. Name it `work-portfolio` (or any name you prefer)
4. Keep it **Public** (required for free GitHub Pages)
5. Don't initialize with README (you already have files)
6. Click **Create repository**

### Step 2: Push Your Code

Open a terminal in your portfolio folder and run:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/work-portfolio.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in left sidebar)
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

Your site will be live in 1-2 minutes at your GitHub Pages URL!

---

## ✏️ Customizing Your Portfolio

### Update Contact Links

Edit `index.html` and replace placeholders in the contact section:

```html
<!-- Find and update these lines -->
<a href="mailto:your.email@example.com" ...>  <!-- Your email -->
<a href="https://linkedin.com/in/your-profile" ...>  <!-- Your LinkedIn -->
<a href="https://github.com/your-username" ...>  <!-- Your GitHub -->
```

### Change Colors

Edit the color variables at the top of `styles.css`:

```css
:root {
    --color-primary: #64b5c7;       /* Main accent color */
    --color-accent: #c4a7e7;        /* Secondary accent */
    --color-bg-dark: #0f1419;       /* Background */
}
```

---

## 📁 File Structure

```
work-portfolio/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # Interactivity and particles
└── README.md       # This file
```

## ✨ Features

- **Particle background** — Neural network-style floating connections
- **Scroll animations** — Elements reveal as you scroll
- **Typing effect** — Rotating titles in hero section
- **3D card tilt** — Interactive hover effects on project cards
- **Counter animation** — Stats animate when visible
- **Fully responsive** — Works on all screen sizes
- **Calm color scheme** — Soft teal and lavender tones

---

Built with ❤️ by Megha Pareek
