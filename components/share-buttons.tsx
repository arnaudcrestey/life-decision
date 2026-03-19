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

  const shareText = `J’ai fait le diagnostic Life Decision. Mon profil décisionnel : ${profile} (${score}%). Un résultat clair et intéressant à découvrir.`;

  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('Lien copié avec succès');
    } catch (error) {
      console.error(error);
      alert('Impossible de copier le lien');
    }
  }

  return (
    <section className="glass-card p-5">
      <h3 className="mb-2 text-center text-lg font-semibold text-white">
        Partager un aperçu de votre résultat
      </h3>

      <p className="mb-4 text-center text-sm text-slate-300">
        Partagez une version courte et élégante de votre profil décisionnel.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={copyLink}
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
        >
          Copier le lien
        </button>

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
          href={facebookUrl}
          target="_blank"
          rel="noreferrer"
        >
          Facebook
        </a>

        <a
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
          href={twitterUrl}
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </a>

        <a
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </section>
  );
}
