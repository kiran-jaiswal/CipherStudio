# 🔐 CipherStudio

**Your Browser-Based React IDE**

CipherStudio is an interactive, browser-based React IDE that empowers users to create, manage, and preview React projects live. Experience a real online development environment similar to CodeSandbox, designed for seamless frontend development and project management.

---

## ✨ Features

**Core Features:**

* 📁 **File Management:** Create, delete, and organize project files effortlessly.
* 📝 **Code Editor:** Integrated Monaco Editor or Sandpack editor for smooth React coding.
* 👀 **Live Preview:** See your React app update instantly as you code.
* 💾 **Save & Load Projects:** Persist your work in `localStorage` or backend using a unique `projectId`.
* 🎨 **Clean UI/UX:** Intuitive interface for smooth coding experience.

**Additional Features:**

* 🌙 **Theme Switcher:** Toggle between Dark & Light modes.
* ✏️ **Rename Files/Folders:** Easily manage project structure.
* 🔐 **Login/Register:** Secure authentication system.
* ⏱️ **Autosave:** Toggle automatic saving of projects.
* 📱 **Responsive Design:** Fully usable on desktop and tablet screens.
* 🚀 **Deployment Ready:** Smooth deployment and hosting setup.

---

## 🛠️ Tech Stack

**Frontend:**

* React (Vite) ⚛️
* Tailwind CSS ✨
* Sandpack / Monaco Editor for live coding and preview

**Backend (Optional):**

* Node.js + Express.js 🔧
* MongoDB (Atlas) for project persistence 🗄️

**Deployment:**

* Vercel (frontend) & (backend) 🌐


---

## ⚡ Getting Started

**Frontend Setup:**

```bash
git clone https://github.com/<your-username>/CipherStudio.git
cd CipherStudio/client
npm install
npm run dev
```

**Backend Setup (Optional):**

```bash
cd ../server
npm install
npm run dev
```



## 📂 Project Structure

```
cipherstudio/
├─ client/    # React + Vite frontend
│  ├─ src/
│  │  ├─ components/      # UI components and editor integration
│  │  ├─ pages/           # Editor and preview pages
│  │  ├─ lib/             # Helper utilities
│  │  └─ App.jsx          # Main app component
│  └─ package.json
├─ server/    # Express backend
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  └─ index.js
└─ README.md
```

---

## 💾 Save & Load Workflow

**LocalStorage:**

* Save: `localStorage.setItem('cipherstudio_project_<projectId>', JSON.stringify(projectData))`
* Load: `localStorage.getItem('cipherstudio_project_<projectId>')`

**Backend (Optional):**

* Save via `POST /api/projects`
* Load via `GET /api/projects/:projectId`
* Payload includes projectId, file contents, and timestamps

---

## 🖥️ Editor Integration

**Sandpack Approach:**

* Instant live preview with built-in editor and bundler
* Programmatically update files as users edit code

**Monaco Approach:**

* Robust coding interface
* Requires iframe/bundler setup for live preview

---

## 🎨 UI/UX Notes

* Sidebar for project file tree and actions
* Main editor area
* Right panel for live preview
* Toolbar with Save, Run, ProjectId display, Theme toggle, and Autosave toggle

---

## 🌐 Deployment Notes

* Frontend: Vercel
* Backend: Render / Railway / Cyclic
* Ensure environment variables and CORS are configured

---

## 📜 License

MIT License

---

Built with ❤️ by **Kiran Jaiswal**
