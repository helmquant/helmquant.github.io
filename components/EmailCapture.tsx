const BEEHIIV_EMBED_URL = process.env.NEXT_PUBLIC_BEEHIIV_EMBED_URL;
const BEEHIIV_SUBSCRIBE_URL =
  process.env.NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_URL ||
  "https://helmquant.beehiiv.com/subscribe";

export default function EmailCapture() {
  if (BEEHIIV_EMBED_URL) {
    return (
      <div className="max-w-md mx-auto">
        <iframe
          src={BEEHIIV_EMBED_URL}
          title="Subscribe to the Helm Quant newsletter"
          loading="lazy"
          scrolling="no"
          className="w-full bg-transparent border-0 rounded-md"
          style={{ minHeight: "120px" }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 items-center justify-center">
      <a
        href={BEEHIIV_SUBSCRIBE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="px-7 py-3 bg-gold text-background hover:bg-gold-dim rounded-md font-medium transition-colors text-center sm:w-auto w-full"
      >
        Subscribe to the newsletter
      </a>
      <a
        href="https://x.com/helmquant"
        target="_blank"
        rel="noopener noreferrer"
        className="px-5 py-3 text-muted hover:text-foreground transition-colors text-sm"
      >
        or follow on X →
      </a>
    </div>
  );
}
