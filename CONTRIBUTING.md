# Contributing to Artisan Cafe

First, thank you for considering contributing! This project is designed to be a clean, white-labelable cafe starter, so every improvement has real-world impact.

## 🐛 Reporting Bugs

1. **Search first** — check [existing issues](https://github.com/Pratyaksh1507/cafe-site/issues) to avoid duplicates.
2. **Use the bug report template** when opening a new issue.
3. Include:
   - Your Node.js version (`node -v`)
   - Steps to reproduce
   - What you expected vs what happened
   - Screenshots if relevant

## ✨ Requesting Features

Open an issue with the `enhancement` label. Describe the use case — especially how it would help a real cafe owner.

## 🔧 Submitting a Pull Request

1. **Fork** the repo and create a branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Follow the code style:**
   - Plain JavaScript (no TypeScript)
   - Tailwind CSS utility classes only (no inline styles)
   - Components go in `/components`, data in `/data`, API routes in `/app/api`
   - Keep `site.config.js` as the single source of truth for branding

3. **Test locally:**
   ```bash
   npm run dev
   npm run build   # must pass with 0 errors
   npm run lint
   ```

4. **Write a clear PR description** explaining what changed and why.

5. **One feature per PR** — smaller PRs are reviewed faster.

## 📋 PR Checklist

- [ ] `npm run build` passes with no errors
- [ ] `npm run lint` passes with no warnings
- [ ] No TypeScript files added (this is a JS project)
- [ ] No hardcoded strings that belong in `site.config.js`
- [ ] New environment variables added to `.env.example`
- [ ] README updated if the feature affects setup

## 🎨 Design Principles

- **Warm, premium café aesthetic** — the colour palette lives in `tailwind.config.js`. Never deviate from these tokens.
- **Mobile-first** — every component must work at 320px before being styled for desktop.
- **Performance conscious** — use `next/image` for all images, lazy load where appropriate.
- **Accessible** — all interactive elements need keyboard support and `aria-label` where needed.

---

Questions? Open a [Discussion](https://github.com/Pratyaksh1507/cafe-site/discussions).
