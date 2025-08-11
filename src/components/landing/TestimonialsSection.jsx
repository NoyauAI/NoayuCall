const TestimonialsSection = () => (
  <section className="py-20">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter bg-gradient-to-b from-slate-800 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">Amado por equipes inovadoras</h2>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        Veja por que equipes de alta performance em todo o mundo escolhem o ClarityCall para suas comunicações.
      </p>
      <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800">
          <p className="text-lg text-slate-800 dark:text-slate-200">"ClarityCall mudou o jogo para nós. As reuniões são mais produtivas, e os resumos de IA nos economizam horas de trabalho toda semana. É incrivelmente fácil de usar."</p>
          <div className="mt-6 flex items-center">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar Joana" className="h-12 w-12 rounded-full mr-4"/>
            <div>
              <p className="font-semibold text-slate-800 dark:text-white">Joana Silva</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">CEO, InovaTech</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800">
          <p className="text-lg text-slate-800 dark:text-slate-200">"A interface é limpa, a qualidade do vídeo é impecável e as funcionalidades de IA são surpreendentes. Finalmente, uma ferramenta que a equipe realmente gosta de usar."</p>
          <div className="mt-6 flex items-center">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704e" alt="Avatar Marcos" className="h-12 w-12 rounded-full mr-4"/>
            <div>
              <p className="font-semibold text-slate-800 dark:text-white">Marcos Andrade</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">CTO, FutureWorks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;