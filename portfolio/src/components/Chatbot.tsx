import { useEffect, useMemo, useRef, useState } from "react";
import { resume } from "../data/resume";
import { answerFromProfile } from "../lib/profileChat";

type Role = "user" | "assistant";
type ChatMessage = { role: Role; content: string };

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Chatbot(props: { name: string }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hola. Puedes preguntarme sobre el perfil de ${props.name}: experiencia, habilidades, cursos, educación, proyectos y contacto.`,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);

  const suggestions = useMemo(
    () => [
      "¿Cuál es tu experiencia más reciente?",
      "¿Qué tecnologías manejas?",
      "¿Qué proyectos tienes desplegados?",
      "¿Qué cursos/certificaciones has hecho?",
    ],
    [],
  );

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    }, 0);
    return () => window.clearTimeout(t);
  }, [open, messages.length]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setInput("");

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);

    try {
      const answer = answerFromProfile(trimmed, resume);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer || "No pude generar una respuesta. Intenta de nuevo.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "No pude generar una respuesta. Intenta de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-2xl border border-zinc-700/60 bg-zinc-900/60 px-4 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-zinc-900",
          open && "hidden",
        )}
        aria-label="Abrir chatbot"
      >
        <span className="grid h-6 w-6 place-items-center rounded-lg bg-zinc-800 text-xs">
          ?
        </span>
        ¿Tienes preguntas?
      </button>

      {/* Panel */}
      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Cerrar"
            onClick={() => setOpen(false)}
          />

          <div className="absolute bottom-5 right-5 w-[min(420px,calc(100vw-2.5rem))] overflow-hidden rounded-3xl border border-zinc-700/60 bg-zinc-950/80 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 px-5 py-4">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                  Chatbot
                </p>
                <p className="truncate text-sm font-semibold text-white">
                  Preguntas sobre el perfil
                </p>
              </div>
              <button
                type="button"
                className="rounded-xl border border-zinc-700/60 bg-zinc-900/40 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-900"
                onClick={() => setOpen(false)}
              >
                Cerrar
              </button>
            </div>

            <div ref={listRef} className="max-h-[55vh] space-y-3 overflow-auto px-5 py-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-zinc-800 text-white"
                        : "border border-zinc-800/80 bg-zinc-900/30 text-zinc-100",
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading ? (
                <div className="text-xs font-medium text-zinc-400">
                  Escribiendo…
                </div>
              ) : null}
            </div>

            <div className="border-t border-zinc-800/80 px-5 py-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    disabled={loading}
                    className="rounded-full border border-zinc-700/60 bg-zinc-900/40 px-3 py-1 text-xs font-semibold text-zinc-200 hover:bg-zinc-900 disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void send(input);
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta…"
                  rows={2}
                  className="min-h-[44px] w-full resize-none rounded-2xl border border-zinc-700/60 bg-zinc-900/40 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="inline-flex h-[44px] shrink-0 items-center justify-center rounded-2xl bg-zinc-800 px-4 text-sm font-semibold text-white hover:bg-zinc-700 disabled:opacity-50"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

