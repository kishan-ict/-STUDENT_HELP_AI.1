<div align="center">

<br/>

```
███████╗████████╗██╗   ██╗██████╗ ███████╗███╗   ██╗████████╗    ███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗
██╔════╝╚══██╔══╝██║   ██║██╔══██╗██╔════╝████╗  ██║╚══██╔══╝    ████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝
███████╗   ██║   ██║   ██║██║  ██║█████╗  ██╔██╗ ██║   ██║       ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗
╚════██║   ██║   ██║   ██║██║  ██║██╔══╝  ██║╚██╗██║   ██║       ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║
███████║   ██║   ╚██████╔╝██████╔╝███████╗██║ ╚████║   ██║       ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║
╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
```

<h3>Your AI-powered academic companion — built for students, by a student.</h3>

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-96.2%25-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)](#license)

</div>

---

## What is Student Nexus AI?

**Student Nexus AI** is a smart, all-in-one academic productivity app that helps college students study smarter, manage burnout, and build side projects — all powered by Google Gemini AI.

From clearing subject doubts in real time to generating complete project ideas and tracking your mental wellness, Student Nexus AI is your personal academic co-pilot. No fluff, just focused tools built around how students actually work.

---

## Core Modules

### 🧠 Study AI
Ask any academic question and get instant, well-structured AI-generated explanations. Conversation history is maintained so you can follow up, go deeper, or pivot topics mid-session — just like talking to a smart tutor.

### 🌿 Wellness
Track your mental health and academic stress. The wellness module helps students identify burnout patterns, reflect on their well-being, and stay consistent through busy exam seasons.

### ⚡ Project Generator
Stuck on what to build for your next hackathon or semester project? Describe your interests or tech stack and let the AI generate complete, viable project ideas with context and direction.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript 5.8 (96.2% of codebase) |
| UI Framework | React 19 |
| Build Tool | Vite 6 |
| AI Engine | Google Gemini API |
| Animations | Framer Motion |
| Icons | Lucide React |

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- A Google Gemini API key → [Get one free here](https://ai.google.dev)

### 1. Clone the repo

```bash
git clone https://github.com/kishan-ict/-STUDENT_HELP_AI.1.git
cd -STUDENT_HELP_AI.1
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your environment

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ Never commit your `.env.local` file. It's already gitignored.

### 4. Run the dev server

```bash
npm run dev
```

App runs at → `http://localhost:5173`

### Build for production

```bash
npm run build      # Creates optimized /dist build
npm run preview    # Preview the build locally before deploying
```

---

## Project Structure

```
-STUDENT_HELP_AI.1/
│
├── components/
│   ├── Auth.tsx           # Login + multi-step onboarding flow
│   ├── Dashboard.tsx      # Main hub — entry to all modules
│   ├── Landing.tsx        # App landing/splash screen
│   ├── StudyAI.tsx        # AI-powered Q&A chat interface
│   ├── Wellness.tsx       # Mental health & burnout tracker
│   └── modules/
│       └── ProjectGen.tsx # AI project idea generator
│
├── services/
│   └── geminiService.ts   # Gemini API calls and response handling
│
├── App.tsx                # Root component — view routing & state
├── index.tsx              # React entry point
├── index.html             # HTML shell
├── types.ts               # Global TypeScript types & interfaces
├── metadata.json          # AI Studio app config
├── package.json           # Scripts & dependencies
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite build config
└── .env.local             # API keys (not committed)
```

---

## App Flow

```
Landing → Auth (Login) → Onboarding (3 steps) → Dashboard
                                                      │
                              ┌───────────────────────┼───────────────────────┐
                              ▼                       ▼                       ▼
                          Study AI               Wellness              Project Gen
                     (AI Q&A chat)         (Mental health)        (Idea generator)
```

User profiles are collected during onboarding (name, education level, interests, goal year) and used to personalize the experience.

---

## Roadmap

- [ ] Subject-specific prompt templates (Math, Physics, CS, etc.)
- [ ] Exam prep mode with timed mock questions
- [ ] Google Drive integration for note syncing
- [ ] Personalized learning paths based on user profile
- [ ] Study session analytics and progress tracking
- [ ] Multi-language support
- [ ] Offline mode for basic features
- [ ] Mobile-responsive PWA build

---

## Contributing

This is a personal project but open for contributions. Here's how to get involved:

1. Fork the repository
2. Create a feature branch → `git checkout -b feat/your-feature`
3. Commit your changes → `git commit -m "feat: add your feature"`
4. Push and open a pull request

Please keep PRs focused and well-described.

---

## Troubleshooting

**API errors in console?**
Check that your `GEMINI_API_KEY` is correctly set in `.env.local` and that you haven't exceeded Google's free tier quota.

**Hot reload not working?**
Make sure Vite is running with `npm run dev`, not a static file server.

**TypeScript errors?**
Run `npx tsc --noEmit` to diagnose type issues without building.

---

## License

This project is currently private. A license will be added upon public release.

---

## Contact

**Kishan Patil** — ICT Student, Marwadi University  
📧 [kishanmpatil.1@gmail.com](mailto:kishanmpatil.1@gmail.com)  
🔗 [GitHub  @kishan-ict](https://github.com/kishan-ict)

---

<div align="center">
  <sub>Built with ❤️ for students, by a student.</sub>
</div>
