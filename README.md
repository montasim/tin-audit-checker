# TIN Audit List Checker

Check whether a Bangladesh Taxpayer Identification Number appears in the National Board of Revenue's published risk-based audit selection list for assessment year 2023–24.

<p>
  <a href="https://tin-audit-checker.netlify.app"><img alt="Open live app" src="https://img.shields.io/badge/Live_app-Netlify-00C7B7?logo=netlify&logoColor=white"></a>
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <a href="https://www.supportkori.com/montasim"><img alt="Support on SupportKori" src="https://img.shields.io/badge/Support-SupportKori-FFDD00"></a>
</p>

The checker searches 72,342 published records across 49 tax zones and returns the matching zone and circle when available. The lookup happens entirely in the browser: there is no account, analytics tracker, or server submission of the entered TIN.

[Check a TIN in the live app](https://tin-audit-checker.netlify.app)

## Why this exists

The source list is useful but inconvenient to search manually. This project turns the published data into a focused, mobile-friendly lookup while keeping a sensitive identifier on the user's device.

## Features

- Validates and formats 12-digit TIN input.
- Searches the bundled dataset locally in the browser.
- Shows the tax zone, circle, and assessment year for a matching record.
- Clearly distinguishes a match, no match, and dataset loading failure.
- Supports light and dark themes and keyboard-accessible result feedback.
- Works as a static, account-free web application.

## Privacy and limitations

- The application downloads `public/tin-data.json` and searches it on the device.
- Entered TINs are not sent to an application server or stored by this project.
- A result only describes the published list for assessment year 2023–24.
- “Not found” does not guarantee a person's current tax or audit status.
- This is an independent tool, not an official NBR service. Verify important decisions with the [National Board of Revenue](https://nbr.gov.bd/) or the relevant tax circle.

Because the dataset itself is public and shipped to every browser, this privacy model protects the lookup query—not the contents of the source list.

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

## Contributing

Bug reports and focused pull requests are welcome. Run the following checks before submitting a change:

```bash
pnpm lint
pnpm build
```

Do not include additional taxpayer information or replace the dataset without documenting its public source, scope, and assessment year.

## Support

If this tool is useful to you, you can support its maintenance through [SupportKori](https://www.supportkori.com/montasim).
