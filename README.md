# Multilingual Learning Platform

A professional-grade, serverless multilingual learning ecosystem built to provide an engaging and personalized learning experience for users across different languages. The platform operates from a single centralized administration panel, where administrators can manage every aspect of the application.

## 🌟 Overview

Rather than maintaining separate websites for each language, this platform provides a unified solution where administrators can create and manage content independently for each supported language. Every language has its own dedicated content library, allowing the admin to publish localized educational resources while keeping all management within a single platform.

## ✨ Features

### Centralized Content Management
For each language, administrators can upload and organize:
- 📚 Structured lessons and study modules
- 📝 Notes and downloadable PDFs
- 🖼️ Images and infographics
- 🎥 Video lessons and recorded classes
- 🎙️ Voice notes and audio lessons
- 📄 Documents and learning materials
- ❓ Quizzes and assessments
- 📢 Announcements and updates
- 🔗 External learning resources and references

### Personalized Learning Experience
Users can securely register and log in using Supabase Authentication. During registration or from their profile settings, they can select their preferred language. Once selected, the platform automatically displays:
- The user interface in the chosen language
- Lessons specific to that language
- Videos and audio resources
- Notes and downloadable materials
- Quizzes and assessments
- Community discussions related to that language

Users can switch languages at any time, instantly accessing the corresponding learning content.

### Community & Discussion Platform
To encourage collaborative learning, the platform includes a built-in community space where learners can interact with one another:
- Language-specific discussion communities
- Real-time group chat
- Topic-based discussion channels
- Question & Answer forums
- Reply threads and conversations
- Media sharing (images, documents, voice messages)
- Reactions and emojis
- User mentions (@username)
- Community moderation tools
- Instructor announcements
- Pinned educational resources

Each language community remains separate, allowing learners to communicate comfortably in their preferred language while keeping discussions relevant and organized.

### Administration Features
The administrator dashboard provides complete control over the platform:
- User management
- Role and permission management
- Language management
- Content publishing
- Media management
- Quiz management
- Community moderation
- Analytics and reporting
- Notification management
- Course organization
- Resource categorization

## 🏗️ Technical Architecture

The platform follows a modern serverless architecture designed for scalability and security.

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **i18next** - Internationalization

### Backend
- **Supabase PostgreSQL** - Database
- **Supabase Authentication** - User authentication
- **Supabase Storage** - File storage
- **Supabase Realtime** - Live chat and notifications
- **Supabase Edge Functions** - Serverless functions
- **Row-Level Security (RLS)** - Data security

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A Supabase project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abhi963007/languages-platform.git
cd languages-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## 📦 Core Features Summary

- 🌍 Fully multilingual learning platform
- 👨‍💼 Centralized admin dashboard
- 📚 Language-specific learning content
- 🎥 Video learning support
- 🎙️ Voice note lessons
- 📝 Notes and PDF resources
- 🖼️ Image galleries
- 📂 Document management
- 🧩 Interactive quizzes
- 💬 Real-time community chat
- 👥 Language-based discussion groups
- 🔔 Real-time notifications
- ❤️ Reactions, replies, and discussions
- 📱 Responsive design
- 🔒 Secure authentication and role-based access
- ☁️ Fully serverless architecture powered by Supabase

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

This approach creates more than a learning website—it builds a complete multilingual learning community where administrators manage localized educational content while learners study, interact, and collaborate within language-specific communities.
