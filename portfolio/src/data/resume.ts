export type ResumeLink = { label: string; href: string };

export type ResumeCertification = {
  name: string;
  issuer: string;
  date?: string;
};

export type ResumeSkillItem = {
  name: string;
  level: number; // 0-100
};

export type ResumeSkillGroup = {
  title: string;
  items: ResumeSkillItem[];
};

export type ResumeExperience = {
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  highlights: string[];
};

export type ResumeProject = {
  name: string;
  description: string;
  tech: string[];
  links?: ResumeLink[];
};

export type ResumeEducation = {
  title: string;
  institution: string;
  start?: string;
  end?: string;
  details?: string[];
};

export type Resume = {
  name: string;
  headline: string;
  location?: string;
  aboutShort: string;
  aboutLong: string;
  links: ResumeLink[];
  skills: string[];
  skillsIntro?: string;
  skillGroups?: ResumeSkillGroup[];
  languages?: string[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  education: ResumeEducation[];
  certifications?: ResumeCertification[];
};

/**
 * Fuente: `CV CRISTHIAN BALAGUERA.pdf`
 */
export const resume: Resume = {
  name: "Cristhian Guillermo Balaguera Barrios",
  headline:
    "Software Developer (Angular / React / Vue · Node.js / .NET)",
  location: "Bogotá, Colombia",
  aboutShort:
    "Desarrollador de software con experiencia en aplicaciones web usando Angular (TypeScript, componentes, servicios y consumo de APIs REST), React, Vue.js y JavaScript ES6+. Experiencia backend con Node.js (Express) y .NET para construcción/consumo de APIs REST, integraciones y autenticación. Enfoque en calidad y seguridad con análisis estático y pruebas alineadas a OWASP Top 10.",
  aboutLong:
    "Soy un Ingeniero de Software dedicado con experiencia en diseñar y construir soluciones digitales impactantes. Soy apasionado por resolver problemas complejos y crear aplicaciones intuitivas y de alto rendimiento que deleiten a los usuarios.\n\nHe entregado exitosamente proyectos ayudando a startups y empresas a transformar sus ideas en aplicaciones web escalables usando tecnologías modernas. Mi expertise incluye HTML5, CSS3, JavaScript, PHP, MySQL, Angular, y otras tecnologías web modernas. Me enfoco en escribir código limpio, mantenible y escalable mientras me mantengo actualizado con las mejores prácticas de la industria.\n\nMás allá del código, me gusta explorar nuevas tecnologías, contribuir a proyectos y aprender continuamente. Thrive en entornos colaborativos y continuamente busco oportunidades para innovar.",
  links: [
    { label: "Email", href: "mailto:cbalaguera177@gmail.com" },
    { label: "WhatsApp", href: "https://wa.me/573046676878" },
    { label: "Teléfono", href: "tel:+573046676878" },
  ],
  skills: [
    "Angular",
    "TypeScript",
    "RxJS",
    "React",
    "Vue.js",
    "JavaScript (ES6+)",
    "Node.js",
    "Express",
    ".NET",
    "REST APIs",
    "SQL",
    "MySQL",
    "PHP",
    "HTML5",
    "CSS3",
    "OWASP Top 10",
    "Análisis de sistemas",
    "Resolución de problemas",
    "Gestión de incidentes y requerimientos",
    "Coordinación de equipos técnicos",
    "KPIs / SLAs",
    "Gestión de proveedores",
    "Soporte al cliente",
    "Gestión de proyectos",
  ],
  skillsIntro:
    "Continúo expandiendo mi conjunto de habilidades para entregar soluciones de vanguardia, manteniéndome actualizado con las últimas tecnologías y tendencias de la industria.",
  skillGroups: [
    {
      title: "Frontend",
      items: [
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 92 },
        { name: "JavaScript", level: 90 },
        { name: "Angular", level: 85 },
        { name: "React", level: 75 },
        { name: "Tailwind CSS", level: 75 },
        { name: "Bootstrap", level: 75 },
      ],
    },
    {
      title: "Backend",
      items: [
        { name: "PHP", level: 88 },
        { name: "Node.js", level: 78 },
        { name: "REST APIs", level: 85 },
        { name: "Express.js", level: 70 },
      ],
    },
    {
      title: "Database",
      items: [
        { name: "MySQL", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "SQL", level: 85 },
        { name: "Database Design", level: 82 },
      ],
    },
    {
      title: "Tools & Others",
      items: [
        { name: "Git", level: 90 },
        { name: "GitHub", level: 88 },
        { name: "VS Code", level: 92 },
        { name: "Scrum", level: 85 },
        { name: "OWASP Top 10", level: 75 },
      ],
    },
  ],
  languages: ["Español (nativo)", "Inglés (intermedio)"],
  experience: [
    {
      role: "Software Developer",
      company: "CREAPPTIVOS",
      location: "Bogotá, Colombia",
      start: "Sep 2025",
      end: "Actual",
      highlights: [
        "Desarrollo de aplicaciones web con Angular (TypeScript, RxJS, arquitectura modular), React, Vue.js y JavaScript ES6+.",
        "Construcción y consumo de APIs REST con Node.js (Express) y .NET, incluyendo autenticación y lógica de negocio.",
        "Diseño y gestión de bases de datos SQL, asegurando integridad y seguridad de datos.",
        "Análisis estático de código con SonarQube para mejorar mantenibilidad y reducir deuda técnica.",
        "Integración de APIs de terceros y servicios externos.",
        "Resolución de incidentes de producción y bugs en tiempo real en entornos Agile.",
      ],
    },
    {
      role: "Fiber Optic Supervisor – Maintenance & Support",
      company: "TABASCO OC LLC | CLARO COLOMBIA",
      location: "Barrancabermeja, Colombia",
      start: "Jul 2024",
      end: "Jul 2025",
      highlights: [
        "Supervisión de servicios administrativos y técnicos en múltiples sedes.",
        "Coordinación de mantenimientos preventivos, correctivos y actividades de facility.",
        "Asignación, seguimiento y cierre de tickets por prioridad y acuerdos SLA.",
        "Gestión de proveedores: asignación de órdenes, seguimiento y validación de cumplimiento.",
        "Monitoreo de SLAs, generación de alertas y propuestas de mejora continua.",
        "Gestión documental, reportes operativos y seguimiento de desviaciones.",
      ],
    },
    {
      role: "Telecommunications Maintenance Technologist",
      company: "TABASCO OC LLC | CLARO COLOMBIA",
      location: "Barrancabermeja, Colombia",
      start: "Jul 2023",
      end: "Jul 2024",
      highlights: [
        "Atención de requerimientos técnicos y correctivos en entornos de infraestructura de red.",
        "Configuración y mantenimiento de equipos corporativos (routers, switches, ONTs, radios).",
        "Soporte a entornos MPLS y SD-WAN, garantizando conectividad segura entre sedes.",
        "Administración/actualización de bases operativas (sistemas SQL) para seguimiento de infraestructura.",
        "Soporte de primer y segundo nivel, gestión de incidentes y análisis de causa raíz.",
        "Pruebas de seguridad alineadas a OWASP Top 10 usando OWASP ZAP.",
      ],
    },
    {
      role: "Systems Engineering Intern",
      company: "HART Ingeniería y Suministros",
      location: "Barrancabermeja, Colombia",
      start: "Dic 2022",
      end: "Jun 2023",
      highlights: [
        "Desarrollo e implementación del sitio web corporativo con PHP, MySQL, HTML5, CSS3 y JavaScript.",
        "Soporte a frontend con Angular (TypeScript, componentes, servicios) para mejorar experiencia de usuario.",
        "Diseño de bases relacionales y formularios seguros con validaciones y controles básicos alineados a OWASP.",
        "Mantenimiento, optimización de rendimiento y mejoras de usabilidad.",
        "Apoyo en integraciones con NetSuite: validación de datos, pruebas funcionales y sincronización.",
      ],
    },
  ],
  projects: [
    {
      name: "TechStore — Servicios",
      description:
        "Sitio web de servicios tecnológicos con secciones claras (servicios, reparaciones, productos y contacto), enfocado en conversión y navegación simple.",
      tech: ["Web", "UI", "Netlify"],
      links: [{ label: "Demo", href: "https://pagewebtech.netlify.app/" }],
    },
    {
      name: "Control de Inventarios",
      description:
        "Aplicación de gestión de producción/inventarios con autenticación (login/registro) y flujo orientado a operaciones.",
      tech: ["Web App", "Auth", "Netlify"],
      links: [
        { label: "Demo", href: "https://controlproduct.netlify.app/" },
        { label: "Login", href: "https://controlproduct.netlify.app/login" },
      ],
    },
  ],
  education: [
    {
      title: "Ingeniería de Sistemas",
      institution: "Universidad de Investigación y Desarrollo (UDI)",
      start: "Ago 2018",
      end: "Feb 2025",
    },
    {
      title: "Bachiller Técnico",
      institution: "Colegio Divino Niño Jesús",
      end: "Dic 2016",
    },
  ],
  certifications: [
    {
      name: "Junior Software Developer",
      issuer: "Amazon",
      date: "Feb 2026",
    },
    {
      name: "Introduction to Cyberattacks",
      issuer: "New York University",
      date: "Feb 2026",
    },
    { name: "Linux Fundamentals", issuer: "LearnQuest", date: "Jul 2025" },
    {
      name: "Technical Support Fundamentals",
      issuer: "United Latino Students Association",
      date: "Mar 2025",
    },
    {
      name: "Agile Fundamentals: First Steps Toward Agile Transformation",
      issuer: "Alura Latam",
      date: "Jun 2023",
    },
    {
      name: "G5 Personal Development Training – ONE",
      issuer: "Alura Latam",
      date: "May 2023",
    },
    {
      name: "Git and GitHub: Manage and Share Your Code with Git and GitHub",
      issuer: "Alura Latam",
      date: "Abr 2023",
    },
    {
      name: "HTML5 and CSS3 Part 1: My First Web Page",
      issuer: "Alura Latam",
      date: "Abr 2023",
    },
    {
      name: "HTML5 and CSS3 Part 2: Positioning, Lists, and Navigation",
      issuer: "Alura Latam",
      date: "Abr 2023",
    },
    {
      name: "HTML5 and CSS3 Part 3: Working with Forms and Tables",
      issuer: "Alura Latam",
      date: "Abr 2023",
    },
    {
      name: "Programming Logic: First Steps",
      issuer: "Alura Latam",
      date: "Abr 2023",
    },
    {
      name: "Programming Logic: Concepts",
      issuer: "Alura Latam",
      date: "Abr 2023",
    },
    {
      name: "Programming Logic: Practicing with Games and Animations",
      issuer: "Alura Latam",
      date: "Abr 2023",
    },
  ],
};

