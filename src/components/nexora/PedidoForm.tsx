import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { enviarPedido } from "@/lib/pedido.functions";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/40";

function Field({
  label,
  name,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      <input
        className={inputClass}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
      />
    </label>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-1 text-sm font-semibold text-foreground">{title}</legend>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function PedidoForm() {
  const enviar = useServerFn(enviarPedido);
  const [estado, setEstado] = useState<"idle" | "loading" | "ok" | "erro">("idle");
  const [mensagemErro, setMensagemErro] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    setEstado("loading");
    setMensagemErro("");

    try {
      let screenshotPath = "";
      const file = fd.get("screenshot");
      if (file instanceof File && file.size > 0) {
        const ext = file.name.split(".").pop() ?? "png";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("screenshots").upload(path, file);
        if (!error) screenshotPath = path;
      }

      const valor = (k: string) => String(fd.get(k) ?? "");

      await enviar({
        data: {
          nome: valor("nome"),
          contacto: valor("contacto"),
          social: valor("social"),
          cpu: valor("cpu"),
          gpu: valor("gpu"),
          ram: valor("ram"),
          armazenamento: valor("armazenamento"),
          windows: valor("windows"),
          jogo: valor("jogo"),
          fps_atual: valor("fps_atual"),
          resolucao: valor("resolucao"),
          problema: valor("problema"),
          info_adicional: valor("info_adicional"),
          screenshot_path: screenshotPath,
          plano: valor("plano"),
        },
      });

      form.reset();
      setEstado("ok");
    } catch (err) {
      console.error(err);
      setMensagemErro(
        "Não foi possível enviar o pedido. Verifique a ligação e tente novamente.",
      );
      setEstado("erro");
    }
  }

  if (estado === "ok") {
    return (
      <div className="surface-card flex flex-col items-center gap-4 rounded-3xl px-6 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <h3 className="text-2xl font-bold">Pedido recebido!</h3>
        <p className="max-w-md text-sm text-muted-foreground">
          As informações foram enviadas para análise. A resposta será dada pelo contacto
          indicado.
        </p>
        <button
          type="button"
          onClick={() => setEstado("idle")}
          className="mt-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
        >
          Enviar outro pedido
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface-card space-y-8 rounded-3xl p-6 sm:p-8">
      <Group title="Dados">
        <Field label="Nome ou nickname" name="nome" required placeholder="Como o tratamos" />
        <Field
          label="Email ou forma de contacto"
          name="contacto"
          required
          placeholder="email@exemplo.pt"
        />
        <div className="sm:col-span-2">
          <Field label="Discord ou Instagram" name="social" placeholder="@utilizador" />
        </div>
      </Group>

      <Group title="PC">
        <Field label="CPU" name="cpu" placeholder="Ex.: Ryzen 5 5600" />
        <Field label="GPU" name="gpu" placeholder="Ex.: RTX 3060" />
        <Field label="RAM" name="ram" placeholder="Ex.: 16 GB 3200 MHz" />
        <Field label="Armazenamento" name="armazenamento" placeholder="Ex.: SSD NVMe 1 TB" />
        <div className="sm:col-span-2">
          <Field label="Windows" name="windows" placeholder="Ex.: Windows 11 24H2" />
        </div>
      </Group>

      <Group title="Jogo">
        <Field label="Jogo principal" name="jogo" placeholder="Ex.: Valorant" />
        <Field label="FPS aproximado atual" name="fps_atual" placeholder="Ex.: 120" />
        <div className="sm:col-span-2">
          <Field label="Resolução utilizada" name="resolucao" placeholder="Ex.: 1920x1080" />
        </div>
      </Group>

      <fieldset className="space-y-4">
        <legend className="mb-1 text-sm font-semibold text-foreground">Problema</legend>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Explique o problema que está a enfrentar <span className="text-primary">*</span>
          </span>
          <textarea
            name="problema"
            required
            rows={5}
            className={cn(inputClass, "resize-y")}
            placeholder="Descreva quedas de FPS, stuttering, travamentos, ou o que pretende melhorar."
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Informações adicionais (opcional)
          </span>
          <textarea
            name="info_adicional"
            rows={3}
            className={cn(inputClass, "resize-y")}
            placeholder="Alterações recentes, programas em segundo plano, temperaturas, etc."
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Enviar screenshot (opcional)
          </span>
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-input px-4 py-3">
            <Upload className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="file"
              name="screenshot"
              accept="image/*"
              className="w-full text-sm text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-xs file:font-medium file:text-secondary-foreground"
            />
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Plano pretendido (opcional)
          </span>
          <select name="plano" className={inputClass} defaultValue="">
            <option value="">Ainda não sei</option>
            <option value="Nexora Check">Nexora Check — 5 €</option>
            <option value="Nexora Boost">Nexora Boost — 10 €</option>
            <option value="Nexora Boost Pro">Nexora Boost Pro — 15 €</option>
          </select>
        </label>
      </fieldset>

      {estado === "erro" && (
        <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {mensagemErro}
        </p>
      )}

      <button
        type="submit"
        disabled={estado === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-primary)] px-6 py-4 text-base font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60"
      >
        {estado === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {estado === "loading" ? "A enviar…" : "Enviar pedido"}
      </button>
    </form>
  );
}
