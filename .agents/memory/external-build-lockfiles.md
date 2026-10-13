---
name: External deployment lockfiles
description: Avoid private workspace registry URLs in lockfiles used by external deploy platforms.
---

Before deploying outside Replit, check `package-lock.json` resolved tarball URLs for workspace-only package registries. Normalize private workspace URLs to canonical public npm registry URLs while preserving package versions and integrity hashes. Switching from `npm install` to `npm ci` alone does not fix unreachable hosts.

**Why:** A Vercel build failed during both `npm install` and `npm ci` because lockfile URLs pointed to Replit's internal package firewall; npm reported a misleading “Exit handler never called” error.

**How to apply:** For imported or Replit-installed Node projects that deploy elsewhere, search the lockfile for internal registry hosts, normalize them, then check that no private host remains and run the production build.
