import { Plus } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { List } from './types'

type Props = {
  lists: List[]
  active: number
  onPick: (index: number) => void
}

// The row of pills on top: where am I, and one tap to jump to another list.
export function ListSwitcher({ lists, active, onPick }: Props) {
  const row = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pill = row.current?.children[active] as HTMLElement | undefined
    pill?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [active])

  return (
    <nav ref={row} className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-2">
      {lists.map((list, i) => (
        <button
          key={list.id}
          type="button"
          onClick={() => onPick(i)}
          aria-current={i === active}
          className={`flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[15px] font-semibold uppercase tracking-wide transition-colors ${
            i === active
              ? 'border-white/40 bg-white/25 text-white'
              : 'border-white/10 bg-white/5 text-white/65'
          }`}
        >
          <span className="size-2.5 rounded-full" style={{ background: list.accent }} />
          {list.title}
        </button>
      ))}
      <button
        type="button"
        aria-label="New list"
        className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80"
      >
        <Plus className="size-5" />
      </button>
    </nav>
  )
}
