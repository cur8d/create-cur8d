#!/usr/bin/env node
import degit from "degit";
import prompts from "prompts";
import kleur from "kleur";
import { templates } from "./templates";
import { isValidProjectName, projectExists, formatError } from "./utils";

async function main() {
  const args = process.argv.slice(2);

  let projectName = args[0];
  const templateArg = args.find((a) => a.startsWith("--template="))?.split("=")[1];

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
