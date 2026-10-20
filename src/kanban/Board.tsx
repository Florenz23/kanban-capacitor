import { useReducer, useRef, useState } from 'react'
import { boardReducer } from './boardReducer'
import { CardSheet } from './CardSheet'
import { ListColumn } from './ListColumn'
import { ListSwitcher } from './ListSwitcher'
import { seedBoard } from './seed'

export function Board() {
  const [board, dispatch] = useReducer(boardReducer, undefined, seedBoard)
  const [openCardId, setOpenCardId] = useState<string | null>(null)
  const [active, setActive] = useState(0)
  const strip = useRef<HTMLDivElement>(null)

  // One list per screen: the horizontal scroll position says which list is showing.
  const onScroll = () => {
    const el = strip.current
    if (!el) return
    setActive(Math.round(el.scrollLeft / el.clientWidth))
  }

  const goTo = (i: number) => {
    const el = strip.current
    el?.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  const openList = board.lists.find((l) => l.cards.some((c) => c.id === openCardId))
  const openCard = openList?.cards.find((c) => c.id === openCardId)

  return (
    <div className="board-bg flex h-dvh flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <ListSwitcher lists={board.lists} active={active} onPick={goTo} />

      <div
        ref={strip}
        onScroll={onScroll}
        className="no-scrollbar flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto"
      >
        {board.lists.map((list) => (
          <div key={list.id} className="flex w-full shrink-0 snap-center flex-col px-4 pt-2 pb-4">
            <ListColumn list={list} onOpenCard={(card) => setOpenCardId(card.id)} />
          </div>
        ))}
      </div>

      {openCard && openList && (
        <CardSheet
          key={openCard.id}
          card={openCard}
          list={openList}
          lists={board.lists}
          onSave={(title, description) => dispatch({ type: 'updateCard', cardId: openCard.id, title, description })}
          onMove={(toListId) => dispatch({ type: 'moveCard', cardId: openCard.id, toListId })}
          onDelete={() => dispatch({ type: 'deleteCard', cardId: openCard.id })}
          onClose={() => setOpenCardId(null)}
        />
      )}
    </div>
  )
}
