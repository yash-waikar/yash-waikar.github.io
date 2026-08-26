import type { Activity } from "../components/ui/contribution-graph";

const CACHE_PREFIX = "gh-contributions:";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 1 day

type CachedPayload = {
  fetchedAt: number;
  contributions: Activity[];
};

export async function getContributions(username: string): Promise<Activity[]> {
  const cacheKey = `${CACHE_PREFIX}${username}`;

  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const parsed: CachedPayload = JSON.parse(cached);
      if (Date.now() - parsed.fetchedAt < CACHE_TTL_MS) {
        return parsed.contributions;
      }
    }
  } catch {
    // sessionStorage unavailable or corrupt — fall through to network fetch
  }

  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub contributions: ${res.status}`);
  }
  const data: { contributions: Activity[] } = await res.json();

  try {
    sessionStorage.setItem(
      cacheKey,
      JSON.stringify({
        fetchedAt: Date.now(),
        contributions: data.contributions,
      } satisfies CachedPayload),
    );
  } catch {
    // ignore quota errors
  }

  return data.contributions;
}
