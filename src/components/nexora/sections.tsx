import {
  Activity,
  Cpu,
  Gamepad2,
  Gauge,
  MonitorCog,
  Settings2,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { NexoraLogo } from "./Logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const btnPrimary =
  "inline-flex items-center justify-center rounded-full bg-[image:var(--gradient-primary)] px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5";
const btnGhost =
  "inline-flex items-center justify-center rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-secondary";

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground">{subtitle}</p>}
    </Reveal>
  );
}

/* ---------------------------------- HERO --------------------------------- */

const HERO_METRICS = [
  { label: "FPS", value: 92, unit: "" },
  { label: "GPU", value: 74, unit: "%" },
  { label: "CPU", value: 48, unit: "%" },
  { label: "RAM", value: 61, unit: "%" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-28 pb-20 sm:pt-36">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-40" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            PC Gaming • Configuração • Otimização
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
            Faça o seu PC entregar o que ele{" "}
            <span className="text-gradient">realmente consegue</span>.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Analisamos o seu hardware, o Windows e as configurações dos seus jogos para
            encontrar problemas e ajustes que façam sentido para o seu PC.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#pedido" className={btnPrimary}>
              Pedir análise
            </a>
            <a href="#como-funciona" className={btnGhost}>
              Como funciona
            </a>
          </div>
          <ul className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            {[
              "Análise personalizada",
              "Configuração para o seu hardware",
              "Sem promessas falsas",
              "Atendimento online",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="surface-card glow rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Painel de desempenho
              </p>
              <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Exemplo visual
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {HERO_METRICS.map((m) => (
                <div key={m.label} className="rounded-2xl bg-surface-2/70 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {m.value}
                    <span className="text-sm text-muted-foreground">{m.unit}</span>
                  </p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background/70">
                    <div
                      className="h-full rounded-full bg-[image:var(--gradient-primary)]"
                      style={{ width: `${Math.min(m.value, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-surface-2/70 p-4">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
                <span>Frame time</span>
                <span>ms</span>
              </div>
              <svg viewBox="0 0 300 70" className="mt-3 h-20 w-full" aria-hidden="true">
                <polyline
                  points="0,48 20,42 40,50 60,38 80,44 100,30 120,46 140,34 160,40 180,26 200,44 220,32 240,38 260,28 280,36 300,30"
                  fill="none"
                  stroke="oklch(0.62 0.21 258)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
              Os valores apresentados são apenas ilustrativos e não representam resultados
              de clientes.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- SERVIÇOS -------------------------------- */

const SERVICOS = [
  {
    icon: Activity,
    title: "Diagnóstico",
    text: "Análise das especificações do PC e identificação de possíveis limitações.",
  },
  {
    icon: MonitorCog,
    title: "Windows",
    text: "Verificação das principais configurações do sistema relacionadas com o desempenho.",
  },
  {
    icon: Cpu,
    title: "GPU",
    text: "Verificação de drivers e configurações da placa gráfica.",
  },
  {
    icon: Gamepad2,
    title: "Jogos",
    text: "Análise das configurações gráficas e de desempenho do jogo.",
  },
  {
    icon: Gauge,
    title: "FPS & Estabilidade",
    text: "Análise de FPS, frame time, stuttering e utilização de CPU/GPU quando possível.",
  },
  {
    icon: Settings2,
    title: "Configuração personalizada",
    text: "Recomendações específicas para o hardware e objetivo do cliente.",
  },
];

export function Servicos() {
  return (
    <section id="servicos" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Serviços" title="O que analisamos" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICOS.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <article className="surface-card h-full rounded-2xl p-6 hover:-translate-y-1 hover:border-primary/40">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ COMO FUNCIONA ----------------------------- */

const ETAPAS = [
  {
    n: "01",
    title: "Envie os dados",
    text: "Indique as peças do PC, o jogo, os FPS atuais e o problema.",
  },
  {
    n: "02",
    title: "Analisamos",
    text: "Identificamos possíveis limitações e configurações inadequadas.",
  },
  {
    n: "03",
    title: "Configuramos",
    text: "São indicados ou realizados os ajustes adequados.",
  },
  {
    n: "04",
    title: "Você testa",
    text: "Volta a testar e compara o comportamento antes e depois.",
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Processo" title="Do diagnóstico ao resultado." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPAS.map((e, i) => (
            <Reveal key={e.n} delay={i * 70}>
              <article className="surface-card h-full rounded-2xl p-6 hover:-translate-y-1 hover:border-primary/40">
                <span className="text-sm font-bold tracking-[0.2em] text-primary">{e.n}</span>
                <h3 className="mt-4 text-lg font-semibold">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <p className="rounded-2xl border border-border bg-surface px-6 py-4 text-center text-sm text-muted-foreground">
            O resultado depende do hardware, do jogo e do estado atual do sistema. Nenhum
            número específico de FPS é garantido.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- PREÇOS --------------------------------- */

const PLANOS = [
  {
    nome: "NEXORA CHECK",
    preco: "€5",
    desc: "Descubra o que pode estar a limitar o seu PC.",
    itens: [
      "Análise do hardware",
      "Identificação de possíveis limitações",
      "Verificação das configurações principais",
      "Recomendações personalizadas",
    ],
    cta: "Pedir análise",
    destaque: false,
  },
  {
    nome: "NEXORA BOOST",
    preco: "€10",
    desc: "Configuração focada no melhor aproveitamento do seu hardware.",
    itens: [
      "Tudo do Nexora Check",
      "Configuração do Windows",
      "Configuração do jogo",
      "Ajustes gráficos",
      "Recomendações específicas para o hardware",
      "Orientação durante os testes",
    ],
    cta: "Pedir Boost",
    destaque: true,
  },
  {
    nome: "NEXORA BOOST PRO",
    preco: "€15",
    desc: "Uma análise mais completa do sistema e do jogo.",
    itens: [
      "Análise mais detalhada",
      "Windows",
      "Drivers",
      "Configurações gráficas",
      "Configuração do jogo",
      "Análise de possíveis gargalos",
      "Orientação para testes antes/depois",
      "Ajustes adicionais quando necessários",
    ],
    cta: "Pedir Boost Pro",
    destaque: false,
  },
];

export function Precos() {
  return (
    <section id="precos" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Preços" title="Escolha o seu nível de configuração" />
        <div className="mt-14 grid items-start gap-5 lg:grid-cols-3">
          {PLANOS.map((p, i) => (
            <Reveal key={p.nome} delay={i * 80}>
              <article
                className={`surface-card relative h-full rounded-3xl p-7 hover:-translate-y-1 ${
                  p.destaque ? "border-primary/50 glow" : ""
                }`}
              >
                {p.destaque && (
                  <span className="absolute -top-3 left-7 rounded-full bg-[image:var(--gradient-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                    Mais escolhido
                  </span>
                )}
                <h3 className="text-sm font-bold tracking-[0.18em] text-foreground">
                  {p.nome}
                </h3>
                <p className="mt-4 text-4xl font-extrabold">{p.preco}</p>
                <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
                  {p.itens.map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <Zap className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#pedido"
                  className={`mt-7 w-full ${p.destaque ? btnPrimary : btnGhost}`}
                >
                  {p.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <p className="text-center text-sm text-muted-foreground">
            Os resultados dependem do hardware, do jogo e do estado atual do sistema. Não
            existe garantia de aumento específico de FPS.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- RESULTADOS ------------------------------- */

export type Resultado = {
  id: string;
  cpu: string | null;
  gpu: string | null;
  ram: string | null;
  jogo: string | null;
  fps_antes: string | null;
  fps_depois: string | null;
  config_antes: string | null;
  config_depois: string | null;
  observacoes: string | null;
};

export function Resultados({ resultados }: { resultados: Resultado[] }) {
  return (
    <section id="resultados" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="Resultados"
          title="Resultados reais."
          subtitle="Sem números inventados. Cada resultado publicado aqui virá de um teste real."
        />

        {resultados.length === 0 ? (
          <Reveal className="mx-auto mt-14 max-w-2xl">
            <div className="surface-card rounded-3xl px-6 py-14 text-center">
              <p className="text-lg font-semibold">Ainda não existem resultados publicados.</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Assim que existirem testes reais, cada caso será publicado aqui com hardware,
                jogo, FPS antes e depois, configurações e observações.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {resultados.map((r, i) => (
              <Reveal key={r.id} delay={i * 70}>
                <article className="surface-card h-full rounded-2xl p-6">
                  <h3 className="text-lg font-semibold">{r.jogo ?? "Jogo"}</h3>
                  <dl className="mt-4 grid gap-2 text-sm text-muted-foreground">
                    <div className="flex justify-between gap-4">
                      <dt>CPU</dt>
                      <dd className="text-right text-foreground">{r.cpu ?? "—"}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>GPU</dt>
                      <dd className="text-right text-foreground">{r.gpu ?? "—"}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>RAM</dt>
                      <dd className="text-right text-foreground">{r.ram ?? "—"}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>FPS antes</dt>
                      <dd className="text-right text-foreground">{r.fps_antes ?? "—"}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>FPS depois</dt>
                      <dd className="text-right text-foreground">{r.fps_depois ?? "—"}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>Config. antes</dt>
                      <dd className="text-right text-foreground">{r.config_antes ?? "—"}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>Config. depois</dt>
                      <dd className="text-right text-foreground">{r.config_depois ?? "—"}</dd>
                    </div>
                  </dl>
                  {r.observacoes && (
                    <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
                      {r.observacoes}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ----------------------------- LIMITE HARDWARE ---------------------------- */

export function LimiteHardware() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <div className="surface-card relative overflow-hidden rounded-3xl p-8 sm:p-12">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-3xl"
              style={{ background: "var(--gradient-primary)" }}
            />
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
              <Wrench className="h-5 w-5" />
            </span>
            <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
              Nem todo o problema é software.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Se o desempenho estiver limitado principalmente pelo hardware, nenhuma
              configuração fará milagres. Se for esse o caso, isso será informado ao cliente
              em vez de recomendar alterações desnecessárias.
            </p>
            <p className="mt-6 text-sm font-semibold tracking-wide text-primary">
              Diagnóstico primeiro. Configuração depois.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- PARA QUEM É ------------------------------ */

const PERFIS = [
  {
    title: "FPS abaixo do esperado",
    text: "O seu hardware parece suficiente, mas o desempenho está abaixo do esperado.",
  },
  {
    title: "PC recém-formatado",
    text: "O Windows foi reinstalado e não sabe o que configurar.",
  },
  {
    title: "PC mais antigo",
    text: "Quer aproveitar melhor o hardware que já possui.",
  },
  {
    title: "Stuttering e instabilidade",
    text: "O FPS parece alto, mas o jogo apresenta travamentos ou inconsistências.",
  },
];

export function ParaQuem() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="Para quem é"
          title="O seu problema pode estar na configuração."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PERFIS.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <article className="surface-card h-full rounded-2xl p-6 hover:-translate-y-1 hover:border-primary/40">
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- SOBRE --------------------------------- */

export function Sobre() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Sobre a Nexora Boost
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Performance sem promessa milagrosa.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            A Nexora Boost existe para ajudar jogadores a compreender melhor o próprio PC e a
            aproveitar o hardware que já possuem. Cada computador é analisado individualmente
            porque não existe uma configuração universal que funcione perfeitamente em todos
            os sistemas.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------- FAQ ---------------------------------- */

const FAQ = [
  {
    q: "Garantem aumento de FPS?",
    a: "Não. O desempenho depende do hardware, do jogo e do estado atual do sistema.",
  },
  {
    q: "Funciona em PC fraco?",
    a: "Pode ajudar quando o problema está relacionado com a configuração, mas não transforma hardware limitado em hardware de alto desempenho.",
  },
  {
    q: "Fazem overclock?",
    a: "Overclock e alterações de voltagem não fazem parte do serviço padrão.",
  },
  {
    q: "Preciso de entregar o meu PC?",
    a: "Não necessariamente. Dependendo do caso, a configuração pode ser realizada através de orientação ou suporte remoto.",
  },
  {
    q: "Trabalham com qualquer jogo?",
    a: "A análise pode ser realizada para diferentes jogos de PC, desde que seja possível avaliar adequadamente o sistema e as configurações.",
  },
  {
    q: "E se o problema for o hardware?",
    a: "Isso será informado durante a análise. Não serão recomendadas configurações de software como solução para um problema que exige upgrade de hardware.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionTitle eyebrow="FAQ" title="Perguntas frequentes" />
        <Reveal className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- CONTACTO -------------------------------- */

export function Contacto() {
  return (
    <section id="contacto" className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <div className="surface-card rounded-3xl p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Descubra o que está a limitar o seu PC.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground">
              Envie as especificações do computador e explique qual o jogo ou problema que
              está a enfrentar.
            </p>
            <a href="#pedido" className={`${btnPrimary} mt-8`}>
              Pedir análise
            </a>
            <dl className="mx-auto mt-10 grid max-w-md gap-4 text-sm sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface px-5 py-4">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Instagram
                </dt>
                <dd className="mt-1 font-medium">[SEU INSTAGRAM]</dd>
              </div>
              <div className="rounded-2xl border border-border bg-surface px-5 py-4">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Discord
                </dt>
                <dd className="mt-1 font-medium">[SEU DISCORD]</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- FOOTER --------------------------------- */

export function Footer() {
  const links = [
    { href: "#inicio", label: "Início" },
    { href: "#servicos", label: "Serviços" },
    { href: "#precos", label: "Preços" },
    { href: "#resultados", label: "Resultados" },
    { href: "#faq", label: "FAQ" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <NexoraLogo />
            <p className="mt-3 text-sm text-muted-foreground">
              PC Gaming • Configuração • Otimização
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Nexora Boost. Todos os direitos reservados.</p>
          <p>Serviço independente de configuração e suporte para PCs gaming.</p>
        </div>
      </div>
    </footer>
  );
}
