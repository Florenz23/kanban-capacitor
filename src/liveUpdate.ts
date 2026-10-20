import { Capacitor, CapacitorHttp } from '@capacitor/core'
import { CapacitorUpdater } from '@capgo/capacitor-updater'

// Every push to main publishes the web part as dist.zip + version.json on the release "web-<app>"
// (.github/workflows/web.yml). The app checks it, downloads a newer one in the background and
// switches to it the next time it's closed and opened again. No new .ipa needed.
const app = import.meta.env.VITE_APP ?? 'kanban'
const VERSION_URL = `https://github.com/Florenz23/kanban-capacitor/releases/download/web-${app}/version.json`

// The commit time of this build (seconds). Newer commit = higher number, so updates only go forward.
export const BUILD_VERSION = Number(import.meta.env.VITE_WEB_VERSION ?? 0)

type Latest = { version: string; url: string }

async function checkForUpdate() {
  const res = await CapacitorHttp.get({ url: VERSION_URL, params: { t: String(Date.now()) } })
  if (res.status !== 200) return
  const latest: Latest = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
  if (!(Number(latest.version) > BUILD_VERSION)) return

  const { bundles } = await CapacitorUpdater.list()
  const ready = bundles.find((b) => b.version === latest.version && b.status === 'success')
  const bundle = ready ?? (await CapacitorUpdater.download({ url: latest.url, version: latest.version }))
  await CapacitorUpdater.next({ id: bundle.id })
}

export function startLiveUpdates() {
  if (!Capacitor.isNativePlatform()) return
  // Tells the updater this version started fine; without it, it rolls back to the previous one.
  CapacitorUpdater.notifyAppReady()

  const check = () => checkForUpdate().catch(() => {})
  check()
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') check()
  })
}
