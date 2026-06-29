// ════════════════════════════════════════════════════════════════════════
// Galaxy translations overlay. `galaxy.ts` holds the ES canonical content;
// this file provides en/th/fr/it/ch for the translatable fields (tagline,
// mission, per-module title/blurb). Constellation NAMES and module CODES stay
// canonical. `localizeConstellation()` in galaxy.ts merges this over canonical;
// any missing entry falls back to Spanish.
//
// GENERATED from the galaxy-i18n workflow. Re-run scripts/gen-galaxy-i18n.mjs
// to regenerate; edit translations there or here, but keep the shape.
// ════════════════════════════════════════════════════════════════════════

export interface ModuleT { title?: string; blurb?: string }
export interface ConstellationT { tagline?: string; mission?: string; modules?: Record<string, ModuleT> }
export type GalaxyI18n = Record<string, Record<string, ConstellationT>>;

export const galaxyI18n: GalaxyI18n = {
  "en": {
    "operator-core": {
      "tagline": "Operate AI",
      "mission": "The sun of the galaxy. You learn to operate Claude Code and AI systems like a pro: environment, context, prompts, version control and deploy. Everything else orbits here.",
      "modules": {
        "OC-01": {
          "title": "Operating environment",
          "blurb": "Terminal, VS Code and Claude Code ready to build."
        },
        "OC-02": {
          "title": "CLAUDE.md: persistent context",
          "blurb": "You give the AI memory so it works precise, not generic."
        },
        "OC-03": {
          "title": "Prompt Arsenal",
          "blurb": "Templates with role, structure and intent. Real work."
        },
        "OC-04": {
          "title": "Git & GitHub for operators",
          "blurb": "You version your work without fear of breaking anything."
        },
        "OC-05": {
          "title": "Automations and deploy",
          "blurb": "From manual script to a system that runs and ships on its own."
        },
        "OC-06": {
          "title": "ChatGPT → Claude migration",
          "blurb": "You move your context over and build a documented system."
        }
      }
    },
    "data-systems": {
      "tagline": "Backend that holds",
      "mission": "Postgres, Supabase and RLS: where data lives and who can touch it. Security as server authority, not the client's. The backbone of XHUB, Espejo and this school.",
      "modules": {
        "DS-01": {
          "title": "Modeling in Postgres",
          "blurb": "Tables, relations and types that won't betray you later."
        },
        "DS-02": {
          "title": "RLS: the server holds authority",
          "blurb": "Why the client-side gate is UX and RLS is the real security."
        },
        "DS-03": {
          "title": "Magic-link auth & sessions",
          "blurb": "Passwordless login and honest session handling."
        },
        "DS-04": {
          "title": "SECURITY DEFINER, RPC and triggers",
          "blurb": "Privileged logic without opening escalation holes."
        },
        "DS-05": {
          "title": "Local ↔ cloud sync",
          "blurb": "State in localStorage that syncs to the cloud losing nothing."
        },
        "DS-06": {
          "title": "Advisors, migrations and auditing",
          "blurb": "Versioned changes with a security linter as your safety net."
        }
      }
    },
    "builders": {
      "tagline": "Ship product",
      "mission": "Turning an idea into something that loads, looks good and deploys. Astro, components, multi-tenant, white-label and i18n. The craft behind Espejo and the XNLAB sites.",
      "modules": {
        "BD-01": {
          "title": "Astro & Vite that load fast",
          "blurb": "Fast static sites without heavy frameworks."
        },
        "BD-02": {
          "title": "Components and design tokens",
          "blurb": "A coherent visual system, not loose CSS."
        },
        "BD-03": {
          "title": "Multi-tenant & white-label",
          "blurb": "One product, many clients: Espejo's Store seam."
        },
        "BD-04": {
          "title": "i18n: one galaxy in 6 languages",
          "blurb": "Locale architecture without duplicating pages."
        },
        "BD-05": {
          "title": "Deploy: Cloudflare, domains, env",
          "blurb": "From localhost to a real URL with secure variables."
        },
        "BD-06": {
          "title": "From localStorage to backend",
          "blurb": "Swapping the data layer without rewriting the app."
        }
      }
    },
    "signal": {
      "tagline": "Quant & research",
      "mission": "Research systems that don't lie to themselves: read-only ingest, regime classification, market memory and calibration. The backbone of XCAP.",
      "modules": {
        "SG-01": {
          "title": "Read-only ingest & keyless edge",
          "blurb": "Pull data from the world without exposing credentials."
        },
        "SG-02": {
          "title": "Price-regime classifier",
          "blurb": "Know what state the market is in before you decide."
        },
        "SG-03": {
          "title": "Market Memory: forecast + calibration",
          "blurb": "A ledger that records predictions and measures hits."
        },
        "SG-04": {
          "title": "Anti-fabrication by construction",
          "blurb": "Designing the system so it can't invent data."
        },
        "SG-05": {
          "title": "Capital invariant",
          "blurb": "Capital only moves on real closes, never resets."
        },
        "SG-06": {
          "title": "Autopilot ticks & honest loops",
          "blurb": "Autonomous loops that accumulate learning, not noise."
        }
      }
    },
    "brand-surface": {
      "tagline": "Brand and surface",
      "mission": "What you see and how it sounds. Radical minimalism, typography, studio voice and translation that preserves meaning. XNLAB's aesthetic judgment applied to everything.",
      "modules": {
        "BS-01": {
          "title": "Radical minimalism",
          "blurb": "Edit and cut before you add. Surgery, not decoration."
        },
        "BS-02": {
          "title": "Typography with intent",
          "blurb": "Mixing sans and serif italic without it grating."
        },
        "BS-03": {
          "title": "Studio voice",
          "blurb": "Anonymous tone, direct, no smoke or empty promises."
        },
        "BS-04": {
          "title": "Translating while preserving meaning",
          "blurb": "Making English and Spanish say the same thing, not the literal."
        },
        "BS-05": {
          "title": "Color and depth",
          "blurb": "Glass, bands and color fields that add life without noise."
        }
      }
    },
    "ops-security": {
      "tagline": "The discipline",
      "mission": "The difference between a project and an incident. Secrets, threat model, adversarial auditing and isolation between projects. Discipline that protects the whole galaxy.",
      "modules": {
        "OS-01": {
          "title": "Secrets: public vs private",
          "blurb": "Which key can live in the client and which never can."
        },
        "OS-02": {
          "title": "Threat model of an SSG",
          "blurb": "Thinking like an attacker of a static site + anon key."
        },
        "OS-03": {
          "title": "Adversarial auditing",
          "blurb": "Verify every finding instead of trusting it. Refute first."
        },
        "OS-04": {
          "title": "Incident response & rollback",
          "blurb": "What you do when something breaks in production."
        },
        "OS-05": {
          "title": "Isolation between projects",
          "blurb": "One shared DB without one project stepping on another."
        }
      }
    }
  },
  "th": {
    "operator-core": {
      "tagline": "ปฏิบัติการ AI",
      "mission": "ดวงอาทิตย์ของกาแล็กซี ที่นี่คุณจะเรียนรู้การปฏิบัติการ Claude Code และระบบ AI อย่างมืออาชีพ ทั้งสภาพแวดล้อม บริบท prompt การจัดเวอร์ชัน และการ deploy ทุกสิ่งล้วนโคจรรอบจุดนี้",
      "modules": {
        "OC-01": {
          "title": "สภาพแวดล้อมการทำงาน",
          "blurb": "Terminal, VS Code และ Claude Code พร้อมลงมือสร้างได้ทันที"
        },
        "OC-02": {
          "title": "CLAUDE.md: บริบทที่คงอยู่ถาวร",
          "blurb": "มอบความจำให้ AI ทำงานได้แม่นยำ ไม่ใช่คำตอบกว้างๆ"
        },
        "OC-03": {
          "title": "Arsenal ของ prompt",
          "blurb": "เทมเพลตที่มีบทบาท โครงสร้าง และเจตนาชัดเจน สำหรับงานจริง"
        },
        "OC-04": {
          "title": "Git และ GitHub สำหรับ operator",
          "blurb": "จัดเวอร์ชันงานของคุณได้โดยไม่ต้องกลัวว่าจะพังอะไร"
        },
        "OC-05": {
          "title": "การทำงานอัตโนมัติและการ deploy",
          "blurb": "จาก script ที่ต้องรันเองสู่ระบบที่ทำงานและเผยแพร่ได้เอง"
        },
        "OC-06": {
          "title": "การย้ายจาก ChatGPT สู่ Claude",
          "blurb": "ย้ายบริบทของคุณและสร้างระบบที่มีเอกสารกำกับครบถ้วน"
        }
      }
    },
    "data-systems": {
      "tagline": "Backend ที่ทนทาน",
      "mission": "Postgres, Supabase และ RLS: ที่ที่ข้อมูลอาศัยอยู่และใครเข้าถึงได้ ความปลอดภัยคืออำนาจของเซิร์ฟเวอร์ ไม่ใช่ของไคลเอนต์ นี่คือกระดูกสันหลังของ XHUB, Espejo และโรงเรียนแห่งนี้",
      "modules": {
        "DS-01": {
          "title": "การออกแบบโมเดลข้อมูลใน Postgres",
          "blurb": "ตาราง ความสัมพันธ์ และชนิดข้อมูลที่จะไม่ทรยศคุณในภายหลัง"
        },
        "DS-02": {
          "title": "RLS: อำนาจอยู่ที่เซิร์ฟเวอร์",
          "blurb": "ทำไม gate ฝั่งไคลเอนต์จึงเป็นแค่ UX ส่วน RLS คือความปลอดภัยที่แท้จริง"
        },
        "DS-03": {
          "title": "Auth แบบ magic-link และเซสชัน",
          "blurb": "เข้าสู่ระบบโดยไม่ต้องใช้รหัสผ่านและจัดการเซสชันอย่างตรงไปตรงมา"
        },
        "DS-04": {
          "title": "SECURITY DEFINER, RPC และ trigger",
          "blurb": "ตรรกะที่มีสิทธิ์พิเศษโดยไม่เปิดช่องโหว่ให้ยกระดับสิทธิ์"
        },
        "DS-05": {
          "title": "การ sync ระหว่างเครื่องและคลาวด์",
          "blurb": "สถานะใน localStorage ที่อัปโหลดขึ้นคลาวด์ได้โดยไม่สูญหายแม้แต่น้อย"
        },
        "DS-06": {
          "title": "Advisors, migration และการตรวจสอบ",
          "blurb": "การเปลี่ยนแปลงที่จัดเวอร์ชันได้ พร้อม linter ความปลอดภัยคอยรองรับ"
        }
      }
    },
    "builders": {
      "tagline": "ส่งมอบผลิตภัณฑ์",
      "mission": "เปลี่ยนไอเดียให้เป็นสิ่งที่โหลดได้ ดูดี และ deploy ได้จริง ทั้ง Astro, คอมโพเนนต์, multi-tenant, white-label และ i18n นี่คือฝีมือเบื้องหลัง Espejo และเว็บไซต์ต่างๆ ของ XNLAB",
      "modules": {
        "BD-01": {
          "title": "Astro และ Vite ที่โหลดไว",
          "blurb": "เว็บไซต์ static ที่รวดเร็วโดยไม่ต้องพึ่ง framework หนักๆ"
        },
        "BD-02": {
          "title": "คอมโพเนนต์และ design token",
          "blurb": "ระบบภาพที่สอดคล้องกัน ไม่ใช่ CSS ที่กระจัดกระจาย"
        },
        "BD-03": {
          "title": "Multi-tenant และ white-label",
          "blurb": "ผลิตภัณฑ์เดียว ลูกค้าหลายราย: seam ของ Store ใน Espejo"
        },
        "BD-04": {
          "title": "i18n: กาแล็กซีเดียวใน 6 ภาษา",
          "blurb": "สถาปัตยกรรม locale ที่ไม่ต้องทำหน้าซ้ำซ้อน"
        },
        "BD-05": {
          "title": "Deploy: Cloudflare, โดเมน, env",
          "blurb": "จาก localhost สู่ URL จริงพร้อมตัวแปรที่ปลอดภัย"
        },
        "BD-06": {
          "title": "จาก localStorage สู่ backend",
          "blurb": "เปลี่ยนชั้นข้อมูลโดยไม่ต้องเขียนแอปใหม่ทั้งหมด"
        }
      }
    },
    "signal": {
      "tagline": "Quant และ research",
      "mission": "ระบบวิจัยที่ไม่หลอกตัวเอง: การ ingest แบบ read-only การจำแนกสภาวะตลาด Market Memory และการ calibrate นี่คือกระดูกสันหลังของ XCAP",
      "modules": {
        "SG-01": {
          "title": "Ingest แบบ read-only และ edge ที่ไม่ต้องใช้ key",
          "blurb": "ดึงข้อมูลจากโลกภายนอกโดยไม่เปิดเผย credential"
        },
        "SG-02": {
          "title": "ตัวจำแนกสภาวะของราคา (regime)",
          "blurb": "รู้ว่าตลาดอยู่ในสถานะใดก่อนตัดสินใจ"
        },
        "SG-03": {
          "title": "Market Memory: forecast และ calibration",
          "blurb": "ledger ที่บันทึกการพยากรณ์และวัดความแม่นยำ"
        },
        "SG-04": {
          "title": "ป้องกันการกุข้อมูลตั้งแต่การออกแบบ",
          "blurb": "ออกแบบระบบให้ไม่สามารถสร้างข้อมูลขึ้นมาเองได้"
        },
        "SG-05": {
          "title": "Capital invariant",
          "blurb": "เงินทุนจะขยับเฉพาะเมื่อปิดสถานะจริงเท่านั้น ไม่มีการรีเซ็ต"
        },
        "SG-06": {
          "title": "Autopilot ticks และ loop ที่ซื่อตรง",
          "blurb": "loop อัตโนมัติที่สั่งสมการเรียนรู้ ไม่ใช่สัญญาณรบกวน"
        }
      }
    },
    "brand-surface": {
      "tagline": "แบรนด์และพื้นผิว",
      "mission": "สิ่งที่เห็นและน้ำเสียงที่ได้ยิน มินิมอลลิสม์สุดขั้ว ตัวอักษร น้ำเสียงของสตูดิโอ และการแปลที่รักษาความหมายไว้ นี่คือเกณฑ์ทางสุนทรียะของ XNLAB ที่นำไปใช้กับทุกสิ่ง",
      "modules": {
        "BS-01": {
          "title": "มินิมอลลิสม์สุดขั้ว",
          "blurb": "ตัดและลดทอนก่อนที่จะเพิ่ม คือการผ่าตัด ไม่ใช่การประดับ"
        },
        "BS-02": {
          "title": "ตัวอักษรที่มีเจตนา",
          "blurb": "ผสาน sans กับ serif ตัวเอียงได้อย่างกลมกลืน ไม่ขัดตา"
        },
        "BS-03": {
          "title": "น้ำเสียงของสตูดิโอ",
          "blurb": "น้ำเสียงนิรนาม ตรงไปตรงมา ไม่มีคำลวงหรือคำสัญญาที่ว่างเปล่า"
        },
        "BS-04": {
          "title": "แปลโดยรักษาความหมาย",
          "blurb": "ให้ภาษาอังกฤษและสเปนสื่อความหมายเดียวกัน ไม่ใช่แปลตามตัวอักษร"
        },
        "BS-05": {
          "title": "สีและมิติความลึก",
          "blurb": "Glass แถบสี และฟิลด์สีที่เติมชีวิตชีวาโดยไม่สร้างความรกตา"
        }
      }
    },
    "ops-security": {
      "tagline": "วินัย",
      "mission": "ความต่างระหว่างโปรเจกต์กับเหตุการณ์ผิดพลาด ทั้งความลับ โมเดลภัยคุกคาม การตรวจสอบเชิงปฏิปักษ์ และการแยกขอบเขตระหว่างโปรเจกต์ วินัยที่ปกป้องทั้งกาแล็กซี",
      "modules": {
        "OS-01": {
          "title": "ความลับ: สาธารณะกับส่วนตัว",
          "blurb": "key ใดอยู่ในไคลเอนต์ได้ และ key ใดที่ห้ามเด็ดขาด"
        },
        "OS-02": {
          "title": "โมเดลภัยคุกคามของ SSG",
          "blurb": "คิดอย่างผู้โจมตีเว็บ static ที่มี anon key"
        },
        "OS-03": {
          "title": "การตรวจสอบเชิงปฏิปักษ์",
          "blurb": "พิสูจน์ทุกข้อค้นพบแทนที่จะเชื่อทันที หักล้างก่อนเสมอ"
        },
        "OS-04": {
          "title": "การรับมือเหตุการณ์และ rollback",
          "blurb": "สิ่งที่คุณต้องทำเมื่อบางอย่างพังบน production"
        },
        "OS-05": {
          "title": "การแยกขอบเขตระหว่างโปรเจกต์",
          "blurb": "DB ที่ใช้ร่วมกันโดยไม่ให้โปรเจกต์หนึ่งล้ำเข้าไปในอีกโปรเจกต์"
        }
      }
    }
  },
  "fr": {
    "operator-core": {
      "tagline": "Opérer l'IA",
      "mission": "Le soleil de la galaxie. Tu apprends à opérer Claude Code et les systèmes IA comme un pro : environnement, contexte, prompts, versioning et déploiement. Tout le reste gravite ici.",
      "modules": {
        "OC-01": {
          "title": "Environnement opérationnel",
          "blurb": "Terminal, VS Code et Claude Code prêts à construire."
        },
        "OC-02": {
          "title": "CLAUDE.md : contexte persistant",
          "blurb": "Tu donnes de la mémoire à l'IA pour qu'elle travaille avec précision, pas en générique."
        },
        "OC-03": {
          "title": "Arsenal de prompts",
          "blurb": "Des modèles avec rôle, structure et intention. Du travail concret."
        },
        "OC-04": {
          "title": "Git & GitHub pour opérateurs",
          "blurb": "Tu versionnes ton travail sans craindre de tout casser."
        },
        "OC-05": {
          "title": "Automatisations et déploiement",
          "blurb": "Du script manuel au système qui tourne et publie tout seul."
        },
        "OC-06": {
          "title": "Migration ChatGPT → Claude",
          "blurb": "Tu transfères ton contexte et montes un système documenté."
        }
      }
    },
    "data-systems": {
      "tagline": "Un backend qui tient",
      "mission": "Postgres, Supabase et RLS : où vit la donnée et qui peut y toucher. La sécurité comme autorité du serveur, pas du client. La colonne vertébrale de XHUB, Espejo et cette école.",
      "modules": {
        "DS-01": {
          "title": "Modélisation sous Postgres",
          "blurb": "Tables, relations et types qui ne te trahissent pas plus tard."
        },
        "DS-02": {
          "title": "RLS : l'autorité, c'est le serveur",
          "blurb": "Pourquoi le gate côté client relève de l'UX et la RLS de la vraie sécurité."
        },
        "DS-03": {
          "title": "Auth magic-link & sessions",
          "blurb": "Connexion sans mot de passe et gestion honnête de la session."
        },
        "DS-04": {
          "title": "SECURITY DEFINER, RPC et triggers",
          "blurb": "De la logique privilégiée sans ouvrir de failles d'escalade."
        },
        "DS-05": {
          "title": "Sync local ↔ cloud",
          "blurb": "Un état en localStorage qui remonte au cloud sans rien perdre."
        },
        "DS-06": {
          "title": "Advisors, migrations et audit",
          "blurb": "Des changements versionnés et un linter de sécurité comme filet."
        }
      }
    },
    "builders": {
      "tagline": "Livrer du produit",
      "mission": "Transformer une idée en quelque chose qui charge, qui a de l'allure et qui se déploie. Astro, composants, multi-tenant, white-label et i18n. Le métier d'Espejo et des sites de XNLAB.",
      "modules": {
        "BD-01": {
          "title": "Astro & Vite qui chargent vite",
          "blurb": "Des sites statiques rapides sans frameworks lourds."
        },
        "BD-02": {
          "title": "Composants et design tokens",
          "blurb": "Un système visuel cohérent, pas du CSS en vrac."
        },
        "BD-03": {
          "title": "Multi-tenant & white-label",
          "blurb": "Un produit, beaucoup de clients : le seam Store d'Espejo."
        },
        "BD-04": {
          "title": "i18n : une galaxie en 6 langues",
          "blurb": "Une architecture de locales sans dupliquer les pages."
        },
        "BD-05": {
          "title": "Déploiement : Cloudflare, domaines, env",
          "blurb": "De localhost à une vraie URL avec des variables sécurisées."
        },
        "BD-06": {
          "title": "De localStorage au backend",
          "blurb": "Changer la couche de données sans réécrire l'app."
        }
      }
    },
    "signal": {
      "tagline": "Quant & research",
      "mission": "Des systèmes de recherche qui ne se mentent pas à eux-mêmes : ingestion read-only, classification de régime, Market Memory et calibration. La colonne vertébrale de XCAP.",
      "modules": {
        "SG-01": {
          "title": "Ingestion read-only & edge sans clés",
          "blurb": "Faire entrer les données du monde sans exposer de credentials."
        },
        "SG-02": {
          "title": "Classificateur de régime de prix",
          "blurb": "Savoir dans quel état est le marché avant de décider."
        },
        "SG-03": {
          "title": "Market Memory : forecast + calibration",
          "blurb": "Un ledger qui enregistre les prédictions et mesure les bons coups."
        },
        "SG-04": {
          "title": "Anti-fabrication par construction",
          "blurb": "Concevoir le système pour qu'il ne puisse pas inventer de données."
        },
        "SG-05": {
          "title": "Capital invariant",
          "blurb": "Le capital ne bouge que sur des closes réels, jamais de reset."
        },
        "SG-06": {
          "title": "Autopilot ticks & boucles honnêtes",
          "blurb": "Des boucles autonomes qui accumulent de l'apprentissage, pas du bruit."
        }
      }
    },
    "brand-surface": {
      "tagline": "Marque et surface",
      "mission": "Ce qu'on voit et comment ça sonne. Minimalisme radical, typographie, voix de studio et traduction qui préserve le sens. Le sens esthétique de XNLAB appliqué à tout.",
      "modules": {
        "BS-01": {
          "title": "Minimalisme radical",
          "blurb": "Éditer et retirer plutôt qu'ajouter. De la chirurgie, pas de la déco."
        },
        "BS-02": {
          "title": "Typographie avec intention",
          "blurb": "Mêler sans et italique serif sans que ça grince."
        },
        "BS-03": {
          "title": "Voix de studio",
          "blurb": "Un ton anonyme, direct, sans esbroufe ni promesses creuses."
        },
        "BS-04": {
          "title": "Traduire en préservant le sens",
          "blurb": "Que l'anglais et l'espagnol disent la même chose, pas le littéral."
        },
        "BS-05": {
          "title": "Couleur et profondeur",
          "blurb": "Glass, bandes et aplats de couleur qui donnent vie sans bruit."
        }
      }
    },
    "ops-security": {
      "tagline": "La discipline",
      "mission": "La différence entre un projet et un incident. Secrets, modèle de menace, audit adversarial et isolation entre projets. La discipline qui protège toute la galaxie.",
      "modules": {
        "OS-01": {
          "title": "Secrets : public vs privé",
          "blurb": "Quelle clé peut vivre côté client et laquelle jamais."
        },
        "OS-02": {
          "title": "Modèle de menace d'une SSG",
          "blurb": "Penser comme l'attaquant d'un site statique + anon key."
        },
        "OS-03": {
          "title": "Audit adversarial",
          "blurb": "Vérifier chaque trouvaille au lieu de la croire. Réfuter d'abord."
        },
        "OS-04": {
          "title": "Incident response & rollback",
          "blurb": "Ce que tu fais quand quelque chose casse en production."
        },
        "OS-05": {
          "title": "Isolation entre projets",
          "blurb": "Une DB partagée sans qu'un projet n'empiète sur un autre."
        }
      }
    }
  },
  "it": {
    "operator-core": {
      "tagline": "Operare l'IA",
      "mission": "Il sole della galassia. Impari a operare Claude Code e i sistemi IA da professionista: ambiente, contesto, prompt, versionamento e deploy. Tutto il resto orbita qui.",
      "modules": {
        "OC-01": {
          "title": "Ambiente operativo",
          "blurb": "Terminal, VS Code e Claude Code pronti per costruire."
        },
        "OC-02": {
          "title": "CLAUDE.md: contesto persistente",
          "blurb": "Dai memoria all'IA perché lavori con precisione, non in modo generico."
        },
        "OC-03": {
          "title": "Arsenal di prompt",
          "blurb": "Template con ruolo, struttura e intenzione. Lavoro vero."
        },
        "OC-04": {
          "title": "Git e GitHub per operatori",
          "blurb": "Versiona il tuo lavoro senza paura di rompere nulla."
        },
        "OC-05": {
          "title": "Automazioni e deploy",
          "blurb": "Dallo script manuale al sistema che gira e pubblica da solo."
        },
        "OC-06": {
          "title": "Migrazione ChatGPT → Claude",
          "blurb": "Trasferisci il tuo contesto e monti un sistema documentato."
        }
      }
    },
    "data-systems": {
      "tagline": "Backend che regge",
      "mission": "Postgres, Supabase e RLS: dove vive il dato e chi può toccarlo. La sicurezza come autorità del server, non del client. La spina dorsale di XHUB, Espejo e questa scuola.",
      "modules": {
        "DS-01": {
          "title": "Modellazione in Postgres",
          "blurb": "Tabelle, relazioni e tipi che non ti tradiscono dopo."
        },
        "DS-02": {
          "title": "RLS: l'autorità è il server",
          "blurb": "Perché il gate del client è UX e la RLS è la sicurezza vera."
        },
        "DS-03": {
          "title": "Auth magic-link e sessioni",
          "blurb": "Login senza password e gestione onesta della sessione."
        },
        "DS-04": {
          "title": "SECURITY DEFINER, RPC e trigger",
          "blurb": "Logica privilegiata senza aprire falle di escalation."
        },
        "DS-05": {
          "title": "Sync locale ↔ cloud",
          "blurb": "Stato in localStorage che sale nel cloud senza perdere nulla."
        },
        "DS-06": {
          "title": "Advisor, migrazioni e audit",
          "blurb": "Modifiche versionate e un linter di sicurezza come rete."
        }
      }
    },
    "builders": {
      "tagline": "Spedire prodotto",
      "mission": "Trasformare un'idea in qualcosa che carica, ha un bell'aspetto e si deploya. Astro, componenti, multi-tenant, white-label e i18n. Il mestiere di Espejo e dei siti di XNLAB.",
      "modules": {
        "BD-01": {
          "title": "Astro e Vite che caricano veloci",
          "blurb": "Siti statici rapidi senza framework pesanti."
        },
        "BD-02": {
          "title": "Componenti e design token",
          "blurb": "Un sistema visivo coerente, non CSS sparso."
        },
        "BD-03": {
          "title": "Multi-tenant e white-label",
          "blurb": "Un prodotto, tanti clienti: il seam Store di Espejo."
        },
        "BD-04": {
          "title": "i18n: una galassia in 6 lingue",
          "blurb": "Architettura di locale senza duplicare le pagine."
        },
        "BD-05": {
          "title": "Deploy: Cloudflare, domini, env",
          "blurb": "Da localhost a URL reale con variabili sicure."
        },
        "BD-06": {
          "title": "Da localStorage al backend",
          "blurb": "Cambiare lo strato dati senza riscrivere l'app."
        }
      }
    },
    "signal": {
      "tagline": "Quant e research",
      "mission": "Sistemi di ricerca che non mentono a se stessi: ingest read-only, classificazione del regime, Market Memory e calibrazione. La spina dorsale di XCAP.",
      "modules": {
        "SG-01": {
          "title": "Ingest read-only ed edge senza chiavi",
          "blurb": "Portare dati dal mondo senza esporre credenziali."
        },
        "SG-02": {
          "title": "Classificatore di regime di prezzo",
          "blurb": "Sapere in quale stato è il mercato prima di decidere."
        },
        "SG-03": {
          "title": "Market Memory: forecast + calibrazione",
          "blurb": "Un ledger che registra le previsioni e ne misura la precisione."
        },
        "SG-04": {
          "title": "Anti-fabbricazione per costruzione",
          "blurb": "Progettare il sistema perché non possa inventarsi i dati."
        },
        "SG-05": {
          "title": "Capital invariant",
          "blurb": "Il capitale si muove solo sui close reali, non si resetta mai."
        },
        "SG-06": {
          "title": "Autopilot tick e loop onesti",
          "blurb": "Loop autonomi che accumulano apprendimento, non rumore."
        }
      }
    },
    "brand-surface": {
      "tagline": "Brand e superficie",
      "mission": "Ciò che si vede e come suona. Minimalismo radicale, tipografia, voce di studio e traduzione che preserva il senso. Il criterio estetico di XNLAB applicato a tutto.",
      "modules": {
        "BS-01": {
          "title": "Minimalismo radicale",
          "blurb": "Editare e togliere prima che aggiungere. Chirurgia, non decorazione."
        },
        "BS-02": {
          "title": "Tipografia con intenzione",
          "blurb": "Mescolare sans e corsivo serif senza che stoni."
        },
        "BS-03": {
          "title": "Voce di studio",
          "blurb": "Tono anonimo, diretto, senza fumo né promesse vuote."
        },
        "BS-04": {
          "title": "Tradurre preservando il senso",
          "blurb": "Che inglese e spagnolo dicano la stessa cosa, non il letterale."
        },
        "BS-05": {
          "title": "Colore e profondità",
          "blurb": "Glass, bande e campi di colore che danno vita senza rumore."
        }
      }
    },
    "ops-security": {
      "tagline": "La disciplina",
      "mission": "La differenza tra un progetto e un incidente. Segreti, threat model, audit avversariale e isolamento tra progetti. La disciplina che protegge tutta la galassia.",
      "modules": {
        "OS-01": {
          "title": "Segreti: pubblico vs privato",
          "blurb": "Quale chiave può vivere nel client e quale mai."
        },
        "OS-02": {
          "title": "Threat model di una SSG",
          "blurb": "Pensare come chi attacca un sito statico + anon key."
        },
        "OS-03": {
          "title": "Audit avversariale",
          "blurb": "Verificare ogni risultato invece di crederci. Prima confutare."
        },
        "OS-04": {
          "title": "Incident response e rollback",
          "blurb": "Cosa fai quando qualcosa si rompe in produzione."
        },
        "OS-05": {
          "title": "Isolamento tra progetti",
          "blurb": "Un DB condiviso senza che un progetto pesti l'altro."
        }
      }
    }
  },
  "ch": {
    "operator-core": {
      "tagline": "KI operieren",
      "mission": "Die Sonne der Galaxie. Du lernst, Claude Code und KI-Systeme wie ein Profi zu bedienen: Umgebung, Kontext, Prompts, Versionierung und Deploy. Alles andere kreist um diesen Kern.",
      "modules": {
        "OC-01": {
          "title": "Operative Umgebung",
          "blurb": "Terminal, VS Code und Claude Code startklar zum Bauen."
        },
        "OC-02": {
          "title": "CLAUDE.md: persistenter Kontext",
          "blurb": "Du gibst der KI ein Gedächtnis, damit sie präzise arbeitet statt generisch."
        },
        "OC-03": {
          "title": "Prompt-Arsenal",
          "blurb": "Vorlagen mit Rolle, Struktur und Absicht. Echte Arbeit."
        },
        "OC-04": {
          "title": "Git & GitHub für Operator",
          "blurb": "Du versionierst deine Arbeit, ohne Angst, etwas kaputtzumachen."
        },
        "OC-05": {
          "title": "Automatisierung und Deploy",
          "blurb": "Vom manuellen Skript zum System, das von selbst läuft und veröffentlicht."
        },
        "OC-06": {
          "title": "Migration ChatGPT → Claude",
          "blurb": "Du überträgst deinen Kontext und baust ein dokumentiertes System auf."
        }
      }
    },
    "data-systems": {
      "tagline": "Backend, das hält",
      "mission": "Postgres, Supabase und RLS: wo die Daten leben und wer sie anfassen darf. Sicherheit als Autorität des Servers, nicht des Clients. Das Rückgrat von XHUB, Espejo und dieser Schule.",
      "modules": {
        "DS-01": {
          "title": "Modellierung in Postgres",
          "blurb": "Tabellen, Beziehungen und Typen, die dich später nicht im Stich lassen."
        },
        "DS-02": {
          "title": "RLS: die Autorität ist der Server",
          "blurb": "Warum das Client-Gate UX ist und RLS die echte Sicherheit."
        },
        "DS-03": {
          "title": "Auth Magic-Link & Sessions",
          "blurb": "Login ohne Passwörter und ehrliches Session-Handling."
        },
        "DS-04": {
          "title": "SECURITY DEFINER, RPC und Trigger",
          "blurb": "Privilegierte Logik, ohne Lücken zur Rechteausweitung zu öffnen."
        },
        "DS-05": {
          "title": "Sync lokal ↔ Cloud",
          "blurb": "State im localStorage, der in die Cloud wandert, ohne dass etwas verloren geht."
        },
        "DS-06": {
          "title": "Advisors, Migrationen und Audit",
          "blurb": "Versionierte Änderungen und ein Security-Linter als Netz."
        }
      }
    },
    "builders": {
      "tagline": "Produkt ausliefern",
      "mission": "Aus einer Idee etwas machen, das lädt, gut aussieht und deployt wird. Astro, Komponenten, Multi-Tenant, White-Label und i18n. Das Handwerk von Espejo und den Websites von XNLAB.",
      "modules": {
        "BD-01": {
          "title": "Astro & Vite, die schnell laden",
          "blurb": "Rasante statische Sites ohne schwere Frameworks."
        },
        "BD-02": {
          "title": "Komponenten und Design Tokens",
          "blurb": "Ein kohärentes visuelles System, kein loses CSS."
        },
        "BD-03": {
          "title": "Multi-Tenant & White-Label",
          "blurb": "Ein Produkt, viele Kunden: der Store-Seam von Espejo."
        },
        "BD-04": {
          "title": "i18n: eine Galaxie in 6 Sprachen",
          "blurb": "Locale-Architektur, ohne Seiten zu duplizieren."
        },
        "BD-05": {
          "title": "Deploy: Cloudflare, Domains, env",
          "blurb": "Von localhost zur echten URL mit sicheren Variablen."
        },
        "BD-06": {
          "title": "Von localStorage zum Backend",
          "blurb": "Die Datenschicht wechseln, ohne die App neu zu schreiben."
        }
      }
    },
    "signal": {
      "tagline": "Quant & Research",
      "mission": "Research-Systeme, die sich nicht selbst belügen: read-only Ingest, Regime-Klassifikation, Market Memory und Kalibrierung. Das Rückgrat von XCAP.",
      "modules": {
        "SG-01": {
          "title": "Read-only Ingest & edge ohne Keys",
          "blurb": "Daten aus der Welt holen, ohne Credentials offenzulegen."
        },
        "SG-02": {
          "title": "Klassifikator für Preisregime",
          "blurb": "Wissen, in welchem Zustand der Markt ist, bevor du entscheidest."
        },
        "SG-03": {
          "title": "Market Memory: Forecast + Kalibrierung",
          "blurb": "Ein Ledger, das Vorhersagen festhält und Treffer misst."
        },
        "SG-04": {
          "title": "Anti-Fabrikation per Konstruktion",
          "blurb": "Das System so bauen, dass es keine Daten erfinden kann."
        },
        "SG-05": {
          "title": "Capital invariant",
          "blurb": "Das Kapital bewegt sich nur bei echten Closes, wird nie zurückgesetzt."
        },
        "SG-06": {
          "title": "Autopilot ticks & ehrliche Loops",
          "blurb": "Autonome Loops, die Lernen akkumulieren, kein Rauschen."
        }
      }
    },
    "brand-surface": {
      "tagline": "Marke und Oberfläche",
      "mission": "Was man sieht und wie es klingt. Radikaler Minimalismus, Typografie, Studio-Stimme und Übersetzung, die den Sinn bewahrt. Der ästhetische Anspruch von XNLAB auf alles angewendet.",
      "modules": {
        "BS-01": {
          "title": "Radikaler Minimalismus",
          "blurb": "Editieren und weglassen, bevor du hinzufügst. Chirurgie, nicht Dekoration."
        },
        "BS-02": {
          "title": "Typografie mit Absicht",
          "blurb": "Sans und Serif-Kursiv mischen, ohne dass es kratzt."
        },
        "BS-03": {
          "title": "Studio-Stimme",
          "blurb": "Anonymer, direkter Ton, ohne Schaum und leere Versprechen."
        },
        "BS-04": {
          "title": "Übersetzen mit Sinn-Erhalt",
          "blurb": "Dass Englisch und Spanisch dasselbe sagen, nicht das Wörtliche."
        },
        "BS-05": {
          "title": "Farbe und Tiefe",
          "blurb": "Glass, Bänder und Farbfelder, die Leben geben ohne Lärm."
        }
      }
    },
    "ops-security": {
      "tagline": "Die Disziplin",
      "mission": "Der Unterschied zwischen einem Projekt und einem Vorfall. Secrets, Bedrohungsmodell, adversariales Audit und Isolation zwischen Projekten. Disziplin, die die ganze Galaxie schützt.",
      "modules": {
        "OS-01": {
          "title": "Secrets: öffentlich vs. privat",
          "blurb": "Welcher Key im Client leben darf und welcher niemals."
        },
        "OS-02": {
          "title": "Bedrohungsmodell einer SSG",
          "blurb": "Denken wie ein Angreifer auf eine statische Site + anon key."
        },
        "OS-03": {
          "title": "Adversariales Audit",
          "blurb": "Jeden Fund verifizieren statt ihm zu glauben. Erst widerlegen."
        },
        "OS-04": {
          "title": "Incident Response & Rollback",
          "blurb": "Was du tust, wenn in der Produktion etwas kaputtgeht."
        },
        "OS-05": {
          "title": "Isolation zwischen Projekten",
          "blurb": "Eine geteilte DB, ohne dass ein Projekt einem anderen in die Quere kommt."
        }
      }
    }
  }
};
