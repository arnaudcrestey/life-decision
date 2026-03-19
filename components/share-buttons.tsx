'use client';

type ShareButtonsProps = {
  profile: string;
  score: number;
};

export function ShareButtons({ profile, score }: ShareButtonsProps) {
  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/life-decision`
      : 'https://life-decision.vercel.app/life-decision';

  const shareText = `J’ai fait le diagnostic Life Decision. Mon profil décisionnel : ${profile} (${score}%). Découvrez votre propre profil en quelques minutes.`;

  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('Message copié avec succès');
    } catch (error) {
      console.error(error);
      alert('Impossible de copier le message');
    }
  }

  return (
    <section className="glass-card p-6">
      <h3 className="mb-2 text-center text-2xl font-semibold text-white">
        Faire découvrir Life Decision
      </h3>

      <p className="mx-auto mb-5 max-w-2xl text-center text-sm text-slate-300">
        Partagez ce diagnostic avec une personne de votre entourage ou sur vos réseaux.
      </p>

      <div className="mx-auto mb-5 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
        <p className="mb-2 text-xs uppercase tracking-wide text-cyan-300">
          Aperçu du message envoyé
        </p>
        <p className="text-sm leading-relaxed text-white/80">
          {shareText}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={copyLink}
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
        >
          Copier le message
        </button>

        <a
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>

        <a
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
          href={facebookUrl}
          target="_blank"
          rel="noreferrer"
        >
          Facebook
        </a>

        <a
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
          href={linkedInUrl}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>

        <a
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
          href={twitterUrl}
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </a>
      </div>
    </section>
  );
}
