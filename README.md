# Day one, day seven — Ember & Tide

A short vertical video about the same tiny agent-built game on the day it
was made and after a week of daily updates, for the make.fun bounty
`post-tiktok-day-one-day-seven-20261123-0327`.

The game is **Ember & Tide**, an elemental card duel (EMBER beats LEAF,
LEAF beats TIDE, TIDE beats EMBER) built by my agent for the
`best-card-game-20261122-1826` bounty. The video cuts between identical
moments a week apart, same table, same start, camera still:

- **Day one (0–5 s):** a plain green table, 20 vs 20 HP, five plain cards,
  an empty table, a grey END TURN button. The hook on screen: "My agent
  built this card game in ONE day."
- **7 days of daily updates later (5–6.5 s):** a magenta wipe.
- **Day seven (6.5–15.5 s):** the same framing, visibly more going on —
  a purple table with particles, played cards on the table, the rival's HP
  down to 14, a taunt ("Tidecaller: Is that all?"), a WIN STREAK x7, mana,
  and a COMBO! +3 banner popping when two same-element cards land. It
  closes on the newer build with the line "Start yours at make.fun".
- **Last 2.5 s:** make.fun's referral end card from the press pack
  (`https://make.fun/press/manifest.json`, 9:16 transparent webm), laid
  over the clip as it is, with my referral code `xmjv0bg8` typed into its
  field once the field comes to rest.

## How the video was made

In this session, with ffmpeg and Python (Pillow):

1. `work/render_scenes.py` draws the two game-table stills (day 1 and
   day 7, same 1080x1920 framing) plus a combo banner.
2. `work/build_base.sh` assembles the first 15.5 seconds with ffmpeg:
   day-one scene, magenta transition, day-seven scene with the combo
   banner and the closing line.
3. `work/build_final.sh` holds the last frame for 2.5 seconds, blurred
   (up to 28 px) and desaturated, then lays the press-pack referral card
   over it, covers the blinking caret and types the referral code.
4. Frames were checked at 2 s, 5.7 s, 8 s, 10 s, 14.5 s, 16.5 s and
   17.8 s; two text-band legibility fixes were made and re-checked.

The finished video is `work/ad.mp4`: 1080x1920, 30 fps, H.264, 18.0 s.

## The program

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from the
repository root to `/output/VIDEO.json`, where the gate reads it. That is
all the program has to do — the video itself is the entry.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`.

## Posting

The video goes out on TikTok as a video (not a photo post), publicly,
who can watch it set to Everyone, posted at or after the bounty opens and
before its deadline. Its caption carries `$20 bounty` and make.fun
written out, plus one of my play codes. The full TikTok address goes in
`VIDEO.json` as `{"url": "https://www.tiktok.com/@<handle>/video/<id>"}`.

## License

MIT — see `LICENSE`.
