// Single source of truth for glossary terms.
// Edited here (not in glosario.astro / MiniGlossary.astro) so the full glossary
// page and the inline "Glosario rápido" can never drift apart.

export interface Termino {
  term: string;
  def: string;
}

export const terminos: Termino[] = [
  {
    term: 'CLI',
    def: 'Command Line Interface. La terminal. Una pantalla de texto donde escribes comandos directamente al ordenador, sin botones ni menús. Es la forma más directa de controlar un sistema.',
  },
  {
    term: 'Terminal',
    def: 'El programa que da acceso a la CLI. En Mac es Terminal o iTerm2. En Windows es PowerShell o Windows Terminal. Desde aquí lanzas herramientas, navegas por carpetas y ejecutas scripts.',
  },
  {
    term: 'VS Code',
    def: 'Visual Studio Code. El editor de código más usado del mundo. Gratuito y extensible. Desde aquí escribirás, editarás y revisarás casi todos tus proyectos. Claude Code funciona dentro de él.',
  },
  {
    term: 'Git',
    def: 'Sistema de control de versiones. Registra cada cambio que haces en tus archivos con un mensaje de qué cambiaste y por qué. Si algo se rompe, puedes volver a cualquier punto anterior.',
  },
  {
    term: 'GitHub',
    def: 'Plataforma donde subes tus repositorios Git. Es la nube de tu código. Sirve para guardar, colaborar, publicar proyectos y conectar con herramientas como Cloudflare Pages o Vercel.',
  },
  {
    term: 'Commit',
    def: 'Un punto de guardado con mensaje. Cada commit es una foto del estado de tu proyecto en ese momento. "Añadí la sección de glosario." "Arreglé el bug del header." Úsalos con frecuencia.',
  },
  {
    term: 'Repo',
    def: 'Repositorio. La carpeta de tu proyecto con todo su historial de cambios. Puede ser local (en tu ordenador) o remoto (en GitHub). Ambos se sincronizan con git push y git pull.',
  },
  {
    term: 'API',
    def: 'Application Programming Interface. Una puerta de acceso a una herramienta o servicio externo. Le envías una solicitud y recibes una respuesta. Así los programas se comunican entre sí.',
  },
  {
    term: 'API Key',
    def: 'Contraseña única que identifica quién hace la solicitud a una API. Trátala como una contraseña bancaria: no la compartas, no la pegues en un chat y nunca la subas a GitHub.',
  },
  {
    term: 'MCP',
    def: 'Model Context Protocol. Un estándar que permite a Claude conectarse con herramientas externas: sistemas de archivos, GitHub, bases de datos, navegadores. Convierte a Claude de asistente a operador de sistemas reales.',
  },
  {
    term: 'Claude Code',
    def: 'Herramienta de IA de Anthropic que funciona en tu terminal y tu editor. Lee tu proyecto, escribe código, ejecuta comandos y trabaja directamente en tu base de código. No es un chatbot, es un colaborador técnico.',
  },
  {
    term: 'CLAUDE.md',
    def: 'Archivo de instrucciones para Claude. Le dice qué es el proyecto, cómo debe trabajar, qué hacer y qué evitar. Es el contrato entre tú y tu asistente IA. Sin él, Claude trabaja sin contexto.',
  },
  {
    term: 'Deploy',
    def: 'Publicar un proyecto para que esté accesible en internet. Convierte código local en una URL real. Para proyectos estáticos, plataformas como Cloudflare Pages, Vercel o Netlify lo hacen gratis y en minutos.',
  },
  {
    term: 'Cloudflare Pages',
    def: 'Plataforma de hosting gratuito para proyectos estáticos. Conectas tu repo de GitHub, configuras el comando de build y cada vez que haces git push, tu sitio se actualiza automáticamente.',
  },
  {
    term: 'Markdown',
    def: 'Formato de texto ligero que convierte sintaxis simple en contenido estructurado. # es un título. **texto** es negrita. - es una lista. Úsalo para documentación, README, CLAUDE.md y notas técnicas.',
  },
];

// Curated subset shown inline in module pages ("Glosario rápido"), in this order.
// Keys must exist in `terminos`; any that don't are silently skipped.
export const MINI_GLOSARIO_KEYS = [
  'CLI', 'Terminal', 'VS Code', 'Git', 'GitHub', 'Repo',
  'Commit', 'API', 'MCP', 'CLAUDE.md', 'Deploy', 'Cloudflare Pages',
];

export const miniTerminos: Termino[] = MINI_GLOSARIO_KEYS
  .map((key) => terminos.find((t) => t.term === key))
  .filter((t): t is Termino => Boolean(t));
