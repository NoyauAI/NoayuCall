
'use client'

import { Button } from "@/components/ui/button";
import { Video, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200/50 dark:bg-slate-950/80 dark:border-slate-800/50">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <Video className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg text-slate-800 dark:text-slate-200">ClarityCall</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="text-slate-700 hover:text-blue-600 transition-colors dark:text-slate-300 dark:hover:text-blue-500">Recursos</a>
          <a href="#" className="text-slate-700 hover:text-blue-600 transition-colors dark:text-slate-300 dark:hover:text-blue-500">Preços</a>
          <a href="#" className="text-slate-700 hover:text-blue-600 transition-colors dark:text-slate-300 dark:hover:text-blue-500">Soluções</a>
          <a href="#" className="text-slate-700 hover:text-blue-600 transition-colors dark:text-slate-300 dark:hover:text-blue-500">Contato</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="cursor-pointer bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-500">Entrar</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer shadow-blue-500/20">Começar grátis</Button>

          {mounted && (
            <button
              className={`btn btn-circle ${theme === "light" ? "btn-outline-dark" : "btn-outline-light"}`}
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button>
          )}

          {!mounted && (
            <div className="btn btn-circle invisible">
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
