import { RefreshCw } from 'lucide-react'
import { applyUpdateNow, BUILD_VERSION, formatVersion, useUpdateStatus } from '../liveUpdate'

// Which version is running, and what the live update is doing.
export function VersionLine() {
  const status = useUpdateStatus()
  if (!BUILD_VERSION) return null
  return (
    <>
      {status.state === 'ready' && (
        <div className="mx-4 mb-2 flex shrink-0 items-center gap-3 rounded-2xl border border-emerald-300/30 bg-emerald-500/20 py-2 pl-4 pr-2 backdrop-blur-xl">
          <span className="flex-1 text-[15px] text-white">New version ready</span>
          <button
            type="button"
            onClick={() => applyUpdateNow(status.bundleId)}
            className="flex h-11 items-center gap-2 rounded-xl bg-emerald-400 px-4 text-[16px] font-semibold text-emerald-950 active:bg-emerald-300"
          >
            <RefreshCw className="size-4" /> Update now
          </button>
        </div>
      )}
      <p className="shrink-0 pb-1 text-center text-[11px] text-white/40">
        Version {formatVersion(BUILD_VERSION)}
        {status.state === 'downloading' && ` · downloading ${formatVersion(status.version)}…`}
        {status.state === 'error' && <span className="text-red-300"> · update check failed: {status.message}</span>}
      </p>
    </>
  )
}
