import { CommunityFeed } from "@/components/landing/CommunityFeed";
import { FeaturedFight } from "@/components/landing/FeaturedFight";
import { FightBrowser } from "@/components/landing/FightBrowser";
import { Hero } from "@/components/landing/Hero";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { communityComments, featuredFight, fights } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <FightBrowser fights={fights} />
        <FeaturedFight featured={featuredFight} />
        <CommunityFeed comments={communityComments} />
      </main>
    </>
  );
}
