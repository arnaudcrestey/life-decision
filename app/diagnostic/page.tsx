import { Quiz } from '@/components/quiz';

export default function DiagnosticPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Diagnostic Life Decision</h1>
      <p className="text-slate-300">Répondez honnêtement pour obtenir un profil précis de votre style décisionnel.</p>
      <Quiz />
    </section>
  );
}
