import fs from "fs";
import path from "path";

export function isValidProjectName(name: string): boolean {
  return /^[a-zA-Z0-9-_]+$/.test(name);
}

export function projectExists(name: string): boolean {
  return fs.existsSync(path.resolve(process.cwd(), name));
}

export function formatError(message: string): string {
  return `\n✖ ${message}\n`;
}
