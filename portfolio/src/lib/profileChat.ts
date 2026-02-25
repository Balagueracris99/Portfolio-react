import type { Resume } from "../data/resume";

function stripAccents(input: string) {
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function norm(input: string) {
  return stripAccents(input).toLowerCase().trim();
}

function includesAny(haystack: string, needles: string[]) {
  return needles.some((n) => haystack.includes(n));
}

function title(text: string) {
  return `${text}\n${"—".repeat(Math.min(48, Math.max(10, text.length)))}`;
}

function bullet(items: string[], opts?: { max?: number }) {
  const max = opts?.max ?? items.length;
  return items.slice(0, max).map((i) => `- ${i}`).join("\n");
}

function asLabelValue(label: string, value: string) {
  return `- ${label}: ${value}`;
}

function cleanQuestion(q: string) {
  return q.replace(/\s+/g, " ").trim();
}

function isSpecificMostRecent(q: string) {
  return includesAny(q, ["mas reciente", "más reciente", "ultima", "última", "actual"]);
}

export function answerFromProfile(questionRaw: string, resume: Resume): string {
  const q = norm(questionRaw);
  const qPretty = cleanQuestion(questionRaw);

  const isGreeting = includesAny(q, [
    "hola",
    "buenas",
    "buenos dias",
    "buenas tardes",
    "buenas noches",
    "hey",
  ]);

  if (isGreeting) {
    return [
      `Hola. Soy el asistente del portfolio de ${resume.name}.`,
      "",
      title("¿En qué puedo ayudarte?"),
      bullet(
        [
          "Proyectos desplegados (demos y links)",
          "Experiencia (más reciente y trayectoria)",
          "Habilidades (por categoría y porcentaje)",
          "Cursos/certificaciones",
          "Educación y contacto",
        ],
        { max: 10 },
      ),
      "",
      title("Ejemplos de preguntas"),
      bullet(
        [
          "¿Qué proyectos tienes desplegados?",
          "¿Cuál es tu experiencia más reciente?",
          "¿Qué tecnologías manejas?",
          "¿Qué cursos/certificaciones has hecho?",
          "¿Cómo puedo contactarte?",
        ],
        { max: 10 },
      ),
    ].join("\n");
  }

  const askProjects = includesAny(q, [
    "proyecto",
    "proyectos",
    "demo",
    "demos",
    "desplegado",
    "desplegados",
    "netlify",
    "portfolio",
  ]);
  if (askProjects) {
    if (!resume.projects?.length) {
      return "Actualmente no hay proyectos configurados en el portfolio.";
    }
    const lines: string[] = [];
    lines.push(title("Proyectos desplegados"));
    resume.projects.forEach((p, idx) => {
      lines.push(`${idx + 1}) ${p.name}`);
      lines.push(`   ${p.description}`);
      if (p.tech?.length) lines.push(`   Tech: ${p.tech.join(", ")}`);
      if (p.links?.length) {
        for (const l of p.links) lines.push(`   ${l.label}: ${l.href}`);
      }
      lines.push("");
    });
    lines.push("¿Quieres que agregue capturas (thumbnails) y el repositorio de GitHub a cada proyecto?");
    return lines.join("\n").trim();
  }

  const askExperience = includesAny(q, [
    "experiencia",
    "trabajo",
    "trabajos",
    "empleo",
    "empresa",
    "empresas",
    "cargo",
    "roles",
    "laboral",
  ]);
  if (askExperience) {
    if (!resume.experience?.length) return "No hay experiencia configurada.";
    const mostRecent = resume.experience[0];
    const lines: string[] = [];

    if (isSpecificMostRecent(q)) {
      lines.push(title("Experiencia más reciente"));
      lines.push(
        `${mostRecent.role} — ${mostRecent.company} (${mostRecent.start} → ${mostRecent.end})${
          mostRecent.location ? ` · ${mostRecent.location}` : ""
        }`,
      );
      if (mostRecent.highlights?.length) {
        lines.push("");
        lines.push("Logros/Responsabilidades:");
        lines.push(bullet(mostRecent.highlights, { max: 6 }));
      }
      return lines.join("\n");
    }

    lines.push(title("Experiencia profesional"));
    lines.push(
      `Más reciente: ${mostRecent.role} — ${mostRecent.company} (${mostRecent.start} → ${mostRecent.end}).`,
    );
    lines.push("");
    resume.experience.forEach((e) => {
      lines.push(
        `${e.role} — ${e.company} (${e.start} → ${e.end})${e.location ? ` · ${e.location}` : ""}`,
      );
      if (e.highlights?.length) lines.push(bullet(e.highlights, { max: 3 }));
      lines.push("");
    });
    return lines.join("\n").trim();
  }

  const askSkills = includesAny(q, [
    "habilidad",
    "habilidades",
    "skills",
    "tecnologia",
    "tecnologias",
    "stack",
    "herramienta",
    "herramientas",
    "porcentaje",
    "%",
  ]);
  if (askSkills) {
    const lines: string[] = [];
    lines.push(title("Habilidades"));
    if (resume.skillGroups?.length) {
      for (const g of resume.skillGroups) {
        lines.push(`${g.title}:`);
        lines.push(bullet(g.items.map((i) => `${i.name} (${i.level}%)`), { max: 8 }));
        lines.push("");
      }
    } else if (resume.skills?.length) {
      lines.push(resume.skills.join(", "));
    } else {
      lines.push("No hay habilidades configuradas.");
    }
    lines.push("Si me dices una tecnología específica, te digo dónde encaja (frontend/backend/etc.).");
    return lines.join("\n").trim();
  }

  const askCourses = includesAny(q, [
    "curso",
    "cursos",
    "certificacion",
    "certificaciones",
    "certificado",
    "certificados",
  ]);
  if (askCourses) {
    if (!resume.certifications?.length) return "No hay cursos/certificaciones configurados.";
    const lines: string[] = [];
    lines.push(title("Cursos y certificaciones"));
    lines.push("Orden: más recientes primero.");
    lines.push("");
    lines.push(
      bullet(
        resume.certifications.map(
          (c) => `${c.date ? `${c.date} — ` : ""}${c.name} (${c.issuer})`,
        ),
        { max: 30 },
      ),
    );
    return lines.join("\n");
  }

  const askEducation = includesAny(q, [
    "educacion",
    "estudio",
    "estudios",
    "universidad",
    "formacion",
    "titulo",
  ]);
  if (askEducation) {
    if (!resume.education?.length) return "No hay educación configurada.";
    const lines: string[] = [];
    lines.push(title("Educación"));
    lines.push(
      bullet(
        resume.education.map((ed) => {
          const range = [ed.start, ed.end].filter(Boolean).join(" → ");
          return `${ed.title} — ${ed.institution}${range ? ` (${range})` : ""}`;
        }),
      ),
    );
    return lines.join("\n");
  }

  const askContact = includesAny(q, [
    "contacto",
    "correo",
    "email",
    "mail",
    "whatsapp",
    "telefono",
    "cel",
    "numero",
    "ubicacion",
    "donde vives",
  ]);
  if (askContact) {
    const lines: string[] = [];
    lines.push(title("Contacto"));
    const contact = (resume.links ?? []).map((l) => asLabelValue(l.label, l.href));
    lines.push(contact.length ? contact.join("\n") : "- (Sin links configurados)");
    if (resume.location) {
      lines.push("");
      lines.push(asLabelValue("Ubicación", resume.location));
    }
    return lines.join("\n");
  }

  const askAbout = includesAny(q, ["perfil", "sobre mi", "sobre ti", "quien eres", "quien es"]);
  if (askAbout) {
    return [
      title("Sobre mí"),
      resume.aboutLong,
      "",
      title("Resumen (perfil corto)"),
      resume.aboutShort,
    ].join("\n");
  }

  return [
    `No estoy seguro de cómo responder a: “${qPretty}”.`,
    "",
    title("Prueba con"),
    bullet(
      [
        "¿Qué proyectos tienes desplegados?",
        "¿Cuál es tu experiencia más reciente?",
        "¿Qué tecnologías manejas?",
        "¿Qué cursos/certificaciones has hecho?",
        "¿Cómo puedo contactarte?",
      ],
      { max: 10 },
    ),
  ].join("\n");
}

