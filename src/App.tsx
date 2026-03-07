import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";

import AppRoutes from "./router/routes";

function ScrollAnimations() {
  const location = useLocation();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const id = requestAnimationFrame(() => {
      const sections = document.querySelectorAll<HTMLElement>(
        "main section:not(.hero)"
      );

      if (!sections.length) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: [0, 0.15, 0.35, 0.5],
          rootMargin: "0px 0px -15% 0px",
        }
      );

      sections.forEach((section) => {
        section.classList.add("reveal-section");
        section.classList.remove("is-visible");
        observer?.observe(section);
      });
    });

    return () => {
      cancelAnimationFrame(id);
      observer?.disconnect();
    };
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollAnimations />
      <AppRoutes />
    </BrowserRouter>
  );
}