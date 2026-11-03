import Link from "next/link";
import { ArrowRight, Flame, MessageCircle } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { CommunityComment } from "@/lib/mock-data";

function CommentCard({ comment }: { comment: CommunityComment }) {
  return (
    <article className="flex h-full flex-col rounded-md border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="font-display text-[10px] uppercase tracking-[0.15em] text-accent">{comment.label}</p>
        <MessageCircle aria-hidden className="size-4 shrink-0 text-subtle" />
      </div>
      <blockquote className="mt-5 flex-1 text-sm leading-relaxed">&ldquo;{comment.body}&rdquo;</blockquote>
      <footer className="mt-6 flex items-center justify-between border-t border-border pt-4 font-display text-[10px] uppercase tracking-[0.12em] text-subtle">
        <span>@{comment.author}</span>
        <span className="flex items-center gap-1.5">
          <Flame aria-hidden className="size-3" />
          {comment.reactions} reactions
        </span>
      </footer>
    </article>
  );
}

export function CommunityFeed({ comments }: { comments: CommunityComment[] }) {
  return (
    <section aria-labelledby="community-heading" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Around the ropes</Eyebrow>
            <h2 id="community-heading" className="mt-3 font-display text-3xl uppercase tracking-tight sm:text-4xl">
              The community is talking
            </h2>
          </div>
          <Link
            href="/community"
            className="group inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-fg"
          >
            See all discussion
            <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {comments.map((comment) => (
            <li key={comment.id}>
              <CommentCard comment={comment} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
