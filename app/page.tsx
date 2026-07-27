"use client";

import { useCallback, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ExternalLink,
  FileCheck2,
  Fingerprint,
  LoaderCircle,
  LockKeyhole,
  Search,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { lookupTin, loadTinData } from "@/lib/tin-lookup";

type SearchResult = {
  found: boolean;
  detail?: {
    tin: string;
    zone: string;
    circle: string;
    submission_type: string;
    assessment_year: string;
  };
};

const TOTAL_RETURNS = 72_342;
const TOTAL_ZONES = 49;
const TIN_LENGTH = 12;

export default function Home() {
  const [tin, setTin] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [lookupFailed, setLookupFailed] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, TIN_LENGTH);
    setTin(value);
    setResult(null);
    setLookupFailed(false);
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (tin.length !== TIN_LENGTH || loading) return;

      setLoading(true);
      setResult(null);
      setLookupFailed(false);

      try {
        await loadTinData();
        const lookupResult = await lookupTin(tin);
        setResult(lookupResult);
        window.setTimeout(() => resultRef.current?.focus(), 80);
      } catch {
        setLookupFailed(true);
      } finally {
        setLoading(false);
      }
    },
    [tin, loading],
  );

  const isComplete = tin.length === TIN_LENGTH;

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="page-width header-inner">
          <a className="brand" href="#" aria-label="TIN audit list checker home">
            <span className="brand-mark" aria-hidden="true">
              <FileCheck2 />
            </span>
            <span>
              <strong>TIN Audit List Checker</strong>
              <small>Independent public-data lookup</small>
            </span>
          </a>

          <nav className="header-nav" aria-label="Page links">
            <a href="#about">About the data</a>
            <a
              href="https://nbr.gov.bd"
              target="_blank"
              rel="noopener noreferrer"
            >
              NBR website <ExternalLink aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="page-width hero-grid">
            <div className="hero-copy">
              <div className="scope-label">
                <span>Published audit selection</span>
                <strong>Assessment year 2023–24</strong>
              </div>

              <h1>
                Is your return on the
                <span> NBR audit list?</span>
              </h1>

              <p className="hero-lede">
                Enter your 12-digit TIN to check the published risk-based audit
                selection list for the 2023–24 assessment year.
              </p>

              <div className="trust-note">
                <AlertTriangle aria-hidden="true" />
                <p>
                  This is an independent tool using data published by NBR. It
                  does not check whether a TIN is valid or show your current tax
                  status.
                </p>
              </div>
            </div>

            <div className="checker-panel">
              <div className="checker-heading">
                <div>
                  <p className="eyebrow">Search the published list</p>
                  <h2>Check one TIN</h2>
                </div>
                <Fingerprint aria-hidden="true" />
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="tin">12-digit Taxpayer Identification Number</label>
                <div
                  className={`tin-field ${isComplete ? "is-complete" : ""}`}
                >
                  <Search aria-hidden="true" />
                  <input
                    id="tin"
                    name="tin"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    pattern="[0-9 ]{12,14}"
                    maxLength={14}
                    placeholder="1234 5678 9012"
                    value={formatTin(tin)}
                    onChange={handleInputChange}
                    aria-describedby="tin-help"
                    aria-invalid={tin.length > 0 && !isComplete}
                  />
                  <span className="digit-count" aria-hidden="true">
                    {tin.length}/{TIN_LENGTH}
                  </span>
                </div>

                <div className="digit-track" aria-hidden="true">
                  {Array.from({ length: TIN_LENGTH }, (_, index) => (
                    <span
                      key={index}
                      className={index < tin.length ? "filled" : ""}
                    />
                  ))}
                </div>

                <p id="tin-help" className="field-help">
                  {tin.length === 0
                    ? "Your TIN is checked only in this browser."
                    : isComplete
                      ? "12 digits entered. Ready to check."
                      : `Enter ${TIN_LENGTH - tin.length} more ${TIN_LENGTH - tin.length === 1 ? "digit" : "digits"}.`}
                </p>

                <button type="submit" disabled={!isComplete || loading}>
                  {loading ? (
                    <>
                      <LoaderCircle className="spin" aria-hidden="true" />
                      Checking 72,342 records…
                    </>
                  ) : (
                    <>
                      Check audit list
                      <ArrowRight aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>

              <div className="dataset-strip" aria-label="Dataset coverage">
                <span>
                  <strong>{TOTAL_RETURNS.toLocaleString()}</strong> selected returns
                </span>
                <span>
                  <strong>{TOTAL_ZONES}</strong> tax zones
                </span>
                <span>
                  <LockKeyhole aria-hidden="true" /> Private lookup
                </span>
              </div>
            </div>
          </div>
        </section>

        {(result || lookupFailed) && (
          <section className="result-section" aria-live="polite">
            <div className="page-width">
              <div
                ref={resultRef}
                tabIndex={-1}
                className={`result-card ${
                  lookupFailed ? "result-error" : result?.found ? "result-found" : "result-clear"
                }`}
              >
                {lookupFailed ? (
                  <>
                    <div className="result-icon">
                      <AlertTriangle aria-hidden="true" />
                    </div>
                    <div className="result-copy">
                      <p className="result-label">The list could not be loaded</p>
                      <h2>Check your connection and try again.</h2>
                      <p>
                        No result was produced. Your TIN was not sent anywhere.
                      </p>
                    </div>
                  </>
                ) : result?.found ? (
                  <>
                    <div className="result-icon">
                      <ShieldAlert aria-hidden="true" />
                    </div>
                    <div className="result-copy">
                      <p className="result-label">Match found in the published list</p>
                      <h2>This TIN was selected for audit.</h2>
                      <p>
                        Contact the listed tax circle or NBR to verify the current
                        status before taking action.
                      </p>
                      <dl className="result-details">
                        <div>
                          <dt>TIN</dt>
                          <dd>{formatTin(result.detail!.tin)}</dd>
                        </div>
                        <div>
                          <dt>Tax zone</dt>
                          <dd>{result.detail!.zone}</dd>
                        </div>
                        <div>
                          <dt>Tax circle</dt>
                          <dd>{result.detail!.circle}</dd>
                        </div>
                        <div>
                          <dt>Assessment year</dt>
                          <dd>{result.detail!.assessment_year}</dd>
                        </div>
                      </dl>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="result-icon">
                      <ShieldCheck aria-hidden="true" />
                    </div>
                    <div className="result-copy">
                      <p className="result-label">No match in the published list</p>
                      <h2>This TIN was not found.</h2>
                      <p>
                        <strong>{formatTin(tin)}</strong> does not appear in the
                        AY 2023–24 risk-based audit selection list. This is not a
                        guarantee of current tax or audit status.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        <section id="about" className="explanation-section">
          <div className="page-width">
            <div className="section-heading">
              <p className="eyebrow">Understand the result</p>
              <h2>One lookup. A precise answer.</h2>
            </div>

            <div className="explanation-grid">
              <article>
                <span className="article-icon" aria-hidden="true">
                  <Search />
                </span>
                <h3>What this checks</h3>
                <p>
                  Whether your 12-digit TIN appears among {TOTAL_RETURNS.toLocaleString()}{" "}
                  returns in the published NBR risk-based audit selection dataset.
                </p>
              </article>

              <article>
                <span className="article-icon" aria-hidden="true">
                  <LockKeyhole />
                </span>
                <h3>What stays private</h3>
                <p>
                  The list is loaded into your browser and searched on your
                  device. This tool has no account, tracking, or TIN submission.
                </p>
              </article>

              <article>
                <span className="article-icon" aria-hidden="true">
                  <Check />
                </span>
                <h3>What to do with a match</h3>
                <p>
                  Treat it as a pointer to the published record. Confirm the
                  status directly with NBR or the tax circle shown in the result.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="page-width footer-inner">
          <p>
            Independent tool · Covers assessment year 2023–24 only
          </p>
          <a
            href="https://nbr.gov.bd"
            target="_blank"
            rel="noopener noreferrer"
          >
            Verify with the National Board of Revenue
            <ExternalLink aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
}

function formatTin(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.match(/.{1,4}/g)?.join(" ") ?? "";
}
