import Link from 'next/link';

export default function StartPage() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 items-center justify-center">
      <div className="glass-card w-full p-8 text-center md:p-10">
        <h1 className="text-3xl font-bold md:text-4xl">Prêt à passer le diagnostic ?</h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Répondez à 10 questions pour comprendre comment vous prenez vos décisions importantes.
        </p>
        <Link href="/diagnostic" className="primary-btn mt-8">
          Commencer le diagnostic
        </Link>
      </div>
    </section>
  );
}
