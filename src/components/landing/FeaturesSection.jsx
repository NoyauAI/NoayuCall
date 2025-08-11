
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, Zap, Clock, ShieldCheck, Users, FileText } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-8 w-8 text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 p-2 rounded-lg" />,
    title: "Videochamadas em HD",
    description: "Conexões cristalinas com otimização de baixa latência para que nenhuma palavra seja perdida.",
  },
  {
    icon: <Bot className="h-8 w-8 text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 p-2 rounded-lg" />,
    title: "Resumos com IA",
    description: "Nossa IA gera atas, identifica ações e resume os pontos-chave automaticamente após cada reunião.",
  },
  {
    icon: <Users className="h-8 w-8 text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 p-2 rounded-lg" />,
    title: "Salas para Equipes",
    description: "Crie salas persistentes para seus projetos ou equipes, com histórico e arquivos compartilhados.",
  },
  {
    icon: <FileText className="h-8 w-8 text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 p-2 rounded-lg" />,
    title: "Transcrição em Tempo Real",
    description: "Acompanhe a conversa com legendas ao vivo e tenha o registro completo para consulta.",
  },
  {
    icon: <Clock className="h-8 w-8 text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 p-2 rounded-lg" />,
    title: "Agendamento Inteligente",
    description: "Integração perfeita com seu calendário para agendar reuniões sem conflitos e com eficiência.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 p-2 rounded-lg" />,
    title: "Segurança de Ponta",
    description: "Criptografia de ponta-a-ponta e controles de privacidade para garantir conversas seguras.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter bg-gradient-to-b from-slate-800 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Uma plataforma, todas as ferramentas.
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            ClarityCall centraliza as ferramentas de comunicação da sua equipe em uma interface poderosa e intuitiva que você vai amar usar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-slate-100 dark:border-slate-800">
              <CardHeader className="flex flex-row items-start gap-4">
                {feature.icon}
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-slate-800 dark:text-white">{feature.title}</CardTitle>
                  <CardDescription className="mt-2 text-slate-600 dark:text-slate-400">{feature.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
