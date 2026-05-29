# 🥗 FuelTrack

> Daily meal and workout tracker focused on seeing your macros and strength progress at a glance.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)

**FuelTrack** is a mobile-first web app I built for my own use: to keep track of what I
eat each day (calories and macronutrients) and to log my gym workouts (exercises, sets,
reps and weight). The goal is to make logging **fast** and to show progress at a glance.

> The interface is currently in Spanish; an English version of the UI is on the roadmap.

## ✨ Features

### 🍽️ Nutrition
- **Calorie ring** showing the day's intake against your target.
- **Macro bars** (protein, carbs and fat) tracking progress toward daily goals.
- **Meals by section**: breakfast, lunch, dinner and snacks.
- **Quick add** of foods through a slide-up sheet.
- **Daily tip** that calculates how many macros you have left to reach your goal.

### 📚 Food library
- List of foods with their macros per serving.
- Real-time search and a **favorites** filter.
- Option to create custom foods.

### 🏋️ Workouts
- Predefined routines (Push / Pull / Legs) as templates.
- Logging of **sets, reps and weight** per exercise.
- **Previous best** reference for each exercise so you can beat it session after session.
- Mark sets as completed and add sets or exercises on the fly.

### ⚙️ Settings
- Profile with personal data and daily goals.
- Reminders and data export (CSV / JSON).

## 🛠️ Tech stack

| Category | Technologies |
|----------|--------------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/) (Radix UI) |
| Routing | React Router v6 |
| Data fetching | TanStack Query |
| Animation | Framer Motion |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Backend (in progress) | Supabase via Lovable Cloud |
| Testing | Vitest · Testing Library · Playwright |

## 🚀 Running it locally

Requirements: [Node.js](https://nodejs.org/) 18 or higher.

```bash
# 1. Clone the repository
git clone https://github.com/valentinalorcap/fit-fuel-tracker.git
cd fit-fuel-tracker

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# fill in the values in .env (see the next section)

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`.

### Environment variables

Copy `.env.example` to `.env` and fill it in with your Supabase project details
(Project Settings → API):

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Base URL of your Supabase project |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public (anon) key for the client |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ID |

## 📜 Available scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint the code with ESLint |
| `npm test` | Run the tests |

## 📁 Project structure

```
src/
├── components/      # UI components (CalorieRing, MacroBar, WorkoutCard…)
│   └── ui/          # shadcn/ui primitives
├── pages/           # Pages: Dashboard, FoodLibrary, WorkoutPage, SettingsPage
├── hooks/           # Custom hooks
├── integrations/    # Supabase client
├── lib/             # Utilities
└── test/            # Test setup and tests
```

## 🗺️ Status and roadmap

A personal project under **active development**. The interface currently runs on sample
data; the planned next steps are:

- [ ] Persist meals and workouts with Supabase (Lovable Cloud).
- [ ] User authentication.
- [ ] Progress history and charts (weight lifted, macro trends over time).
- [ ] English version of the UI.
- [ ] Deploy a public demo.

## 📄 License

Personal project, released under the MIT License. See [LICENSE](LICENSE) for details.
