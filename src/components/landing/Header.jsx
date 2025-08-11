
'use client'

import { Button } from "@/components/ui/button";
import { Video, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { setTheme } = useTheme();

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
          <Button variant="ghost">Entrar</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20">Começar grátis</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
