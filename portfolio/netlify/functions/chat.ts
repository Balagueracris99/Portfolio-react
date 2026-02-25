declare const process: { env: Record<string, string | undefined> };
import { resume } from "../../src/data/resume";
import { answerFromProfile } from "../../src/lib/profileChat";

const BUILD_TAG = "chat-fn-local-profile";

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

export const handler = async (event: { httpMethod: string; body?: string }) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET,POST,OPTIONS",
        "access-control-allow-headers": "content-type",
      },
      body: "",
    };
  }

  // Health check
  if (event.httpMethod === "GET") {
    return json(200, {
      ok: true,
      buildTag: BUILD_TAG,
      context: process.env.CONTEXT ?? null,
      commitRef: process.env.COMMIT_REF ?? null,
      deployId: process.env.DEPLOY_ID ?? null,
    });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let payload: { message?: string };
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

  return json(200, {
    answer: answerFromProfile(message, resume),
  });
};

