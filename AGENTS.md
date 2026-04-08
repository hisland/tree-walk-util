# AGENTS.md

## Cursor Cloud specific instructions

This is a pure TypeScript utility library (`tree-walk-util`) with zero runtime dependencies. No external services, databases, or Docker are needed.

### Key commands

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Run tests | `npm test` (Jest, 24 tests across 5 suites) |
| Build (CJS/UMD/ESM) | `npm run compile` (Rollup) |

### Notes

- There is no ESLint or other linter configured. Type checking via `tsc --noEmit` will produce errors from `node_modules/@types/node` due to the older TypeScript 4.x pinned in devDependencies — this is expected and does not affect tests or builds.
- The build output goes to `dist/` (CJS, UMD, ESM bundles).
- No lock file is committed; `npm install` resolves from `package.json` ranges each time.
