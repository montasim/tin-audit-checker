# TIN Audit List Checker

Check whether a Bangladesh Taxpayer Identification Number appears in the National Board of Revenue's published risk-based audit selection list for assessment year 2023–24.

<p>
  <a href="https://tin-audit-checker.netlify.app"><img alt="Open live app" src="https://img.shields.io/badge/Live_app-Netlify-00C7B7?logo=netlify&logoColor=white"></a>
  <a href="https://www.supportkori.com/montasim"><img alt="Support on SupportKori" src="https://img.shields.io/badge/Support-SupportKori-FFDD00"></a>
</p>

The checker searches 72,342 published records across 49 tax zones and returns the matching zone and circle when available. The lookup happens entirely in the browser: there is no account, analytics tracker, or server submission of the entered TIN.

[Check a TIN in the live app](https://tin-audit-checker.netlify.app)

**[Open the checker](https://tin-audit-checker.netlify.app) · [Verify with NBR](https://nbr.gov.bd/) · [Report an application bug](https://github.com/montasim/tin-audit-checker/issues)**

> **Dataset status:** This is a historical lookup for assessment year 2023–24, not a live NBR status service. The repository contains the normalized lookup data but does not contain the original NBR publication or a reproducible import script; independently verify consequential results with NBR.

## Why this exists

The source list is useful but inconvenient to search manually. This project turns the published data into a focused, mobile-friendly lookup while keeping a sensitive identifier on the user's device.

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
4. Confirm the result through the [NBR website](https://nbr.gov.bd/) or the listed tax circle before taking action.

The app normalizes formatting characters before searching. It does not tell you why a return was selected, whether an audit is still active, or the taxpayer's broader compliance status.

## Privacy and limitations

- The application downloads `public/tin-data.json` and searches it on the device.
- Entered TINs are not sent to an application server or stored by this project.
- A result only describes the published list for assessment year 2023–24.
- “Not found” does not guarantee a person's current tax or audit status.
- This is an independent tool, not an official NBR service. Verify important decisions with the [National Board of Revenue](https://nbr.gov.bd/) or the relevant tax circle.

Because the dataset itself is public and shipped to every browser, this privacy model protects the lookup query—not the contents of the source list.

## Data source and methodology

The bundled file represents an NBR-published risk-based audit selection list for assessment year 2023–24. The repository normalizes entries into compact TIN, zone-index, and circle fields, then builds in-memory `Set` and `Map` indexes after the browser loads the JSON file.

Important provenance limits:

- The repository does not include the original NBR publication or a source URL for that exact document.
- It does not include a reproducible import script that derives `public/tin-data.json` from the publication.
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

- Node.js 20 or newer
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

The production instance runs at [tin-audit-checker.netlify.app](https://tin-audit-checker.netlify.app). The application has no required environment variables or server-side data service; a production build bundles the interface and serves the public JSON lookup file. Run `pnpm lint` and `pnpm build` before deployment.

## Project status and limitations

- This is a historical assessment-year lookup, not a live audit-status integration.
- “Not found” means only that the normalized value is absent from this bundled snapshot.
- The tool cannot explain selection reasons, audit progress, later notices, or current compliance status.
- Static hosting keeps submitted queries away from an application server, but the public dataset itself is downloadable.
- The repository has no automated tests, CI workflow, dedicated security policy, contribution guide, code of conduct, or license file.
- No repository-owned production screenshot is available; the verified live deployment is the primary visual proof.

## Project structure

| Path | Purpose |
| --- | --- |
| `app/` | Next.js page, metadata, and global interface styles |
| `lib/tin-lookup.ts` | Dataset loading, normalization, indexing, and lookup |
| `public/tin-data.json` | Bundled historical TIN, zone, and circle data |
| `components/` | Theme provider and reusable interface controls |

## Contributing

Bug reports and focused pull requests are welcome. Run the following checks before submitting a change:

```bash
pnpm lint
pnpm build
```

Do not include additional taxpayer information or replace the dataset without documenting its public source, scope, and assessment year.

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
