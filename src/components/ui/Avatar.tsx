type AvatarProps = {
  initials: string;
  color: string;
  size?: "sm" | "lg";
  className?: string;
};

const sizes = {
  sm: "size-7 text-[9px] ring-2 ring-bg-alt",
  lg: "size-12 text-sm ring-4 ring-white/5",
};

export function Avatar({ initials, color, size = "lg", className = "" }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-display text-white ${sizes[size]} ${className}`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </span>
  );
}
