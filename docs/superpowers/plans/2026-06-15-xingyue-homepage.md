# XINGYUE Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete bilingual Next.js + Tailwind CSS homepage for `XINGYUE 星悦`, a moonlight-luxury jewelry independent site focused on moissanite, lab-grown diamonds, S925 silver settings, and custom K gold settings.

**Architecture:** Scaffold a small static Next.js App Router project. Keep the landing page in `src/app/page.tsx` using data arrays for repeated sections, with global brand styling in `src/app/globals.css` and metadata in `src/app/layout.tsx`.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, ESLint, npm.

---

## File Structure

- Create `package.json`: project scripts and dependencies.
- Create `next.config.ts`: minimal Next.js config.
- Create `tsconfig.json`: TypeScript config for Next.js.
- Create `postcss.config.mjs`: Tailwind PostCSS setup.
- Create `eslint.config.mjs`: Next.js ESLint flat config.
- Create `next-env.d.ts`: generated-style Next.js type reference.
- Create `src/app/layout.tsx`: root layout and SEO metadata.
- Create `src/app/page.tsx`: full homepage UI and bilingual content.
- Create `src/app/globals.css`: Tailwind import, theme variables, and reusable visual utilities.
- Create `src/app/page.test.tsx`: React Testing Library checks for required homepage content.
- Create `vitest.config.ts`: test runner config.
- Create `src/test/setup.ts`: DOM matcher setup.
- Create `.gitignore`: ignore dependencies and build output.

## Task 1: Scaffold Next.js Project Files

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `next-env.d.ts`
- Create: `.gitignore`

- [ ] **Step 1: Create project config**

Create `package.json` with scripts for development, build, lint, and tests:

```json
{
  "name": "xingyue-jewelry-homepage",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "@next/eslint-plugin-next": "latest",
    "@vitejs/plugin-react": "latest",
    "@vitest/ui": "latest",
    "jsdom": "latest",
    "lucide-react": "latest",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "tailwindcss": "latest",
    "typescript": "latest",
    "vitest": "latest"
  },
  "devDependencies": {
    "@eslint/eslintrc": "latest",
    "@tailwindcss/postcss": "latest",
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest"
  }
}
```

Add minimal framework config files:

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

```js
// postcss.config.mjs
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```

```js
// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

```ts
// next-env.d.ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// This file should not be edited
```

```gitignore
.next/
node_modules/
out/
dist/
coverage/
*.log
.env*
!.env.example
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`

Expected: `package-lock.json` is created and dependencies install successfully.

- [ ] **Step 3: Commit scaffold**

Run:

```bash
git add package.json package-lock.json next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs next-env.d.ts .gitignore
git commit -m "chore: scaffold next app"
```

## Task 2: Add Failing Homepage Content Test

**Files:**
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/app/page.test.tsx`

- [ ] **Step 1: Write the failing test**

Create test setup and a test that verifies the required bilingual homepage sections:

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

```ts
// src/test/setup.ts
import "@testing-library/jest-dom/vitest";
```

```tsx
// src/app/page.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("XINGYUE homepage", () => {
  it("renders the required bilingual jewelry homepage sections", () => {
    render(<Home />);

    expect(screen.getByText(/XINGYUE/i)).toBeInTheDocument();
    expect(screen.getByText(/星悦/)).toBeInTheDocument();
    expect(screen.getByText(/Moissanite/i)).toBeInTheDocument();
    expect(screen.getByText(/Lab-grown Diamond/i)).toBeInTheDocument();
    expect(screen.getByText(/S925 Silver/i)).toBeInTheDocument();
    expect(screen.getByText(/K Gold Custom/i)).toBeInTheDocument();
    expect(screen.getByText(/Certificates/i)).toBeInTheDocument();
    expect(screen.getByText(/IGI/i)).toBeInTheDocument();
    expect(screen.getByText(/xingyuejewelry.com/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because `src/app/page.tsx` does not exist yet.

- [ ] **Step 3: Commit failing test**

Run:

```bash
git add vitest.config.ts src/test/setup.ts src/app/page.test.tsx
git commit -m "test: cover xingyue homepage content"
```

## Task 3: Implement Layout, Global Styles, and Homepage

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.tsx`

- [ ] **Step 1: Add root layout**

Create `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XINGYUE 星悦 | Moissanite & Lab-grown Diamond Jewelry",
  description:
    "Bilingual jewelry homepage for moissanite, lab-grown diamond, S925 silver, and custom K gold settings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Add global Tailwind styles**

Create `src/app/globals.css`:

```css
@import "tailwindcss";

:root {
  --background: #f8f6ef;
  --foreground: #171717;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

::selection {
  background: #d8c28a;
  color: #111827;
}

.moon-surface {
  background:
    radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.95), transparent 28%),
    radial-gradient(circle at 75% 8%, rgba(196, 215, 226, 0.38), transparent 32%),
    linear-gradient(135deg, #fbfaf7 0%, #e9edf0 45%, #c8d2da 100%);
}

.diamond-glow {
  box-shadow:
    0 28px 80px rgba(53, 71, 88, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
}
```

- [ ] **Step 3: Implement homepage**

Create `src/app/page.tsx` with data arrays for navigation, categories, advantages, certificates, and reviews. The page must include header, hero banner, product categories, materials/customization, advantages, certificate section, customer reviews, domain section, and footer.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`

Expected: PASS for `renders the required bilingual jewelry homepage sections`.

- [ ] **Step 5: Commit homepage implementation**

Run:

```bash
git add src/app/layout.tsx src/app/globals.css src/app/page.tsx
git commit -m "feat: build xingyue homepage"
```

## Task 4: Verify Build, Lint, and Preview

**Files:**
- Modify only if verification reveals a real issue in files from Task 3.

- [ ] **Step 1: Run production build**

Run: `npm run build`

Expected: build completes successfully.

- [ ] **Step 2: Run lint**

Run: `npm run lint`

Expected: lint completes successfully, or if Next.js version no longer supports `next lint`, update `package.json` to use `eslint .` and run `npm run lint` again.

- [ ] **Step 3: Start development server**

Run: `npm run dev`

Expected: local site is available at `http://localhost:3000`.

- [ ] **Step 4: Browser visual check**

Open `http://localhost:3000` and verify:

- Desktop hero has visible brand, bilingual copy, and jewelry visual.
- Mobile layout stacks cleanly with no overlapping text.
- Product categories, advantages, certificates, testimonials, domain, and footer are visible.

- [ ] **Step 5: Commit verification fixes if needed**

If verification required edits, run:

```bash
git add package.json src/app/layout.tsx src/app/globals.css src/app/page.tsx
git commit -m "fix: polish homepage verification issues"
```

## Self-Review

- Spec coverage: Tasks cover framework setup, hero banner, product categories, materials/customization, lab-grown and moissanite advantages, certificates, reviews, domain section, footer, bilingual copy, and verification.
- Placeholder scan: No TBD, TODO, or "implement later" placeholders remain.
- Type consistency: Test imports `Home` from `src/app/page.tsx`, layout exports standard Next.js metadata and root layout, and config paths match the planned file tree.
