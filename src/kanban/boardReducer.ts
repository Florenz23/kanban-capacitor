import type { Board, Card } from './types'

export type Action =
  | { type: 'updateCard'; cardId: string; title: string; description: string }
  | { type: 'deleteCard'; cardId: string }
  | { type: 'moveCard'; cardId: string; toListId: string; toIndex?: number }

const findCard = (board: Board, cardId: string) => {
  for (const list of board.lists) {
    const card = list.cards.find((c) => c.id === cardId)
    if (card) return { list, card }
  }
}

export function boardReducer(board: Board, action: Action): Board {
  switch (action.type) {
    case 'updateCard':
      return {
        ...board,
        lists: board.lists.map((l) => ({
          ...l,
          cards: l.cards.map((c) =>
            c.id === action.cardId ? { ...c, title: action.title, description: action.description } : c,
          ),
        })),
      }

    case 'deleteCard':
      return {
        ...board,
        lists: board.lists.map((l) => ({ ...l, cards: l.cards.filter((c) => c.id !== action.cardId) })),
      }

    case 'moveCard': {
      const found = findCard(board, action.cardId)
      if (!found) return board
      const moving: Card = found.card
      const lists = board.lists.map((l) => ({ ...l, cards: l.cards.filter((c) => c.id !== moving.id) }))
      return {
        ...board,
        lists: lists.map((l) => {
          if (l.id !== action.toListId) return l
          const cards = [...l.cards]
          cards.splice(action.toIndex ?? cards.length, 0, moving)
          return { ...l, cards }
        }),
      }
    }
  }
}
