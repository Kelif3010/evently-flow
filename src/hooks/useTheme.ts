import { useState, useEffect, useCallback } from "react";

const fontPairs = [
  { label: "Playfair + DM Sans", heading: "'Playfair Display', serif", body: "'DM Sans', sans-serif" },
  { label: "Cormorant + Lato", heading: "'Cormorant Garamond', serif", body: "'Lato', sans-serif" },
  { label: "Montserrat + Open Sans", heading: "'Montserrat', sans-serif", body: "'Open Sans', sans-serif" },
];

interface ThemeConfig {
  mode: "light" | "dark";
  primaryColor: string;
  fontPairIndex: number;
  borderRadius: number;
}

const DEFAULT_CONFIG: ThemeConfig = {
  mode: "light",
  primaryColor: "#C08B3F",
  fontPairIndex: 0,
  borderRadius: 0.75,
};

function hexToHsl(hex: string): string {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function loadConfig(): ThemeConfig {
  try {
    const stored = localStorage.getItem("evoria-theme-config");
    if (stored) return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_CONFIG;
}

function applyConfig(config: ThemeConfig) {
  const root = document.documentElement;

  // Dark mode
  if (config.mode === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  // Primary color
  const hsl = hexToHsl(config.primaryColor);
  root.style.setProperty("--primary", hsl);
  root.style.setProperty("--ring", hsl);

  // Fonts
  const pair = fontPairs[config.fontPairIndex] || fontPairs[0];
  root.style.setProperty("--font-heading", pair.heading);
  root.style.setProperty("--font-body", pair.body);

  // Border radius
  root.style.setProperty("--radius", `${config.borderRadius}rem`);

  // Persist
  localStorage.setItem("evoria-theme-config", JSON.stringify(config));
}

export function useTheme() {
  const [config, setConfig] = useState<ThemeConfig>(loadConfig);

  useEffect(() => {
    applyConfig(config);
  }, [config]);

  const toggleTheme = useCallback(() => {
    setConfig(c => ({ ...c, mode: c.mode === "light" ? "dark" : "light" }));
  }, []);

  const setTheme = useCallback((mode: "light" | "dark") => {
    setConfig(c => ({ ...c, mode }));
  }, []);

  const setPrimaryColor = useCallback((color: string) => {
    setConfig(c => ({ ...c, primaryColor: color }));
  }, []);

  const setFontPair = useCallback((index: number) => {
    setConfig(c => ({ ...c, fontPairIndex: index }));
  }, []);

  const setBorderRadius = useCallback((radius: number) => {
    setConfig(c => ({ ...c, borderRadius: radius }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  return {
    theme: config.mode,
    primaryColor: config.primaryColor,
    fontPairIndex: config.fontPairIndex,
    borderRadius: config.borderRadius,
    toggleTheme,
    setTheme,
    setPrimaryColor,
    setFontPair,
    setBorderRadius,
    resetToDefaults,
  };
}

export { fontPairs };
