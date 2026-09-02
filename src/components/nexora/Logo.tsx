import { cn } from "@/lib/utils";

export function NexoraMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Símbolo Nexora Boost"
      className={cn("h-8 w-8", className)}
    >
      <defs>
        <linearGradient id="nexora-mark-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.21 258)" />
          <stop offset="100%" stopColor="oklch(0.75 0.16 240)" />
        </linearGradient>
      </defs>
      <path
        d="M7 41V7h8.5l17 21.5V7H41v34h-8.5L15.5 19.5V41z"
        fill="url(#nexora-mark-grad)"
      />
      <path d="M7 41V7h8.5l4 5v29z" fill="oklch(0.99 0.002 260 / 22%)" />
      <path d="M28.5 41V12l4 5v24z" fill="oklch(0.99 0.002 260 / 12%)" />
    </svg>
  );
}

export function NexoraLogo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <NexoraMark />
      <span className="flex flex-col leading-none">
        <span className="text-sm font-extrabold tracking-[0.22em] text-foreground">
          NEXORA
        </span>
        <span className="text-sm font-extrabold tracking-[0.22em] text-gradient">
          BOOST
        </span>
      </span>
    </span>
  );
}
