# Getting the app onto an iPhone — what actually worked (2026-10-20)

First run, free Apple ID, no Xcode. The "hello" build installed and opened from the home screen.
Result: **SideStore accepts the unsigned .ipa** from GitHub Actions.

## Installed

| Where | What | Why |
|---|---|---|
| iPhone | LocalDevVPN (App Store, free) | Loops SideStore's install request back into the phone, so iOS thinks a trusted computer is installing. Only needed while installing/refreshing |
| Mac, once | iloader 2.3.10 (`iloader-darwin-universal.dmg`, github.com/nab138/iloader, ~19 MB, notarized) | Puts SideStore on the phone over USB. Can be deleted afterwards |
| iPhone | SideStore (installed by iloader) | Signs and installs our .ipa with the Apple ID, refreshes it every 7 days |

## Steps

1. iPhone has a passcode
2. Install LocalDevVPN, tap Connect, allow the VPN configuration
3. Download iloader, copy to Applications
4. iPhone on USB, "Trust this computer"
5. iloader: sign in with the Apple ID
   - **Failed:** `Failed to get anisette data for login … WebSocket protocol error`. The default anisette server `new.ani.sidestore.io` returned 502 (outage, many reports on the iloader GitHub that week)
   - **Fix:** iloader Settings → Anisette Server → **Jkcoxson (Mac)**
6. iloader: select the iPhone → install SideStore (Stable)
7. iOS asks for **Developer Mode** first: Settings → Privacy & Security → Developer Mode → on → restart → Turn On
8. Settings → General → VPN & Device Management → trust the Apple ID
9. LocalDevVPN connected again (the restart turns it off)
10. SideStore: sign in with the same Apple ID
    - **Failed:** "This action cannot be completed at this time" (Apple error -80045)
    - **Fix:** SideStore Settings → User Customizations → **On-Device Anisette off**; Anisette Servers → **Jkcoxson (Mac)**, auto rotation off; force-close SideStore, sign in again
11. SideStore → My Apps → tap "7 DAYS" next to SideStore once
12. Get the .ipa onto the phone
    - **Didn't work:** AirDrop from the Mac. The phone had to be set to "Everyone for 10 Minutes" to show up at all, then the file never appeared where SideStore could pick it (iCloud full; Downloads lives in iCloud Drive)
    - **Worked:** the workflow publishes the .ipa as a GitHub release. On the phone, in Chrome: `github.com/Florenz23/kanban-capacitor/releases` → Kanban.ipa → download → Open in… → SideStore
13. SideStore installs it → Kanban on the home screen → "hello", full screen, no browser bar

## Limits to remember

- Free Apple ID: 3 sideloaded apps at once, SideStore is one of them
- Apps expire after 7 days: open SideStore with LocalDevVPN connected to refresh, no Mac needed
- New version of the app: Actions → iOS build → Run workflow (~1.5 min), then step 12 again

## A second app (Test App)

Once the phone is set up, a second app is: GitHub → Actions → iOS build → Run workflow → pick **test**
(~2 min) → on the phone, `github.com/Florenz23/kanban-capacitor/releases` → TestApp.ipa → Open in
SideStore. Nothing to install, nothing new on the Mac. It sits beside Kanban because it has its own
bundle ID (`de.florenzerstling.testapp`).

That fills the free Apple ID: SideStore + Kanban + Test App = 3. More apps:
- **Apple Developer Program**, $99 / 99 € a year: no 3-app limit, 1-year signing, TestFlight, App Store
- **Free:** several apps inside one installed app (spec §4, nested routes `/kanban`, `/meals`), or
  deactivate an unused app in SideStore to free its slot

## Live updates (works since 20 Oct, 16:59)

After the .ipa with the updater is installed once, a push is enough: GitHub builds the web part on
Linux (~20 s) and publishes `dist-<version>.zip` on the release `web-kanban`. The app asks the GitHub
API when it opens, downloads the newer zip and shows **New version ready · Update now**.

What it took to get there (each fix in the app's own update code needed a new .ipa):
1. `version.json` on a GitHub release is served as `application/octet-stream` → the app couldn't read it. Now: GitHub API (real JSON, CORS allowed), version in the file name
2. "Checksum required": the updater only accepts a zip with its SHA-256. GitHub's API lists a `sha256:` digest for every release file → passed to `download()`
3. The status line next to "Version …" (downloading / ready / the error) is what made both visible on the phone

Still needs an .ipa: native changes — new Capacitor plugins, the app icon, the app name.
