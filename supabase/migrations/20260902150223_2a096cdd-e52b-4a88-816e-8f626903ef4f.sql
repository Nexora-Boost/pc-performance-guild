CREATE TABLE public.pedidos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  nome text NOT NULL,
  contacto text NOT NULL,
  social text,
  cpu text,
  gpu text,
  ram text,
  armazenamento text,
  windows text,
  jogo text,
  fps_atual text,
  resolucao text,
  problema text NOT NULL,
  info_adicional text,
  screenshot_url text
);
GRANT INSERT ON public.pedidos TO anon, authenticated;
GRANT ALL ON public.pedidos TO service_role;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Qualquer pessoa pode enviar pedido" ON public.pedidos FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.resultados (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  publicado boolean NOT NULL DEFAULT false,
  cpu text,
  gpu text,
  ram text,
  jogo text,
  fps_antes text,
  fps_depois text,
  config_antes text,
  config_depois text,
  observacoes text
);
GRANT SELECT ON public.resultados TO anon, authenticated;
GRANT ALL ON public.resultados TO service_role;
ALTER TABLE public.resultados ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Resultados publicados sao visiveis" ON public.resultados FOR SELECT TO anon, authenticated USING (publicado = true);