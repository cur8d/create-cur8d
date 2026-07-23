export interface Template {
  label: string;
  repo: string;
  description: string;
}

export const templates: Record<string, Template> = {
  lambda: {
    label: "AWS Lambda",
    repo: "cur8d/lambda",
    description: "Production-ready AWS Lambda project templates for real-life scenarios",
  },
  tsx: {
    label: "TypeScript / Next.js",
    repo: "cur8d/typescript",
    description: "Next.js + TypeScript starter with Tailwind CSS, HeroUI, and ESLint",
  },
  py: {
    label: "Python",
    repo: "cur8d/python",
    description: "Python project template preconfigured with management tools and best practices",
  },
};
