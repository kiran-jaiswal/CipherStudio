export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  parentId?: string;
}

export interface Project {
  id: string;
  name: string;
  files: FileNode[];
  activeFileId: string | null;
  createdAt: number;
  updatedAt: number;
}

export const DEFAULT_FILES: FileNode[] = [
  {
    id: 'index-html',
    name: 'index.html',
    type: 'file',
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>
  </body>
</html>`,
  },
  {
    id: 'app-jsx',
    name: 'App.jsx',
    type: 'file',
    content: `import React, { useState } from 'react';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Welcome to CipherStudio! 🚀</h1>
      <p>Start building your React app here.</p>

      <div className="counter">
        <button onClick={() => setCount(count - 1)}>-</button>
        <span className="count">{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}`,
  },
  {
    id: 'styles-css',
    name: 'styles.css',
    type: 'file',
    content: `.App {
  font-family: system-ui, -apple-system, sans-serif;
  text-align: center;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

button {
  background: white;
  color: #667eea;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}

.count {
  font-size: 2rem;
  font-weight: bold;
  min-width: 3rem;
}`,
  },
  {
    id: 'index-js',
    name: 'index.jsx',
    type: 'file',
    content: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
  },
];
