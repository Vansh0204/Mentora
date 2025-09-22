## Mentora

A modern mentorship platform built with React, Vite, and Tailwind CSS. It features a rich dashboard, leaderboards, community sections, and optional Firebase integration for auth and data. The project is optimized for fast local development with Vite and supports dark mode via Tailwind.

### Features
- **Responsive UI**: Tailwind CSS with dark mode (`class` strategy)
- **Routing**: Client-side routing with `react-router-dom`
- **Animations**: Page transitions via `framer-motion` and Lottie animations
- **Components**: Reusable UI like topbar, sidebar, theme toggle, carousels
- **Pages**: Dashboard, Leaderboard, Mentor Match, Certifications, Community, Badges, Profile, Sessions, Bookings, Welcome, Home
- **Optional Firebase**: Auth and Firestore with safe fallback mocks when env is missing

### Tech Stack
- **Frontend**: React 18, Vite 5, React Router v6
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **UX**: Framer Motion, Lottie
- **Utilities**: Axios, React Icons, Swiper, React Slick
- **Backend (optional)**: Firebase (Auth, Firestore)

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```
Vite will print a local dev URL. Open it in your browser.

### Build
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Environment Variables (Firebase)
Firebase is optional. If you do not provide env vars, the app falls back to mock implementations so it still runs for demos.

Create a `.env` file in the project root with these variables if you want real Firebase:
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```
These are consumed in `src/firebase.js` via `import.meta.env.*`.

## Project Structure
```
Mentora-main/
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ index.css
│  ├─ firebase.js
│  ├─ assets/
│  │  └─ lottie/
│  │     └─ hero-mentorship.json
│  ├─ components/
│  │  ├─ ContactForm.jsx
│  │  ├─ DashboardLayout.jsx
│  │  ├─ HeroLottie.jsx
│  │  ├─ HowItWorksTimeline.jsx
│  │  ├─ LoadingScreen.jsx
│  │  ├─ Sidebar.jsx
│  │  ├─ TestimonialsCarousel.jsx
│  │  ├─ ThemeToggle.jsx
│  │  ├─ Topbar.jsx
│  │  ├─ UserProfileModal.jsx
│  │  └─ XPLeaderboard.jsx
│  └─ pages/
│     ├─ Home.jsx
│     ├─ Dashboard.jsx
│     ├─ LeaderboardPage.jsx
│     ├─ DemoSkillSwap.jsx
│     ├─ MentorMatch.jsx
│     ├─ Certifications.jsx
│     ├─ Community.jsx
│     ├─ Badges.jsx
│     ├─ Profile.jsx
│     ├─ Sessions.jsx
│     ├─ Bookings.jsx
│     ├─ SkillSwap.jsx
│     ├─ SkillSwap.css
│     └─ Welcome.jsx
```

## Routing
Routes are defined in `src/App.jsx` using `react-router-dom`. Example paths:
- `/` → Home
- `/dashboard` → Dashboard
- `/leaderboard` → Leaderboard
- `/skillswap` and `/demo-skillswap` → Demo Skill Swap
- `/mentormatch` → Mentor Match
- `/certifications`, `/community`, `/badges`, `/profile`, `/welcome`, `/sessions`, `/bookings`

## Styling and Theming
- Tailwind is configured in `tailwind.config.js` with `darkMode: 'class'`.
- Toggle themes via the `ThemeToggle` component and add/remove the `dark` class on the root element as needed.

## Notes
- The loading experience is implemented with `LoadingScreen` and page transitions are wrapped in `AnimatePresence`.
- If Firebase env vars are not provided, `src/firebase.js` logs that it is using mock implementations so the app remains functional in demo mode.

## License
Add your preferred license here (e.g., MIT). If omitted, this code is proprietary by default.
