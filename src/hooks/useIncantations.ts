import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * Listens for typed incantations anywhere on the page (ignoring focused
 * inputs/textareas so it never interferes with the terminal or the
 * contact form). Buffer resets after a short pause or once it grows
 * past the longest phrase.
 */
export function useIncantations() {
  const { setTheme } = useTheme();
  const [revealed, setRevealed] = useState(false);
  const bufferRef = useRef("");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || target?.isContentEditable) return;
      if (!/^[a-zA-Z]$/.test(e.key)) return;

      bufferRef.current = (bufferRef.current + e.key).toUpperCase().slice(-14);

      if (bufferRef.current.endsWith("LUMOS")) {
        setTheme("lumos");
        bufferRef.current = "";
      } else if (bufferRef.current.endsWith("NOX") && !bufferRef.current.endsWith("LUMOS")) {
        setTheme("nox");
        bufferRef.current = "";
      } else if (bufferRef.current.endsWith("ACCIOPROJECTS")) {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        bufferRef.current = "";
      } else if (bufferRef.current.endsWith("REVELIO")) {
        setRevealed((v) => !v);
        bufferRef.current = "";
      }

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        bufferRef.current = "";
      }, 2500);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setTheme]);

  return { revealed };
}
