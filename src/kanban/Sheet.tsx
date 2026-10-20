import { X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { useKeyboardInset } from './useKeyboardInset'

type Props = {
  title?: ReactNode
  onClose: () => void
  children: ReactNode
}

// Full-width panel that slides up from the bottom and stays above the keyboard.
export function Sheet({ title, onClose, children }: Props) {
  const [shown, setShown] = useState(false)
  const keyboard = useKeyboardInset()

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="fixed inset-0 z-50">
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${shown ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        role="dialog"
        aria-modal
        style={{ bottom: keyboard }}
        className={`absolute inset-x-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl border-t border-white/20 bg-[#1b2c5e]/95 px-5 pt-2 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out ${
          shown ? 'translate-y-0' : 'translate-y-full'
        } ${keyboard ? 'pb-4' : 'pb-[max(1rem,env(safe-area-inset-bottom))]'}`}
      >
        <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-white/30" />
        <div className="mb-3 flex items-center gap-2">
          <div className="flex-1 text-[17px] font-semibold text-white">{title}</div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-full text-white/80 active:bg-white/15"
          >
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
