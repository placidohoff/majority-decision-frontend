import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroScorecard } from "./HeroScorecard";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 size-[700px] rounded-full bg-[radial-gradient(circle,rgba(224,51,43,0.18),transparent_65%)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-28">
        <div>
          <Eyebrow dot>The fight night companion</Eyebrow>
          <h1
            id="hero-heading"
            className="mt-8 font-display text-6xl leading-[0.9] tracking-tight uppercase sm:text-7xl lg:text-[5.5rem]"
          >
            Score every
            <br />
            <span className="text-accent">Round.</span>
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Your corner for the fight. Make your call, compare it with the judges, and see how the
            community saw every punch.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/scorecards/new" variant="cream">
              Start a scorecard
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href="#fights" variant="outline">
              Browse fights
            </ButtonLink>
          </div>
        </div>
        <HeroScorecard />
      </div>
    </section>
  );
}
