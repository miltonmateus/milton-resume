<p align="center">
  <img src="public/favicon.png" alt="Milton Resume logo" width="88" />
</p>

<h1 align="center">Milton Resume</h1>

<p align="center">
  A web resume built with <strong>Angular standalone</strong>, featuring reusable templates to create, edit, and export professional resumes.
</p>

<p align="center">
  <a href="README.pt-BR.md">Português</a> · <strong>English</strong>
</p>

## About

This project was created to host Milton Mateus Alves Teixeira Filho's resume as a clean, responsive, and easy-to-maintain web experience.

Beyond being a personal resume, the application also works as a base for anyone who wants to reuse the templates created here and build their own resume. The content is structured in TypeScript, can be edited directly in the browser, and changes are stored locally.

## Features

- Resume versions in Portuguese and English, with a `PT-BR` / `EN-US` switcher.
- Visual templates for changing the resume style: `Classic`, `Executive`, `Dark`, and `Studio`.
- Inline text editing directly on the page.
- Local profile photo upload.
- JSON backup with import, export, and restore.
- Browser persistence using `localStorage`.
- Sections for summary, experience, education, certificates, recent projects, languages, and highlights.
- PDF generation through the browser print flow.
- Controls to add, remove, and reorder repeated items.

## Stack

- Angular 22 with standalone components.
- TypeScript.
- Modular CSS organized by responsibility.
- Lucide icons.
- pnpm as the package manager.
- ESLint, Prettier, Husky, and lint-staged for consistency.
- Vitest for tests.
- GitHub Actions for quality validation and GitHub Pages deployment.

## Running Locally

Install dependencies:

```bash
pnpm install
```

Start the local development server:

```bash
pnpm dev
```

Open:

```text
http://localhost:4200
```

## Available Scripts

```bash
pnpm dev           # runs Angular in development mode
pnpm build         # creates the production build
pnpm preview       # serves the production configuration locally
pnpm lint          # runs ESLint
pnpm test          # runs tests with Vitest
pnpm format        # formats files with Prettier
pnpm audit         # checks for known vulnerabilities
pnpm check         # lint + format check + tests + build
```

## Using as a Template

To create your own resume from this project:

1. Update the base resume data in `src/data/resume.data.ts`.
2. Adjust UI text in `src/data/ui-copy.data.ts` if you want to change labels, buttons, or messages.
3. Replace assets in `public/`, especially the profile photo, favicon, and placeholder.
4. Customize colors, spacing, and visual variations in `src/styles/`.
5. Run `pnpm dev`, edit the resume through the interface, and export a JSON backup when you are done.

The project keeps resume data in typed objects, which makes it easier to version content, translate the resume, and create new layouts without duplicating unnecessary markup.

## Structure

- `src/app`: Angular standalone application, components, and services.
- `src/app/components`: toolbar, dialogs, sidebar, content, highlights, and reusable controls.
- `src/app/services`: resume state, local persistence, and layout selection.
- `src/data`: base resume data and UI copy.
- `src/types`: TypeScript contracts used by templates and state.
- `src/constants`: storage keys, upload limits, and shared data.
- `src/features/icons`: integration with the Lucide icons used by the application.
- `src/styles`: global styles separated by theme, layout, and components.
- `public`: public images used by the resume.

## Quality

Before committing or publishing changes, run:

```bash
pnpm check
```

The project also has Husky and lint-staged configured to format and validate changed files before each commit.

## License

This project is a personal resume and portfolio base. You may adapt the templates to build your own resume, keeping credits when appropriate.
