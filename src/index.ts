#!/usr/bin/env node
import degit from "degit";
import prompts from "prompts";
import kleur from "kleur";
import { templates } from "./templates";
import { isValidProjectName, projectExists, formatError } from "./utils";

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
  ${kleur.bold().cyan("cur8d")} — scaffold a new project from a cur8d template

  ${kleur.bold("Usage:")}
    create-cur8d [project-name] [options]

  ${kleur.bold("Options:")}
    -t, --template <name>   Template to use (${Object.keys(templates).join(", ")})
    -h, --help              Display this help message
    -v, --version           Display version

  ${kleur.bold("Templates:")}
${Object.entries(templates)
  .map(([k, t]) => `    ${kleur.cyan(k.padEnd(10))} ${t.label} — ${t.description}`)
  .join("\n")}
    `);
    process.exit(0);
  }

  if (args.includes("--version") || args.includes("-v")) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pkg = require("../package.json");
      console.log(pkg.version ?? "0.2.0");
    } catch {
      console.log("0.2.0");
    }
    process.exit(0);
  }

  let projectName: string | undefined;
  let templateArg: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--template=")) {
      templateArg = arg.slice("--template=".length);
    } else if (arg.startsWith("-t=")) {
      templateArg = arg.slice("-t=".length);
    } else if (arg === "--template" || arg === "-t") {
      templateArg = args[i + 1];
      i++;
    } else if (!arg.startsWith("-") && !projectName) {
      projectName = arg;
    }
  }

  console.log(kleur.bold().cyan("\n  cur8d — curated project templates\n"));

  const responses = await prompts(
    [
      {
        type: projectName ? null : "text",
        name: "projectName",
        message: "Project name:",
        initial: "my-app",
        validate: (value: string) => {
          if (!isValidProjectName(value)) return "Only letters, numbers, hyphens, and underscores allowed";
          if (projectExists(value)) return `Directory "${value}" already exists`;
          return true;
        },
      },
      {
        type: templateArg ? null : "select",
        name: "template",
        message: "Choose a template:",
        choices: Object.entries(templates).map(([key, t]) => ({
          title: `${kleur.bold(key)} ${kleur.dim(`— ${t.description}`)}`,
          value: key,
        })),
      },
    ],
    {
      onCancel: () => {
        console.log(kleur.yellow("\nCancelled.\n"));
        process.exit(0);
      },
    }
  );

  projectName = projectName ?? responses.projectName;
  const template = templateArg ?? responses.template;

  if (!projectName || !template) {
    console.error(formatError("Project name and template are required."));
    process.exit(1);
  }

  if (!isValidProjectName(projectName)) {
    console.error(formatError("Invalid project name. Only letters, numbers, hyphens, and underscores are allowed."));
    process.exit(1);
  }

  if (!templates[template]) {
    console.error(formatError(`Unknown template: "${template}". Available: ${Object.keys(templates).join(", ")}`));
    process.exit(1);
  }

  if (projectExists(projectName)) {
    console.error(formatError(`Directory "${projectName}" already exists.`));
    process.exit(1);
  }

  console.log(kleur.dim(`\n  Cloning cur8d.${template} into ${projectName}...\n`));

  const emitter = degit(templates[template].repo, {
    cache: false,
    force: true,
    verbose: false,
  });

  try {
    await emitter.clone(projectName);
  } catch (err: any) {
    console.error(formatError(`Failed to clone template: ${err.message}`));
    process.exit(1);
  }

  console.log(kleur.green(`  ✔ Created ${projectName}\n`));
  console.log(kleur.bold("  Next steps:\n"));
  console.log(`  ${kleur.cyan("cd")} ${projectName}`);
  console.log(`  ${kleur.dim("# See README.md for setup instructions")}\n`);
}

main().catch((err) => {
  console.error(formatError(err.message));
  process.exit(1);
});
