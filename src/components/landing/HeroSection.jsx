
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const AppMockup = () => (
  <div className="relative mt-20 w-full max-w-5xl mx-auto">
    <div 
      className="aspect-[16/10] bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-3xl shadow-2xl shadow-blue-500/10 dark:shadow-blue-400/10 p-2"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 120%, rgba(96, 165, 250, 0.1), transparent 50%)'
      }}
    >
      <div className="flex items-center gap-1.5 mb-2 px-2">
        <span className="h-2.5 w-2.5 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
        <span className="h-2.5 w-2.5 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
        <span className="h-2.5 w-2.5 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
      </div>
      <div className="w-full h-[calc(100%-20px)] bg-white dark:bg-slate-950 rounded-xl shadow-inner shadow-slate-200/50 dark:shadow-slate-800/50 border border-slate-200/80 dark:border-slate-800/80 grid grid-cols-12 gap-4 p-4">
        {/* Sidebar */}
        <div className="col-span-3 bg-slate-50 dark:bg-slate-900/80 rounded-lg p-3 flex flex-col gap-3">
          <div className="h-6 w-2/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-4 w-full bg-blue-200/80 dark:bg-blue-900/80 rounded"></div>
          <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="mt-auto h-8 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
        {/* Main Content */}
        <div className="col-span-9 grid grid-cols-3 grid-rows-3 gap-4">
          <div className="col-span-3 row-span-2 bg-slate-100 dark:bg-slate-900 rounded-lg relative overflow-hidden">
            <div className="absolute top-4 left-4 h-16 w-16 bg-purple-300/80 dark:bg-purple-800/80 rounded-full"></div>
            <div className="absolute bottom-4 right-4 h-20 w-1/3 bg-blue-300/80 dark:bg-blue-800/80 rounded-lg"></div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg"></div>
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg"></div>
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
);

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto text-center">
        <div className="bg-blue-100/80 text-blue-700 dark:bg-blue-500/30 dark:text-blue-400 font-semibold py-1 px-3 rounded-full inline-block mb-4 text-sm">
          Lançamento: Resumos de Reunião com IA ✨
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight md:leading-tight bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          <span>Reuniões que inspiram. </span>
          <br className="hidden md:block" />
          Resultados que impressionam.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
          ClarityCall é a sua nova plataforma de videochamadas, desenhada para a colaboração moderna. Foco, produtividade e um design que encanta.
        </p>
        <div className="mt-8 flex justify-center items-center gap-3">
          <Button size="lg" className="gap-2 cursor-pointer group bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
            Experimente grátis
            <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" className="bg-gray-200  dark:bg-slate-800 cursor-pointer backdrop-blur-sm">
            Fale com vendas
          </Button>
        </div>

        <AppMockup />
      </div>
    </section>
  );
};
