import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NexoraLogo } from "./Logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#precos", label: "Preços" },
  { href: "#resultados", label: "Resultados" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#inicio" aria-label="Nexora Boost — início">
          <NexoraLogo />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#pedido"
            className="hidden rounded-full bg-[image:var(--gradient-primary)] px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
          >
            Pedir análise
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/98 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#pedido"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[image:var(--gradient-primary)] px-5 py-3.5 text-center text-base font-semibold text-primary-foreground"
            >
              Pedir análise
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
