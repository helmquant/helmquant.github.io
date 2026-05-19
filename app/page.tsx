import Image from "next/image";
import EmailCapture from "@/components/EmailCapture";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-10">
            <Image
              src="/helmquant_mark_primary.svg"
              alt="Helm Quant"
              width={120}
              height={120}
              priority
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-5">
            Helm Quant
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed mb-12 max-w-xl mx-auto">
            AI-powered indicators and daily market intel for Indian traders.
            Built for myself first. Shipping in public.
          </p>
          <EmailCapture />
          <p className="text-sm text-muted-dim mt-4">
            Weekly notes on what I&rsquo;m building. No spam. Unsubscribe
            anytime.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-muted-dim text-center mb-12">
            What&rsquo;s shipping
          </h2>
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <ProductBlock
              title="Indicators"
              description="Premium PineScript indicators for TradingView. Backtested across Nifty, BankNifty, Gold, and Silver. Full strategy guide and setup video with every purchase."
              status="ATE shipping May 2026"
            />
            <ProductBlock
              title="MarketCompass"
              description="A daily AI-synthesized markets brief: Indian and US markets, macro events, sector moves, news with sourced analysis. SaaS later this year."
              status="In private build"
            />
            <ProductBlock
              title="Newsletter"
              description="Weekly notes on what I&rsquo;m building, what&rsquo;s working in the markets, and what I&rsquo;m learning while making AI tools for traders."
              status="Sundays · 9am IST"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-widest text-muted-dim mb-6">
            What this isn&rsquo;t
          </h2>
          <p className="text-base text-muted leading-relaxed">
            No paid signal groups. No &ldquo;guaranteed returns.&rdquo; No
            courses on how to trade. Just tools I use myself, with backtests
            and drawdowns shown honestly.
          </p>
        </div>
      </section>

      <footer className="px-6 py-10 border-t border-white/5 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-dim">
          <p>&copy; 2026 Helm Quant. Building in public.</p>
          <div className="flex gap-6">
            <a
              href="https://x.com/helmquant"
              className="hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
            <a
              href="https://github.com/helmquant"
              className="hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="mailto:hello@helmquant.in"
              className="hover:text-foreground transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ProductBlock({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: string;
}) {
  return (
    <div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-muted leading-relaxed mb-4 text-[15px]">
        {description}
      </p>
      <p className="text-sm text-gold">{status}</p>
    </div>
  );
}
