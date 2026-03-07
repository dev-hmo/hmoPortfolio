# <p align="center">🚀 Premium 3D Developer Portfolio & Admin Ecosystem</p>

<p align="center">
  <img src="./header.png" alt="Portfolio Header" width="100%">
</p>

<p align="center">
  <b>A high-end, cinematic developer portfolio engineered for speed, immersion, and seamless content management.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/Three.js-Orbiting-blueviolet?style=for-the-badge&logo=three.js" alt="Three.js">
  <img src="https://img.shields.io/badge/MongoDB-Cloud-green?style=for-the-badge&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/Tailwind-Styling-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel" alt="Vercel">
</p>

---

## 💎 Core Pillars

### 🌌 Immersive 3D Experience
*   **Galactic Background**: A floating particle field built with `@react-three/fiber` that reacts to scroll and motion.
*   **Aceternity Typewriter**: High-performance staggered character animation for a premium feel in the Hero section.
*   **3D Perspective Interaction**: Container components that physically tilt and "pop" along the Z-axis.

### ⚡ Performance & Motion
*   **AnimeJS v4 Engine**: Tactical staggered spring animations for section entries.
*   **Instant Load Sequence**: A sophisticated `<Atom />` loader ensuring all heavy 3D assets are ready before reveal.
*   **Bento Layout**: A responsive, high-density grid system that scales from 4K to mobile.

### 🛠 Enterprise Admin Dashboard
*   **Unified Command Center**: A full-fledged dashboard to manage blog posts, projects, experiences, and more.
*   **Aesthetic Alignment**: Deep glassmorphism and galactic styling that mirrors the main site.
*   **Flexible Metadata**: A new list-based UI to manage multiple job titles with an "Add More" flow.

---

## 🛠 Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Frontend** | [Next.js](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| **3D Engine** | [Three.js](https://threejs.org/), [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) |
| **Motion** | [Framer Motion](https://www.framer.com/motion/), [Anime.js v4](https://animejs.com/) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas/database) (Mongoose) |
| **State** | [Zustand](https://github.com/pmndrs/zustand) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |

---

## 🚀 Quick Start (Local Setup)

### 1. Requirements
Ensure you have **Node.js 18+** and a **MongoDB** connection string.

### 2. Installation
```bash
git clone https://github.com/dev-hmo/your-repo.git
cd your-repo
npm install
```

### 3. Environment Config
Create a `.env.local` and populate it using `.env.example`:
```env
MONGODB_URI=your_mongodb_uri
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_secret_random_string
```

### 4. Seed the Database
**IMPORTANT**: This step populates your MongoDB cluster with all initial 3D grid layout items and portfolio data.
```bash
npx tsx seed.mts
```

### 5. Launch
```bash
npm run dev
```

---

## 🚀 Deployment (Vercel)

The app is optimized for **Vercel**. 
1. Push your code to GitHub.
2. Link the project in Vercel.
3. Add your `.env` variables (referencing `.env.example`) in Vercel's Dashboard.
4. Deployment will auto-build using the optimized Turbopack engine.

---

## 👨‍💻 Author

**Hlaing Min Oo**
- **GitHub**: [@dev-hmo](https://github.com/dev-hmo)
- **LinkedIn**: [Hlaing Min Oo](https://linkedin.com/in/hlaing-min-oo-656369240)

---

<p align="center">
  <i>Developed with precision and passion.</i>
</p>
