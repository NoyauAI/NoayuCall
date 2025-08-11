
import { Video, Twitter, Github, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 dark:bg-slate-900/50 dark:border-slate-800">
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <Video className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-800 dark:text-white">ClarityCall</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">
              Reuniões por vídeo simples e inteligentes para equipes produtivas.
            </p>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Produto</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Recursos</a></li>
              <li><a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Preços</a></li>
              <li><a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Segurança</a></li>
              <li><a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Integrações</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Sobre nós</a></li>
              <li><a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Carreiras</a></li>
              <li><a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Blog</a></li>
              <li><a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Contato</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Termos</a></li>
              <li><a href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Privacidade</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Social</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-500"><Twitter size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-500"><Github size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-500"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} ClarityCall. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
