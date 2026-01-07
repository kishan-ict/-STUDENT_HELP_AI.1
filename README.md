# Student Nexus AI 🎓

> **Your Personal AI Study Companion** — Powered by Google Gemini

Student Nexus AI is an intelligent web application designed to help students with doubts, study planning, and academic productivity. Built with modern TypeScript and Vite, it leverages Google's Gemini AI to provide real-time assistance for learning.

---

## ✨ Features

- **AI-Powered Q&A**: Get instant answers to study questions across any subject
- **Smart Explanations**: Gemini AI breaks down complex concepts into digestible explanations
- **Fast & Responsive**: Built with React 19 and Vite for lightning-fast performance
- **TypeScript First**: Fully typed codebase for reliability and maintainability
- **Smooth Animations**: Beautiful UI with Framer Motion for enhanced user experience
- **Modern UI Components**: Lucide React icons and custom components for a clean interface

---

## 🛠 Tech Stack

| Component | Technology |
|-----------|------------|
| **Language** | TypeScript (96.2%) |
| **Frontend** | React 19 + Vite 6 |
| **AI Engine** | Google Gemini API |
| **Styling & Animation** | Framer Motion, Lucide React |
| **Build Tool** | Vite with React Plugin |
| **Type Safety** | TypeScript 5.8 |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- **Google Gemini API Key** ([Get one here](https://ai.google.dev))

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kishan-ict/-STUDENT_HELP_AI.1.git
   cd -STUDENT_HELP_AI.1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your API key**
   - Create a `.env.local` file in the root directory
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build      # Build the app
npm run preview    # Preview the production build locally
```

---

## 📁 Project Structure

```
student-nexus-ai/
├── components/          # Reusable React components
├── services/            # Gemini API integration & business logic
├── App.tsx              # Main application component
├── index.tsx            # React entry point
├── index.html           # HTML template
├── types.ts             # TypeScript type definitions
├── metadata.json        # AI Studio app configuration
├── package.json         # Dependencies & scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite build configuration
└── .env.local           # Environment variables (not committed)
```

### Key Files Explained
- **`components/`** — UI components (buttons, cards, chat interface, etc.)
- **`services/`** — Handles Gemini API calls and response processing
- **`App.tsx`** — Root component with routing and state management
- **`metadata.json`** — Generated from AI Studio; stores app configuration
- **`types.ts`** — Global TypeScript interfaces and types

---

## 🧠 How It Works

1. User asks a study question in the chat interface
2. Query is sent to Google Gemini API via the services layer
3. AI generates contextual, educational responses
4. Response is displayed with formatting and syntax highlighting
5. Conversation history is maintained for context

---

## 🔧 Development

### Available Scripts
```bash
npm run dev       # Start dev server with hot reload
npm run build     # Create optimized production build
npm run preview   # Preview production build locally
```

### Code Style
- TypeScript for type safety
- React functional components with hooks
- Component-based architecture for reusability

### Environment Variables
| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Your Google Gemini API key |

---

## 🎯 Roadmap / Future Ideas

- [ ] Subject-specific templates (Math, Science, History, etc.)
- [ ] Exam prep mode with timed quizzes
- [ ] Note-taking integration with Google Drive
- [ ] User profiles for personalized learning
- [ ] Offline mode for basic operations
- [ ] Multi-language support
- [ ] Study session analytics & progress tracking
- [ ] Integration with popular note-taking apps


---

## 🤝 Contributing

This is a personal project, but contributions are welcome! Feel free to:
- Fork the repository
- Create a feature branch
- Submit pull requests for improvements

---

## 📄 License

This project is currently private. A license will be added once it's ready for public release.

---

## 💡 Tips

- **API Rate Limits**: Be mindful of Google Gemini API quotas
- **Local Development**: Hot reload works automatically with `npm run dev`
- **Debugging**: Check browser console for API errors and TypeScript type issues
- **Performance**: Vite provides fast build times; leverage this during development

---

## 🆘 Support

For issues or questions:
- Check the existing GitHub Issues
- Review the Gemini API documentation
- Test locally before submitting PRs
- - Contact me at [kishanmpatil.1@gmail.com](mailto:kishanmpatil.1@gmail.com)

**Built with ❤️ for students everywhere**
