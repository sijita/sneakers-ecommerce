import { useTheme } from "next-themes";
import { HiMoon, HiSun } from "react-icons/hi";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      className="btn btn-outline border-neutral btn-sm items-center w-full min-[315px]:w-auto"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <HiSun className="text-lg" />
      ) : (
        <HiMoon className="text-lg" />
      )}
    </button>
  );
}
