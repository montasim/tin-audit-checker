# TIN Audit List Checker

Check whether a Bangladesh Taxpayer Identification Number appears in a maintainer-supplied historical list described as Bangladesh risk-based audit selections for assessment year 2023–24.

<p>
  <a href="https://tin-audit-checker.netlify.app"><img alt="Open live app" src="https://img.shields.io/badge/Live_app-Netlify-00C7B7?logo=netlify&logoColor=white"></a>
  <a href="https://www.supportkori.com/montasim"><img alt="Support on SupportKori" src="https://img.shields.io/badge/Support-SupportKori-FFDD00"></a>
</p>

The checker searches 72,342 bundled records across 49 tax zones and returns the matching zone and circle when available. The lookup happens entirely in the browser: there is no account, analytics tracker, or server submission of the entered TIN.

**[Open the checker](https://tin-audit-checker.netlify.app) · [Ask NBR to verify a result](https://nbr.gov.bd/) · [Report an application bug](https://github.com/montasim/tin-audit-checker/issues)**

> **Unverified provenance:** The maintainer describes this as a historical assessment-year 2023–24 NBR audit-selection list, but the repository contains no original publication, authoritative source URL, acquisition record, importer, or redistribution-rights evidence. Treat both the attribution and every result as unverified until NBR or the relevant tax circle confirms them.

## Why this exists

The bundled list is inconvenient to search manually. This project turns that snapshot into a focused, mobile-friendly lookup while keeping the entered identifier on the user's device. It improves lookup usability; it does not establish the dataset's origin, accuracy, or legal status.

## Features

- Validates and formats 12-digit TIN input.
- Searches the bundled dataset locally in the browser.
- Shows the tax zone, circle, and assessment year for a matching record.
- Clearly distinguishes a match, no match, and dataset loading failure.
- Supports light and dark themes and keyboard-accessible result feedback.
- Works as a static, account-free web application.

## Check a TIN

1. Open the [live checker](https://tin-audit-checker.netlify.app).
2. Enter the 12-digit TIN you want to check.
3. Review the match state and, when present, the tax zone and circle.
4. Ask NBR or the listed tax circle to confirm both the source list and the current result before taking action.

The app normalizes formatting characters before searching. It does not tell you why a return was selected, whether an audit is still active, or the taxpayer's broader compliance status.

## Privacy and limitations

- The application downloads `public/tin-data.json` and searches it on the device.
- Entered TINs are not sent to an application server or stored by this project.
- A result only describes the bundled snapshot labeled as assessment year 2023–24.
- “Not found” does not guarantee a person's current tax or audit status.
- This is an independent tool, not an official NBR service. Verify important decisions with the [National Board of Revenue](https://nbr.gov.bd/) or the relevant tax circle.

Because the deployment ships the dataset file to every browser, its contents are retrievable from the deployed site. This privacy model protects the entered lookup query from application-server submission; it does not make the bundled records private or establish permission to republish them.

## Data source and methodology

The maintainer describes the bundled file as an NBR risk-based audit selection list for assessment year 2023–24. That attribution is not independently verifiable from this repository. The application stores entries as compact TIN, zone-index, and circle fields, then builds in-memory `Set` and `Map` indexes after the browser loads the JSON file; this runtime indexing is visible in code, but the earlier collection and normalization process is undocumented.

Important provenance limits:

- The repository does not include the claimed original NBR publication, an authoritative source URL, acquisition date, or chain-of-custody evidence.
- It does not include a reproducible import script that derives `public/tin-data.json` from source material.
- It does not establish that the records were public at collection time or that redistribution is permitted.
- A match therefore needs confirmation with NBR or the named tax circle before it informs a legal, tax, or financial decision.
- Dataset replacement should include the original source, acquisition date, assessment year, row count, normalization process, and validation evidence.

## Tech stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS and shadcn/ui
- A static JSON dataset indexed with JavaScript `Set` and `Map` collections
- Netlify for the live deployment

## Getting started

### Prerequisites

- Node.js 20.9.0 or newer
- pnpm

### Run locally

```bash
git clone https://github.com/montasim/tin-audit-checker.git
cd tin-audit-checker
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:3000>.

No environment variables or external services are required. The lookup data is loaded from [`public/tin-data.json`](./public/tin-data.json).

## Available commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the production server |
| `pnpm lint` | Run ESLint |

## Data flow

```text
12-digit TIN input
        │
        ▼
normalize in the browser
        │
        ▼
search bundled JSON index ──► match details or no match
```

The lookup route fetches the static JSON once per browser session, caches it in memory, strips non-digits from the submitted value, and returns only the match state and mapped details. There is no application API endpoint for TIN submission.

## Deployment

The production instance runs at [tin-audit-checker.netlify.app](https://tin-audit-checker.netlify.app). The application has no required environment variables or server-side data service; a production build bundles the interface and serves the browser-delivered JSON lookup file. Run `pnpm lint` and `pnpm build` before deployment.

## Project status and limitations

- This is a historical assessment-year lookup, not a live audit-status integration.
- “Not found” means only that the normalized value is absent from this bundled snapshot.
- The tool cannot explain selection reasons, audit progress, later notices, or current compliance status.
- Static hosting keeps submitted queries away from an application server, but the bundled dataset is downloadable from the deployment.
- The repository has no automated tests, CI workflow, dedicated security policy, contribution guide, code of conduct, or license file.
- No repository-owned production screenshot is available; the verified live deployment is the primary visual proof.

## Project structure

| Path | Purpose |
| --- | --- |
| `app/` | Next.js page, metadata, and global interface styles |
| `lib/tin-lookup.ts` | Dataset loading, normalization, indexing, and lookup |
| `public/tin-data.json` | Bundled historical TIN, zone, and circle data |
| `components/` | Theme provider and reusable interface controls |

## Documentation

This README is currently the canonical product, data, setup, and operational documentation. The repository does not include separate API or architecture documents because the application has no submission API and its lookup boundary is contained in `lib/tin-lookup.ts`.

## Contributing

Bug reports and focused pull requests are welcome. Run the following checks before submitting a change:

```bash
pnpm lint
pnpm build
```

Do not include additional taxpayer information or replace the dataset without documenting its authoritative source, acquisition evidence, redistribution rights, scope, assessment year, normalization, and validation.

## Support and security

Use [GitHub Issues](https://github.com/montasim/tin-audit-checker/issues) for reproducible application bugs. Never include a real TIN or other personal information in a public issue; use a synthetic 12-digit example when describing lookup behavior.

There is no private security-reporting policy in this repository yet. Contact the maintainer through the profile below before publicly disclosing a suspected vulnerability or sensitive dataset concern.

## Funding

If this tool is useful to you, you can support its maintenance through [SupportKori](https://www.supportkori.com/montasim).

Bug reports, source-provenance research, accessibility feedback, and documentation improvements are equally valuable ways to help.

## Author

Built and maintained by [Montasim](https://github.com/montasim).

## License status

No open-source license file is currently included. Source visibility and public deployment do not grant permission to copy, modify, redistribute, or republish the bundled taxpayer dataset.
