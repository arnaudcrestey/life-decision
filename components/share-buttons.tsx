'use client';

const shareText =
  'Je viens de faire le diagnostic Life Decision. Découvrez votre profil décisionnel en 2 minutes !';

export function ShareButtons() {
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent('https://life-decision.local/resultat');

  return (
    <section className="glass-card p-5">
      <h3 className="mb-3 text-lg font-semibold">Partager votre résultat</h3>
      <div className="flex flex-wrap gap-3">
        <a
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
          href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </a>
        <a
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
          href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </section>
  );
}
