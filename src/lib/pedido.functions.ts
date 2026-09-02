import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Destino dos pedidos. Não é mostrado em nenhum lado do site.
 */
const DESTINO = "paulolima12012011@gmail.com";

const pedidoSchema = z.object({
  nome: z.string().min(1).max(120),
  contacto: z.string().min(1).max(160),
  social: z.string().max(160).optional().default(""),
  cpu: z.string().max(160).optional().default(""),
  gpu: z.string().max(160).optional().default(""),
  ram: z.string().max(160).optional().default(""),
  armazenamento: z.string().max(160).optional().default(""),
  windows: z.string().max(160).optional().default(""),
  jogo: z.string().max(160).optional().default(""),
  fps_atual: z.string().max(80).optional().default(""),
  resolucao: z.string().max(80).optional().default(""),
  problema: z.string().min(1).max(4000),
  info_adicional: z.string().max(4000).optional().default(""),
  screenshot_path: z.string().max(400).optional().default(""),
  plano: z.string().max(80).optional().default(""),
});

export type PedidoInput = z.infer<typeof pedidoSchema>;

function linha(label: string, valor?: string) {
  return `${label}: ${valor && valor.trim() ? valor.trim() : "—"}`;
}

export const enviarPedido = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => pedidoSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: inserido, error } = await supabaseAdmin
      .from("pedidos")
      .insert({
        nome: data.nome,
        contacto: data.contacto,
        social: data.social,
        cpu: data.cpu,
        gpu: data.gpu,
        ram: data.ram,
        armazenamento: data.armazenamento,
        windows: data.windows,
        jogo: data.jogo,
        fps_atual: data.fps_atual,
        resolucao: data.resolucao,
        problema: data.problema,
        info_adicional: data.info_adicional,
        screenshot_url: data.screenshot_path || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Falha ao guardar pedido:", error.message);
      throw new Error("Não foi possível registar o pedido.");
    }

    // Link temporário para a captura de ecrã (o ficheiro é privado).
    let screenshotLink = "";
    if (data.screenshot_path) {
      const { data: signed } = await supabaseAdmin.storage
        .from("screenshots")
        .createSignedUrl(data.screenshot_path, 60 * 60 * 24 * 30);
      screenshotLink = signed?.signedUrl ?? "";
    }

    const corpo = [
      "NOVO PEDIDO — NEXORA BOOST",
      "",
      linha("Nome/Nickname", data.nome),
      linha("Contacto", data.contacto),
      linha("Discord/Instagram", data.social),
      "",
      linha("CPU", data.cpu),
      linha("GPU", data.gpu),
      linha("RAM", data.ram),
      linha("Armazenamento", data.armazenamento),
      linha("Windows", data.windows),
      "",
      linha("Jogo", data.jogo),
      linha("FPS atual", data.fps_atual),
      linha("Resolução", data.resolucao),
      "",
      "Problema:",
      data.problema,
      "",
      "Informações adicionais:",
      data.info_adicional?.trim() || "—",
      "",
      linha("Plano pedido", data.plano),
      linha("Screenshot", screenshotLink || "sem anexo"),
    ].join("\n");

    // Envio de email por Resend. Só acontece se a chave estiver configurada;
    // o pedido fica sempre guardado na base de dados.
    const resendKey = process.env["RESEND_API_KEY"];
    let emailEnviado = false;

    if (resendKey) {
      try {
        const from = process.env["RESEND_FROM"] ?? "Nexora Boost <onboarding@resend.dev>";
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: [DESTINO],
            subject: `NOVO PEDIDO — NEXORA BOOST (${data.nome})`,
            text: corpo,
          }),
        });
        emailEnviado = res.ok;
        if (!res.ok) {
          console.error("Resend respondeu com erro:", res.status, await res.text());
        }
      } catch (err) {
        console.error("Falha no envio de email:", err);
      }
    } else {
      console.warn(
        "RESEND_API_KEY não configurada — pedido guardado na base de dados sem envio de email.",
      );
    }

    return { id: inserido.id, emailEnviado };
  });
