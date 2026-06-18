export interface Template {
  label: string;
  repo: string;
  description: string;
}

export const templates: Record<string, Template> = {
  tsx: {
    label: "TypeScript / Next.js",
    repo: "cur8d/cur8d.tsx",
    description: "Next.js + TypeScript starter with opinionated defaults",
  },
  py: {
    label: "Python",
    repo: "cur8d/cur8d.py",
    description: "Python project template with opinionated structure",
  },
};
