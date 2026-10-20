import { BUILD_VERSION, formatVersion, useUpdateStatus } from '../liveUpdate'

// Which version is running, and what the live update is doing.
export function VersionLine() {
  const status = useUpdateStatus()
  if (!BUILD_VERSION) return null
  return (
    <p className="shrink-0 pb-1 text-center text-[11px] text-white/40">
      Version {formatVersion(BUILD_VERSION)}
      {status.state === 'downloading' && ` · downloading ${formatVersion(status.version)}…`}
      {status.state === 'ready' && (
        <span className="text-emerald-300"> · {formatVersion(status.version)} ready — close and reopen the app</span>
      )}
      {status.state === 'error' && <span className="text-red-300"> · update check failed: {status.message}</span>}
    </p>
  )
}
