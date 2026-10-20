import { Ellipsis, Plus } from 'lucide-react'
import { CardItem } from './CardItem'
import { Icon } from './icons'
import type { Card, List } from './types'

type Props = {
  list: List
  onOpenCard: (card: Card) => void
}

export function ListColumn({ list, onOpenCard }: Props) {
  return (
    <section
      className="flex max-h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-xl shadow-black/30 backdrop-blur-xl"
      style={{ borderTop: `3px solid ${list.accent}` }}
    >
      <header className="flex items-center gap-2 pl-5 pr-2 pt-3 pb-2">
        <h2 className="flex-1 truncate text-[20px] font-bold uppercase tracking-wide text-white">
          {list.title}
        </h2>
        <span style={{ color: list.accent }}>
          <Icon name={list.icon} className="size-5" />
        </span>
        <button
          type="button"
          aria-label={`Actions for ${list.title}`}
          className="grid size-11 place-items-center rounded-full text-white/80 active:bg-white/15"
        >
          <Ellipsis className="size-5" />
        </button>
      </header>

      <div className="flex min-h-0 flex-col gap-2.5 overflow-y-auto overscroll-contain px-3 pb-2">
        {list.cards.map((card) => (
          <CardItem key={card.id} card={card} onOpen={() => onOpenCard(card)} />
        ))}
      </div>

      <button
        type="button"
        className="flex min-h-[52px] shrink-0 items-center justify-center gap-2 text-[16px] text-white/90 active:bg-white/10"
      >
        <Plus className="size-5" /> New Card
      </button>
    </section>
  )
}
