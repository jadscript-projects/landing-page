import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n";
import { Navbar, Footer } from "./components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="flex flex-col max-w-6xl mx-auto px-2 md:px-4 lg:px-6 xl:px-0">
      <Navbar />
      <App />
      <Footer />
    </main>
  </StrictMode>,
);
