import { Icon } from './icons'
import type { Card } from './types'

export function CardItem({ card, onOpen }: { card: Card; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex min-h-[52px] w-full items-center gap-3 rounded-xl border border-white/70 bg-gradient-to-b from-slate-50 to-slate-200 px-4 py-3 text-left text-[16px] text-slate-800 shadow-md shadow-black/20 active:scale-[0.98] transition-transform"
    >
      <Icon name={card.icon} className="size-[18px] shrink-0 text-slate-600" />
      <span className="flex-1 leading-snug">{card.title}</span>
    </button>
  )
}
