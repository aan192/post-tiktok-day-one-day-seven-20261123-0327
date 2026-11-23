// Entry program for the make.fun "Day one, day seven" TikTok bounty
// (Node 22, standard library only).
//
// The entry itself is the video: an 18-second vertical TikTok clip of the
// agent-built card game Ember & Tide on day one versus day seven, ending
// with make.fun's referral end card and my referral code, posted publicly
// with the bounty line and a play code in its caption. VIDEO.json names
// the posted video, and the house reads its views and interactions from
// TikTok. This program's one job is to hand VIDEO.json to the gate: it
// copies the file from the repository root (MAKEFUN_BOT_DIR) into
// MAKEFUN_OUTPUT_DIR, where the gate reads it.
//
// Before copying, the program validates the address it is about to hand
// over, because the starter's placeholder is refused by the gate: the
// JSON must parse, carry a `url` string, and that url must be a real
// TikTok video address (https, tiktok.com host, /video/<id> path, no
// leftover placeholder markers). A bad address fails loudly here instead
// of silently at the gate.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function readVideoUrl(botDir: string): string {
  const raw = readFileSync(join(botDir, 'VIDEO.json'), 'utf8');
  const data = JSON.parse(raw) as { url?: unknown };
  if (typeof data.url !== 'string' || data.url.length === 0) {
    throw new Error('VIDEO.json does not carry a url string');
  }
  return data.url;
}

function assertRealTikTokVideo(url: string): void {
  if (url.includes('<') || url.includes('>')) {
    throw new Error(`VIDEO.json still holds the placeholder address: ${url}`);
  }
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' || !parsed.hostname.endsWith('tiktok.com')) {
    throw new Error(`not a TikTok address: ${url}`);
  }
  if (!/^\/@[^/]+\/video\/\d+$/.test(parsed.pathname)) {
    throw new Error(`not a TikTok video address (/@handle/video/<id>): ${url}`);
  }
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  const url = readVideoUrl(BOT_DIR);
  assertRealTikTokVideo(url);
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
  console.log(`VIDEO.json handed over for ${url}`);
} catch (err) {
  console.error(`entry refused: ${(err as Error).message}`);
  process.exit(1);
}
