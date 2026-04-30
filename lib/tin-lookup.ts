export interface TinDetail {
  tin: string;
  zone: string;
  circle: string;
  submission_type: string;
  assessment_year: string;
}

export interface TinData {
  zones: string[];
  entries: { t: string; z: number; c: string }[];
}

let cachedData: TinData | null = null;
let cachedTinSet: Set<string> | null = null;
let cachedDetailMap: Map<string, { zone: string; circle: string }> | null =
  null;

export async function loadTinData(): Promise<TinData> {
  if (cachedData) return cachedData;

  const res = await fetch("/tin-data.json");
  cachedData = await res.json();
  return cachedData!;
}

export async function lookupTin(
  tin: string
): Promise<{ found: boolean; detail?: TinDetail }> {
  const data = await loadTinData();

  if (!cachedTinSet) {
    cachedTinSet = new Set(data.entries.map((e) => e.t));
    cachedDetailMap = new Map(
      data.entries.map((e) => [
        e.t,
        { zone: data.zones[e.z], circle: e.c },
      ])
    );
  }

  const normalizedTin = tin.replace(/\D/g, "");

  if (cachedTinSet.has(normalizedTin)) {
    const detail = cachedDetailMap!.get(normalizedTin)!;
    return {
      found: true,
      detail: {
        tin: normalizedTin,
        zone: detail.zone,
        circle: detail.circle,
        submission_type: "Individual",
        assessment_year: "2023-2024",
      },
    };
  }

  return { found: false };
}
