import { useMemo, useState } from "react";
import { Avatar } from "./Avatar";

type NavItem = { label: string; href: string };

export function Header(props: {
  name: string;
  photoSrc?: string;
  cvHref?: string;
}) {
  const [open, setOpen] = useState(false);

  const nav = useMemo<NavItem[]>(
    () => [
      { label: "Sobre mí", href: "#about" },
      { label: "Experiencia", href: "#experience" },
      { label: "Proyectos", href: "#projects" },
      { label: "Habilidades", href: "#skills" },
      { label: "Educación", href: "#education" },
      { label: "Certificaciones", href: "#certifications" },
      { label: "Contacto", href: "#contact" },
    ],
    [],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/70 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-500/60"
        >
          <Avatar name={props.name} src={props.photoSrc} size="sm" />
          <span className="text-sm font-semibold tracking-tight text-white">
            {props.name}
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-300 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {props.cvHref ? (
            <a
              href={props.cvHref}
              className="hidden rounded-xl border border-zinc-700/70 bg-zinc-800/60 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 md:inline-flex"
            >
              Descargar CV
            </a>
          ) : null}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-xl border border-zinc-700/70 bg-zinc-800/60 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800 md:hidden"
            aria-expanded={open}
            aria-label="Abrir menú"
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-zinc-800/70 bg-zinc-950/80 md:hidden">
          <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6">
            <div className="flex flex-col gap-2">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800/60 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              {props.cvHref ? (
                <a
                  href={props.cvHref}
                  className="mt-2 inline-flex items-center justify-center rounded-xl border border-zinc-700/70 bg-zinc-800/60 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Descargar CV
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

