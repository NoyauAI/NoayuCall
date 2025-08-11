const FinalCtaSection = ({ children }) => (
  <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white dark:from-blue-700 dark:to-purple-700">
    <div className="container mx-auto py-20 text-center">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Pronto para transformar suas reuniões?</h2>
      <p className="mt-4 text-lg text-blue-100 dark:text-blue-200 max-w-xl mx-auto">
        Comece a usar o ClarityCall hoje mesmo, de graça. Não é necessário cartão de crédito.
      </p>
      <div className="mt-8">
        {children}
      </div>
    </div>
  </section>
);

export default FinalCtaSection;