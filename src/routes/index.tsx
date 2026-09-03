import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Header } from "@/components/nexora/Header";
import { PedidoForm } from "@/components/nexora/PedidoForm";
import { Reveal } from "@/components/nexora/Reveal";
import {
  ComoFunciona,
  Contacto,
  Faq,
  Footer,
  Hero,
  LimiteHardware,
  ParaQuem,
  Precos,
  Resultados,
  Servicos,
  Sobre,
} from "@/components/nexora/sections";
import { listarResultados } from "@/lib/resultados.functions";

const resultadosQuery = queryOptions({
  queryKey: ["resultados"],
  queryFn: () => listarResultados(),
});

const DESCRICAO =
  "Diagnóstico, configuração e otimização de PCs para jogos. Analisamos o seu hardware, o Windows e as configurações gráficas para aproveitar melhor o desempenho do seu PC.";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(resultadosQuery),
  head: () => ({
    meta: [
      { title: "Nexora Boost | Configuração e Otimização de PC Gaming" },
      { name: "description", content: DESCRICAO },
      {
        property: "og:title",
        content: "Nexora Boost | Configuração e Otimização de PC Gaming",
      },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      {
        name: "twitter:title",
        content: "Nexora Boost | Configuração e Otimização de PC Gaming",
      },
      { name: "twitter:description", content: DESCRICAO },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Nexora Boost",
          serviceType: "Configuração e otimização de PC gaming",
          description: DESCRICAO,
          areaServed: "PT",
          offers: [
            { "@type": "Offer", name: "Nexora Check", price: "5", priceCurrency: "EUR" },
            { "@type": "Offer", name: "Nexora Boost", price: "10", priceCurrency: "EUR" },
            {
              "@type": "Offer",
              name: "Nexora Boost Pro",
              price: "15",
              priceCurrency: "EUR",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: resultados } = useSuspenseQuery(resultadosQuery);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Servicos />
        <ComoFunciona />
        <Precos />
        <Resultados resultados={resultados} />
        <LimiteHardware />
        <ParaQuem />
        <Sobre />

        <section id="pedido" className="border-t border-border py-24">
          <div className="mx-auto max-w-3xl px-5">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                Formulário
              </p>
              <h2 className="text-3xl font-bold sm:text-4xl">Solicitar análise</h2>
              <p className="mt-4 text-base text-muted-foreground">
                Envie as especificações do seu PC e explique qual o jogo ou problema que está
                a enfrentar. As informações serão analisadas antes de qualquer configuração
                ser realizada.
              </p>
            </Reveal>
            <Reveal delay={100} className="mt-10">
              <PedidoForm />
            </Reveal>
          </div>
        </section>

        <Faq />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
