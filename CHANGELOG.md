# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-09-04

### Added
- Instant fast-path responses for `--help` (`-h`) and `--version` (`-v`) flags before loading interactive dependencies.
- Validation for project names allowing only alphanumeric characters, hyphens, and underscores to prevent path traversal.

### Changed
- Standardized next-step guidance to recommend `mise run init` across all templates (`tsx`, `py`, and `lambda`).
- Upgraded dependencies: `degit` to `^3.9.0`, `typescript` to `^7.0.2`, and `@types/node` to `^26.4.1`.

## [0.2.0] - 2026-07-23

### Added
- AWS Lambda template support (`cur8d/lambda`).

## [0.1.1] - 2026-06-20

### Changed
- Switched to trusted publisher with provenance for npm.

## [0.1.0] - 2026-06-20

### Added
- Initial release of `create-cur8d` scaffolding CLI with TypeScript (`cur8d/typescript`) and Python (`cur8d/python`) templates.
