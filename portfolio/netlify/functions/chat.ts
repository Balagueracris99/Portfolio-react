import type { Handler } from "@netlify/functions";
import { resume } from "../../src/data/resume";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const BUILD_TAG = "chat-fn-v2";

function resolveApiKey() {
  return (
    process.env.OPENAI_API_KEY ||
    process.env.OPENAI_APIKEY ||
    process.env.OPENAI_KEY ||
    ""
  ).trim();
}

function openAiEnvDiagnostics() {
  const keys = Object.keys(process.env ?? {});
  const openaiKeys = keys.filter((k) => k.toUpperCase().includes("OPENAI")).sort();
  const present = {
    OPENAI_API_KEY: Boolean(process.env.OPENAI_API_KEY?.trim()),
    OPENAI_APIKEY: Boolean(process.env.OPENAI_APIKEY?.trim()),
    OPENAI_KEY: Boolean(process.env.OPENAI_KEY?.trim()),
  };
  return { openaiKeys, present };
}

function profileContext(): string {
  const lines: string[] = [];
  lines.push(`Nombre: ${resume.name}`);
  lines.push(`Headline: ${resume.headline}`);
  if (resume.location) lines.push(`Ubicación: ${resume.location}`);
  lines.push("");
  lines.push("Perfil corto:");
  lines.push(resume.aboutShort);
  lines.push("");
  lines.push("Sobre mí:");
  lines.push(resume.aboutLong);
  lines.push("");
  if (resume.languages?.length) {
    lines.push(`Idiomas: ${resume.languages.join(", ")}`);
    lines.push("");
  }
  if (resume.skills?.length) {
    lines.push(`Skills: ${resume.skills.join(", ")}`);
    lines.push("");
  }
  if (resume.skillGroups?.length) {
    lines.push("Habilidades por categoría:");
    for (const g of resume.skillGroups) {
      lines.push(
        `- ${g.title}: ${g.items.map((i) => `${i.name} (${i.level}%)`).join(", ")}`,
      );
    }
    lines.push("");
  }
  if (resume.experience?.length) {
    lines.push("Experiencia:");
    for (const e of resume.experience) {
      lines.push(`- ${e.role} — ${e.company} (${e.start} a ${e.end})`);
    }
    lines.push("");
  }
  if (resume.projects?.length) {
    lines.push("Proyectos:");
    for (const p of resume.projects) {
      lines.push(`- ${p.name}: ${p.description}`);
      if (p.links?.length) {
        lines.push(`  Links: ${p.links.map((l) => `${l.label}=${l.href}`).join(" | ")}`);
      }
    }
    lines.push("");
  }
  if (resume.certifications?.length) {
    lines.push("Cursos/Certificaciones:");
    for (const c of resume.certifications) {
      lines.push(`- ${c.date ?? ""} ${c.name} — ${c.issuer}`.trim());
    }
  }

  return lines.join("\n");
}

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
    },
    body: JSON.stringify(body),
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST,OPTIONS",
        "access-control-allow-headers": "content-type",
      },
      body: "",
    };
  }

  const apiKey = resolveApiKey();
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  // Health check (útil para verificar variables de entorno en Netlify)
  if (event.httpMethod === "GET") {
    const diag = openAiEnvDiagnostics();
    return json(200, {
      ok: true,
      buildTag: BUILD_TAG,
      context: process.env.CONTEXT ?? null,
      commitRef: process.env.COMMIT_REF ?? null,
      deployId: process.env.DEPLOY_ID ?? null,
      hasApiKey: Boolean(apiKey),
      ...diag,
      model,
    });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  if (!apiKey) {
    const diag = openAiEnvDiagnostics();
    return json(500, {
      error: "Falta la variable de entorno OPENAI_API_KEY en Netlify.",
      hint: "Netlify → Site settings → Environment variables → OPENAI_API_KEY",
      buildTag: BUILD_TAG,
      context: process.env.CONTEXT ?? null,
      ...diag,
    });
  }

  let payload: { message?: string; history?: ChatMessage[] };
  try {
    payload = event.body ? JSON.parse(event.body) : {};
  } catch {
    return json(400, { error: "JSON inválido" });
  }

  const message = (payload.message ?? "").trim();
  if (!message) {
    return json(400, { error: "El campo 'message' es requerido" });
  }
  if (message.length > 1200) {
    return json(400, { error: "El mensaje es demasiado largo" });
  }

  const history = Array.isArray(payload.history) ? payload.history.slice(-8) : [];

  const systemPrompt = [
    "Eres un asistente tipo chatbot en el portfolio personal del usuario.",
    "Tu objetivo es responder preguntas sobre el perfil profesional usando SOLO la información del contexto.",
    "Si te preguntan algo que no está en el contexto, dilo claramente y sugiere qué dato falta.",
    "Responde SIEMPRE en español, de forma concisa y útil.",
    "",
    "CONTEXTO DEL PERFIL:",
    profileContext(),
  ].join("\n");

  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        { role: "system", content: systemPrompt },
        ...history.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: message },
      ],
    }),
  });

  if (!upstream.ok) {
    const contentType = upstream.headers.get("content-type") ?? "";
    const requestId =
      upstream.headers.get("x-request-id") ??
      upstream.headers.get("openai-request-id") ??
      undefined;

    let detailsText = "";
    let detailsJson: unknown = null;
    try {
      if (contentType.includes("application/json")) {
        detailsJson = await upstream.json();
        detailsText = JSON.stringify(detailsJson);
      } else {
        detailsText = await upstream.text();
      }
    } catch {
      detailsText = "";
    }

    return json(502, {
      error: "Error llamando a la API de IA",
      status: upstream.status,
      requestId,
      details: detailsText.slice(0, 2000),
      detailsJson,
    });
  }

  const data = (await upstream.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const answer = data.choices?.[0]?.message?.content?.trim();

  return json(200, {
    answer: answer || "No pude generar una respuesta. Intenta de nuevo.",
  });
};

