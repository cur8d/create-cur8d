# create-cur8d

Scaffold a new project from a [cur8d](https://cur8d.dev) template.

## Usage

```bash
# Interactive
npx create-cur8d

# With arguments
npx create-cur8d my-app --template tsx
npx create-cur8d my-api --template py
```

## Available Templates

| Template | Stack | Repo |
|----------|-------|------|
| `tsx` | TypeScript / Next.js | [cur8d/typescript](https://github.com/cur8d/typescript) |
| `py` | Python | [cur8d/python](https://github.com/cur8d/python) |

## Development

### Install Dependencies

```bash
pnpm install
```

### Run Locally

You can run the script locally in a few ways:

#### 1. Using ts-node (Recommended for development)
Run the script directly from source using `ts-node`:
```bash
# Interactive mode
pnpm run dev

# Or with arguments (pass args after --)
pnpm run dev -- my-app --template tsx
```

#### 2. Using the Compiled Script
Build the project and run the output JavaScript file using Node:
```bash
pnpm run build
node dist/index.js my-app --template tsx
```

#### 3. Using Mise Shell Aliases
If you have [mise](https://mise.jdx.dev/) installed, you can use the configured shell aliases:
```bash
# Install dependencies
i

# Run in development mode
d

# Build the project
b
```

## License

MIT © [cur8d](https://cur8d.dev)
