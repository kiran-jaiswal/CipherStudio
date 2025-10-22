# CipherStudio

**A Browser-Based React IDE**

CipherStudio is a lightweight in-browser React IDE built using **React (Vite)** for the frontend and **Express.js + MongoDB** for backend persistence. It allows users to create, edit, preview, and save React projects directly in the browser.

---

## 🚀 Features

* Create, delete, and manage files
* Real-time React code editing & preview
* Save & load projects via `localStorage` or backend
* Clean, responsive UI with Tailwind CSS
* Optional: dark/light theme, autosave, login/register

---

## 🛠️ Tech Stack

**Frontend:** React (Vite), Tailwind CSS, Sandpack / Monaco Editor
**Backend:** Node.js, Express.js, MongoDB (Atlas)
**Deployment:** Vercel (frontend) + Render/Railway (backend)

---

## ⚙️ Setup

**Frontend**

```bash
git clone https://github.com/<your-username>/CipherStudio.git
cd CipherStudio/client
npm install
npm run dev
```

**Backend**

```bash
cd ../server
npm install
npm run dev
```


## 📂 Project Structure

```
cipherstudio/
├─ client/ (React + Vite)
├─ server/ (Express + MongoDB)
└─ README.md
```

---

## 💾 Save/Load Logic

* **LocalStorage:** Default for saving project state using `projectId`
* **Backend:** Optional persistence via Express + MongoDB API

---

## 🌐 Deployment

* Frontend & Backend→ Vercel


---

## 🧑‍💻 Author

Built by **Kiran Jaiswal** — for CipherStudio assignment demonstration.

---

## 📜 License

MIT License
