# 62-kanban-capacitor — Build a Real iPhone App with Claude Code for Free | Web App to iPhone, No Coding

> The app an English @FlorenzErstling video builds. This folder lives in the **video-builds** repo
> (`~/Workspace/video-builds`, GitHub `Florenz23/video-builds`, private) — one repo, one folder
> per video. The video's process state is in the dev folder:
> `~/Workspace/video-projects/florenz-erstling-en/62-kanban-capacitor/state.json` — **read it first**.

## What gets built

- **The spec is `docs/SPEC.md`** — mobile-first, Capacitor-ready, with screenshots of the EN-58
  reference app in `docs/screenshots/`. Build from it; no code is copied from EN-58.
- **Build with Opus 5.5**, not Sonnet.

## Commit a lot, and commit clearly — the most important rule in this folder

The video is produced with a **synthetic Claude Code session**: an agent later reads this folder's
commits and reproduces the app's state step by step from them. The git history *is* the build's
storyboard. A change that is not in a commit does not exist for the video.

- Commit in the video-builds repo, **only this folder's files** — never `git add -A` from the root.
  This folder's history: `git log --reverse --oneline -- florenz-erstling-en/62-kanban-capacitor`.
- **Commit after every visible step**: every prompt that changed the app, every fix, every
  iteration — not once at the end. Many small commits beat one big one.
- **The message says what changed on screen and why**, in words a viewer understands
  (`Cards flip on click — first prompt had no animation`). Never `wip`, `update`, `fix`.
- Every commit leaves the app in a state that runs, so any commit can be shown on its own.
- Never squash, amend, rebase or rewrite commits — their order is the video. Push after committing.
- Code, `docs/` and `reference/` (dev context) are tracked. **No file above 10 MB, never video** —
  footage goes to `~/Workspace/yt-media`.

## Export the chat — the script is written from it

The transcript and the script (`/video-script` in lama-video-studio) are made from **this
session's conversation** plus the **OBS screen recording** of it.

- Run the build session **from this folder**, so its log lands in
  `~/.claude/projects/<this-folder-path-as-slug>/`. `gather` finds it through the dev folder's
  `state.json` → `artifacts.build_dir`.
- Record with OBS (it writes `~/Movies/YYYY-MM-DD HH-MM-SS.mov`).
- **The same day** (session logs get pruned), in `~/Workspace/Personal/lama-video-studio`:
  `pnpm gather kanban-capacitor` to see what it found, then `pnpm gather kanban-capacitor --apply`.
  It copies the session to the dev folder's `source/session.jsonl` and the recording to
  `~/Workspace/yt-media/recordings/florenz-erstling-en/62-kanban-capacitor-raw.mov`.

## Where things are

- Dev folder (state, transcript, script source): `~/Workspace/video-projects/florenz-erstling-en/62-kanban-capacitor`
- Concept notes: `~/Workspace/second-brain/projects/youtube/florenz-erstling-en/videos/kanban-capacitor.md`
- Script + animations: lama-video-studio, video id `kanban-capacitor` — `/video-script`, then `orchestrate`
- Replay a step: `git worktree add`, never `git checkout` in the shared repo
- Next step / resume: `/video-create` from second-brain
