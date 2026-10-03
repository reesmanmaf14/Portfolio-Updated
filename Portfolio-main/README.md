# 👩‍💻 Reesman — Personal Portfolio

### Software Engineering Student | Full-Stack Web Development | AI & Machine Learning

Welcome to my personal portfolio! 🚀
This website showcases my **skills, projects, education, certifications, and interests** in software development.

### 🌐 Live Portfolio

**✨[View My Portfolio](https://reesmanmaf14.github.io/Portfolio/)**

### 🛠️ Tech Stack

**Frontend:** HTML5 · CSS3 · JavaScript · Bootstrap
**Backend:** PHP · Laravel
**Database:** MySQL
**Tools:** Git · GitHub · VS Code · Figma

### 📌 Featured Projects

* 🏥 **SpeechCare** — Web-Based Clinic Management System
* 📚 **Book Selling Application** — C# Desktop Application

### 🎯 Interests

`· Full-Stack Development` · `AI/ML` · `UI/UX`

---

⭐ **Explore my portfolio and projects!**

---

## 🧑‍💻 Development

Built with **React + Vite + Tailwind CSS v4 + GSAP** (icons: lucide-react).

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # serve the production build
```

**Editing content:** everything lives in `src/data/`:
`profile.js` (name, links, about), `skills.js`, `projects.js`, `certifications.js`,
`timeline.js` (education + experience), `interests.js` (interests + currently exploring).
Images and the CV are in `public/assets/`.

**Contact form:** set `VITE_CONTACT_API_URL` (see `.env.example`). Without it the form
opens the visitor's email app instead of posting.

**Deploy:** `.github/workflows/deploy.yml` builds and publishes to GitHub Pages on push to `main`
(Settings → Pages → Source: *GitHub Actions*).
