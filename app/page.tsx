"use client";

import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { lookupTin, loadTinData } from "@/lib/tin-lookup";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Search,
  ShieldAlert,
  ShieldCheck,
  Loader2,
  Database,
  Lock,
  ExternalLink,
  FileText,
  HelpCircle,
  AlertTriangle,
  Building2,
  MapPin,
  Calendar,
  User,
  Fingerprint,
  Eye,
  Wifi,
  Shield,
} from "lucide-react";

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

const TOTAL_RETURNS = 72342;
const TOTAL_ZONES = 49;

export default function Home() {
  const [tin, setTin] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 12) {
      setTin(val);
      if (result) setResult(null);
    }
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!tin || tin.length < 10) return;

      setLoading(true);
      setResult(null);

      try {
        if (!dataLoaded) {
          setDataLoading(true);
          await loadTinData();
          setDataLoaded(true);
          setDataLoading(false);
        }

        const lookupResult = await lookupTin(tin);
        setResult(lookupResult);
      } catch {
        setResult({ found: false });
      } finally {
        setLoading(false);
      }
    },
    [tin, dataLoaded]
  );

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.05] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-xs sm:text-sm shadow-lg shadow-primary/20">
                NBR
              </div>
              <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
            </div>
            <div>
              <h2 className="font-semibold text-sm leading-none">TIN Audit Checker</h2>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">
                Assessment Year 2023–24
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="https://nbr.gov.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 hover:border-border bg-background/50"
            >
              nbr.gov.bd
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-10 text-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.04] px-4 py-1.5 text-xs text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Official NBR Data — {TOTAL_RETURNS.toLocaleString()} Returns Selected
            </div>
          </div>

          <h1 className="animate-fade-up delay-100 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] opacity-0">
            Check if your TIN is
            <br className="hidden sm:block" />
            {" "}selected for{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-gradient">
              NBR Audit
            </span>
          </h1>

          <p className="animate-fade-up delay-200 mt-4 sm:mt-5 text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed opacity-0">
            Instantly search the official Risk-Based Audit Selection list.
            <br className="hidden sm:block" />
            {" "}100% client-side — your data never leaves your device.
          </p>
        </section>

        <section className="mx-auto max-w-xl px-4 sm:px-6 pb-6">
          <div className="animate-fade-up delay-300 opacity-0">
            <Card className="shadow-xl shadow-primary/[0.04] border-border/60 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-5 sm:p-7">
                <form onSubmit={handleSubmit}>
                  <Label htmlFor="tin" className="text-sm font-medium text-foreground/80 mb-2.5 flex items-center gap-2">
                    <Fingerprint className="size-3.5 text-primary" />
                    Taxpayer Identification Number
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-2.5 mt-2.5">
                    <div className="relative flex-1">
                      <Input
                        ref={inputRef}
                        id="tin"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="Enter 12-digit TIN"
                        className="w-full pl-4 pr-12 py-3.5 text-lg tracking-[0.2em] font-mono h-auto rounded-xl border-border/80 bg-background/80 focus:border-primary/50 focus:ring-primary/20 transition-all"
                        maxLength={12}
                        autoComplete="off"
                        value={tin}
                        onChange={handleInputChange}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground font-mono tabular-nums">
                        {tin.length}/12
                      </span>
                    </div>
                    <Button
                      type="submit"
                      disabled={!tin || tin.length < 10 || loading}
                      size="lg"
                      className="px-7 py-3.5 h-auto font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all w-full sm:w-auto"
                    >
                      {loading || dataLoading ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          {dataLoading ? "Loading..." : "Checking..."}
                        </>
                      ) : (
                        <>
                          <Search className="size-4" />
                          Check Now
                        </>
                      )}
                    </Button>
                  </div>
                  {tin.length > 0 && tin.length < 10 && (
                    <p className="mt-2.5 text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-warning" />
                      Minimum 10 digits required
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {result && (
          <section className="mx-auto max-w-xl px-4 sm:px-6 pb-6">
            <div className="animate-scale-in">
              {result.found ? (
                <div className="rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-gradient-to-br from-rose-50/80 to-background dark:from-rose-950/30 dark:to-card overflow-hidden">
                  <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-4">
                    <div className="flex items-start gap-3.5">
                      <div className="size-10 rounded-xl bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center flex-shrink-0">
                        <ShieldAlert className="size-5 text-rose-600 dark:text-rose-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-rose-900 dark:text-rose-200 text-base">
                          TIN Selected for Audit
                        </h3>
                        <p className="text-sm text-rose-700/70 dark:text-rose-300/60 mt-0.5">
                          This TIN appears in the NBR audit selection list
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mx-5 sm:mx-7 mb-4 rounded-xl bg-background/80 dark:bg-background/40 border border-border/50 p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <DetailItem
                        icon={<Fingerprint className="size-3.5" />}
                        label="TIN"
                        value={formatTin(result.detail!.tin)}
                      />
                      <DetailItem
                        icon={<Building2 className="size-3.5" />}
                        label="Zone"
                        value={result.detail!.zone}
                      />
                      <DetailItem
                        icon={<MapPin className="size-3.5" />}
                        label="Circle"
                        value={result.detail!.circle}
                      />
                      <DetailItem
                        icon={<Calendar className="size-3.5" />}
                        label="Assessment Year"
                        value={result.detail!.assessment_year}
                      />
                    </div>
                  </div>

                  <div className="px-5 sm:px-7 pb-4">
                    <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
                      <AlertTriangle className="size-3.5 mt-0.5 flex-shrink-0 text-warning" />
                      <span>
                        Always verify your audit status directly with NBR or your tax circle office.
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-gradient-to-br from-emerald-50/80 to-background dark:from-emerald-950/30 dark:to-card overflow-hidden">
                  <div className="px-5 sm:px-7 py-6">
                    <div className="flex items-start gap-3.5">
                      <div className="size-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-emerald-900 dark:text-emerald-200 text-base">
                          Not Found in Audit List
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          TIN <code className="font-mono bg-muted/80 px-1.5 py-0.5 rounded text-xs">{formatTin(tin)}</code> was not found
                          in the NBR Risk-Based Audit Selection list for AY 2023–24.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <StatCard
              value={TOTAL_RETURNS.toLocaleString()}
              label="Returns Selected"
              icon={<FileText className="size-4" />}
            />
            <StatCard
              value={String(TOTAL_ZONES)}
              label="Tax Zones Covered"
              icon={<Building2 className="size-4" />}
            />
            <StatCard
              value="100%"
              label="Client-Side & Private"
              icon={<Lock className="size-4" />}
            />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-8 sm:pb-10">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              How It Works
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              Simple, fast, and completely private
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FeatureCard
              step="01"
              icon={<Database className="size-5" />}
              title="Load Data Locally"
              description="The official NBR audit list is downloaded directly to your browser on first search."
            />
            <FeatureCard
              step="02"
              icon={<Search className="size-5" />}
              title="Instant Lookup"
              description="Your TIN is checked against 72,342 entries using fast client-side binary search."
            />
            <FeatureCard
              step="03"
              icon={<Shield className="size-5" />}
              title="Stay Private"
              description="No data leaves your device. No cookies, no tracking, no server-side logging."
            />
          </div>
        </section>

        <Separator className="mx-auto max-w-6xl" />

        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="size-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">About This Tool</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The National Board of Revenue (NBR) selected income tax returns
                  for audit using an automated Risk-Based Audit Criterion for AY 2023–24.
                  This tool covers{" "}
                  <strong className="text-foreground">{TOTAL_ZONES} tax zones</strong> with{" "}
                  <strong className="text-foreground">{TOTAL_RETURNS.toLocaleString()} returns</strong> from
                  the official NBR publication.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-9 rounded-lg bg-warning/10 flex items-center justify-center">
                    <AlertTriangle className="size-4 text-warning" />
                  </div>
                  <h3 className="font-semibold text-sm">Disclaimer</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This is a community-built tool using publicly available NBR data.
                  We are not affiliated with NBR or any government body.{" "}
                  <strong className="text-foreground">
                    Always verify your audit status directly with NBR
                  </strong>{" "}
                  or your tax circle before taking any action.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <HelpCircle className="size-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">Limitations</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This tool can only check if a TIN exists in the published selection
                  list. It cannot verify whether a number is a valid, registered TIN
                  with NBR. A &quot;not found&quot; result does not guarantee any particular
                  tax status.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Eye className="size-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm">Privacy & Security</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <Wifi className="size-3.5 text-muted-foreground/60" />
                    No network requests with your TIN
                  </li>
                  <li className="flex items-center gap-2">
                    <Lock className="size-3.5 text-muted-foreground/60" />
                    No cookies or local storage
                  </li>
                  <li className="flex items-center gap-2">
                    <User className="size-3.5 text-muted-foreground/60" />
                    No user accounts or tracking
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-[9px]">
                NBR
              </div>
              <span className="text-xs text-muted-foreground">
                NBR TIN Audit Checker — AY 2023–24
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
              <span>{TOTAL_RETURNS.toLocaleString()} returns</span>
              <span className="opacity-30">|</span>
              <span>{TOTAL_ZONES} zones</span>
              <span className="opacity-30">|</span>
              <span>100% client-side</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function formatTin(tin: string): string {
  if (tin.length <= 4) return tin;
  if (tin.length <= 8) return `${tin.slice(0, 4)} ${tin.slice(4)}`;
  return `${tin.slice(0, 4)} ${tin.slice(4, 8)} ${tin.slice(8)}`;
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
        {icon}
        {label}
      </div>
      <p className="text-sm font-medium leading-snug">{value}</p>
    </div>
  );
}

function StatCard({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-sm group hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.03] transition-all duration-300">
      <CardContent className="p-4 sm:p-5 flex items-center gap-4">
        <div className="size-11 rounded-xl bg-primary/[0.07] flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/10 transition-colors">
          {icon}
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold tracking-tight">{value}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function FeatureCard({
  step,
  icon,
  title,
  description,
}: {
  step: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-sm group hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.03] transition-all duration-300">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="size-10 rounded-xl bg-primary/[0.07] flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
            {icon}
          </div>
          <span className="text-3xl font-bold text-primary/[0.08] group-hover:text-primary/15 transition-colors">
            {step}
          </span>
        </div>
        <h3 className="font-semibold text-sm mb-1.5">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
