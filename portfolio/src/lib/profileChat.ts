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

function listLine(title: string, value: string) {
  return `${title}: ${value}`;
}

export function answerFromProfile(questionRaw: string, resume: Resume): string {
  const q = norm(questionRaw);

  const isGreeting = includesAny(q, [
    "hola",
    "buenas",
    "buenos dias",
    "buenas tardes",
    "buenas noches",
    "hey",
  ]);

  if (isGreeting) {
    return `Hola. Puedo responder sobre el perfil de ${resume.name}: experiencia, habilidades, cursos, educación, proyectos y contacto.\n\nEjemplos:\n- ¿Qué proyectos tienes desplegados?\n- ¿Cuál es tu experiencia más reciente?\n- ¿Qué tecnologías manejas?\n- ¿Qué cursos/certificaciones has hecho?`;
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
    lines.push("Proyectos desplegados:");
    for (const p of resume.projects) {
      lines.push(`\n- ${p.name}`);
      lines.push(`  ${p.description}`);
      if (p.links?.length) {
        for (const l of p.links) lines.push(`  ${l.label}: ${l.href}`);
      }
      if (p.tech?.length) lines.push(`  Tech: ${p.tech.join(", ")}`);
    }
    return lines.join("\n");
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
    const e0 = resume.experience[0];
    const lines: string[] = [];
    lines.push("Experiencia profesional:");
    for (const e of resume.experience) {
      lines.push(
        `\n- ${e.role} — ${e.company} (${e.start} → ${e.end})${
          e.location ? ` · ${e.location}` : ""
        }`,
      );
      if (e.highlights?.length) {
        for (const h of e.highlights.slice(0, 3)) lines.push(`  - ${h}`);
      }
    }
    lines.push(
      `\nMás reciente: ${e0.role} — ${e0.company} (${e0.start} → ${e0.end}).`,
    );
    return lines.join("\n");
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
  ]);
  if (askSkills) {
    const lines: string[] = [];
    lines.push("Habilidades:");
    if (resume.skillGroups?.length) {
      for (const g of resume.skillGroups) {
        lines.push(`\n${g.title}:`);
        for (const i of g.items) lines.push(`- ${i.name} (${i.level}%)`);
      }
    } else if (resume.skills?.length) {
      lines.push(resume.skills.join(", "));
    } else {
      lines.push("No hay habilidades configuradas.");
    }
    return lines.join("\n");
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
    lines.push("Cursos y certificaciones (más recientes primero):");
    for (const c of resume.certifications) {
      lines.push(`- ${c.date ? `${c.date} — ` : ""}${c.name} (${c.issuer})`);
    }
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
    lines.push("Educación:");
    for (const ed of resume.education) {
      const range = [ed.start, ed.end].filter(Boolean).join(" → ");
      lines.push(`- ${ed.title} — ${ed.institution}${range ? ` (${range})` : ""}`);
    }
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
    lines.push("Contacto:");
    for (const l of resume.links ?? []) {
      lines.push(`- ${l.label}: ${l.href}`);
    }
    if (resume.location) lines.push(listLine("Ubicación", resume.location));
    return lines.join("\n");
  }

  const askAbout = includesAny(q, ["perfil", "sobre mi", "sobre ti", "quien eres", "quien es"]);
  if (askAbout) {
    return `${resume.aboutLong}\n\nResumen:\n${resume.aboutShort}`;
  }

  return `Puedo ayudarte con preguntas sobre el perfil de ${resume.name}.\n\nPrueba con:\n- ¿Qué proyectos tienes desplegados?\n- ¿Cuál es tu experiencia más reciente?\n- ¿Qué tecnologías manejas?\n- ¿Qué cursos/certificaciones has hecho?\n- ¿Cómo puedo contactarte?`;
}

