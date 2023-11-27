import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>,
);
