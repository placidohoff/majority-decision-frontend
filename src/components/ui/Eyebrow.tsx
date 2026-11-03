type EyebrowProps = {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
};

export function Eyebrow({ children, dot = false, className = "" }: EyebrowProps) {
  return (
    <p
      className={`flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.25em] text-accent ${className}`}
    >
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-accent" />}
      {children}
    </p>
  );
}
