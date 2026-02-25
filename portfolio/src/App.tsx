import { Badge } from "./components/Badge";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Section } from "./components/Section";
import { resume } from "./data/resume";

export default function App() {
  const photoSrc = "/profile.png";
  const cvHref = "/cv.pdf";

  return (
    <div id="top" className="min-h-dvh bg-zinc-950">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-zinc-800/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-zinc-800/20 blur-3xl" />
      </div>

      <Header name={resume.name} photoSrc={photoSrc} cvHref={cvHref} />

      <main>
        {/* HERO */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-start md:gap-y-6">
            {/* Left (row 1): texto + skills */}
            <div className="md:col-start-1 md:row-start-1">
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {resume.name}
              </h1>
              <p className="mt-3 text-lg text-zinc-300">{resume.headline}</p>
              <p className="mt-5 max-w-prose leading-relaxed text-zinc-300">
                {resume.aboutShort}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {resume.skills.slice(0, 8).map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>

            {/* Right (row 1): foto, no debe bajar a row 2 */}
            <div className="flex justify-center md:col-start-2 md:row-start-1 md:justify-end">
              <div className="relative">
                <div className="absolute -inset-6 rounded-[28px] bg-zinc-800/30 blur-2xl" />
                <div className="relative w-[min(520px,calc(100vw-2rem))] overflow-hidden rounded-[28px] border border-zinc-700/60 bg-zinc-900/30 backdrop-blur md:w-[520px] md:h-[380px] lg:h-[430px]">
                  <img
                    src={photoSrc}
                    alt={`Foto de ${resume.name}`}
                    className="h-full w-full object-contain object-center"
                    loading="eager"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/35 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            {/* Left (row 2): CTAs + links (debajo de la línea) */}
            <div className="md:col-start-1 md:row-start-2">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-xl bg-zinc-800 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-700"
                >
                  Ver proyectos
                </a>
                <a
                  href={cvHref}
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-700/70 bg-zinc-900/40 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-900"
                >
                  Descargar CV (PDF)
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {resume.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      l.href.startsWith("http")
                        ? "noreferrer noopener"
                        : undefined
                    }
                    className="text-sm font-medium text-zinc-300 hover:text-white"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right (row 2): ubicación + CTA CV */}
            <div className="md:col-start-2 md:row-start-2 md:flex md:justify-end">
              <div className="w-[min(520px,calc(100vw-2rem))] rounded-2xl border border-zinc-700/60 bg-zinc-900/30 p-5 text-zinc-200 backdrop-blur md:w-[520px]">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                  Ubicación
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {resume.location ?? "—"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SOBRE MI */}
        <Section id="about" title="Sobre mí" eyebrow="Perfil">
          <div className="rounded-2xl border border-zinc-700/60 bg-zinc-900/30 p-6 leading-relaxed text-zinc-200 backdrop-blur whitespace-pre-line">
            {resume.aboutLong}
          </div>
        </Section>

        {/* EXPERIENCIA */}
        <Section id="experience" title="Experiencia" eyebrow="Trayectoria">
          <div className="grid grid-cols-1 gap-4">
            {resume.experience.map((e) => (
              <article
                key={`${e.company}-${e.role}-${e.start}`}
                className="rounded-2xl border border-zinc-700/60 bg-zinc-900/30 p-6 backdrop-blur"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {e.role} · {e.company}
                  </h3>
                  <p className="text-sm font-medium text-zinc-400">
                    {e.start} — {e.end}
                    {e.location ? ` · ${e.location}` : ""}
                  </p>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-200">
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        {/* PROYECTOS */}
        <Section id="projects" title="Proyectos" eyebrow="Trabajo destacado">
          {resume.projects.length ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {resume.projects.map((p) => (
                <article
                  key={p.name}
                  className="group rounded-2xl border border-zinc-700/60 bg-zinc-800/30 p-6 backdrop-blur transition hover:bg-zinc-800/40"
                >
                  <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-200">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                  {p.links?.length ? (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {p.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-sm font-semibold text-zinc-200 underline-offset-4 hover:text-white hover:underline"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-zinc-700/60 bg-zinc-900/30 p-6 text-zinc-200 backdrop-blur">
              <p className="text-sm leading-relaxed">
                En el CV no aparecen proyectos específicos. Si quieres, puedo
                agregarlos aquí (con demo/código/stack) y dejarlos listos para
                reclutadores.
              </p>
            </div>
          )}
        </Section>

        {/* HABILIDADES */}
        <Section id="skills" title="Habilidades & Experiencia">
          <div className="space-y-7">
            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-zinc-300">
              {resume.skillsIntro ??
                "Habilidades técnicas enfocadas en construir productos web modernos, escalables y seguros."}
            </p>

            {resume.skillGroups?.length ? (
              <div className="space-y-7">
                {resume.skillGroups.map((group) => (
                  <div key={group.title}>
                    <div className="mb-3 flex items-center gap-4">
                      <h3 className="text-sm font-semibold text-white">
                        {group.title}
                      </h3>
                      <div className="h-px flex-1 bg-zinc-800/90" />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
                      {group.items.map((item) => (
                        <div
                          key={`${group.title}-${item.name}`}
                          className="rounded-xl border border-zinc-700/60 bg-zinc-900/30 p-4 backdrop-blur transition hover:bg-zinc-900/40"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-2">
                              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-zinc-700/60 bg-zinc-800/60 text-[11px] font-semibold text-zinc-200">
                                {item.name.slice(0, 1).toUpperCase()}
                              </span>
                              <p className="truncate text-sm font-semibold text-zinc-100">
                                {item.name}
                              </p>
                            </div>
                            <p className="text-xs font-semibold text-zinc-300">
                              {item.level}%
                            </p>
                          </div>

                          <div className="mt-3 h-2 w-full rounded-full bg-zinc-800/80">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-zinc-200/80 to-zinc-400/80"
                              style={{
                                width: `${Math.max(0, Math.min(100, item.level))}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-zinc-700/60 bg-zinc-900/30 p-6 text-zinc-200 backdrop-blur">
                <p className="text-sm leading-relaxed text-zinc-200">
                  No hay grupos de habilidades configurados.
                </p>
              </div>
            )}
          </div>
        </Section>

        {/* EDUCACIÓN */}
        <Section id="education" title="Educación" eyebrow="Formación">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {resume.education.map((ed) => (
              <article
                key={`${ed.institution}-${ed.title}`}
                className="rounded-2xl border border-zinc-700/60 bg-zinc-900/30 p-6 backdrop-blur"
              >
                <h3 className="text-lg font-semibold text-white">{ed.title}</h3>
                <p className="mt-1 text-sm font-medium text-zinc-300">
                  {ed.institution}
                </p>
                {ed.start || ed.end ? (
                  <p className="mt-2 text-sm text-zinc-400">
                    {ed.start ?? "—"} — {ed.end ?? "—"}
                  </p>
                ) : null}
                {ed.details?.length ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-200">
                    {ed.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </Section>

        {/* CERTIFICACIONES */}
        {resume.certifications?.length ? (
          <Section
            id="certifications"
            title="Certificaciones y cursos"
            eyebrow="Aprendizaje continuo"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {resume.certifications.map((c) => (
                <article
                  key={`${c.name}-${c.issuer}-${c.date ?? ""}`}
                  className="rounded-2xl border border-zinc-700/60 bg-zinc-900/30 p-6 backdrop-blur"
                >
                  <h3 className="text-base font-semibold text-white">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-zinc-300">
                    {c.issuer}
                  </p>
                  {c.date ? (
                    <p className="mt-2 text-sm text-zinc-400">{c.date}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </Section>
        ) : null}

        {/* CONTACTO */}
        <Section id="contact" title="Contacto" eyebrow="Hablemos">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-zinc-700/60 bg-zinc-900/30 p-6 text-zinc-200 backdrop-blur">
                <p className="text-sm leading-relaxed text-zinc-200">
                  Si quieres trabajar conmigo o tienes una idea, escríbeme por
                  email o WhatsApp. Respondo rápido.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {resume.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        l.href.startsWith("http")
                          ? "noreferrer noopener"
                          : undefined
                      }
                      className="inline-flex items-center justify-center rounded-xl bg-zinc-800 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-700"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer name={resume.name} />
    </div>
  );
}
