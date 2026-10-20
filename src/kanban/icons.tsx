import {
  ArrowLeftRight, ArrowRight, Bell, Calendar, Camera, ChartLine, CircleCheck, Clock, Globe,
  Heart, Lightbulb, Link, Rocket, Shield, Smartphone, Smile, SquareCheck, SquarePlay, Star,
  StickyNote, Trash2, Zap, type LucideIcon,
} from 'lucide-react'

// Icons are stored by name so the board stays plain JSON in storage.
export const icons: Record<string, LucideIcon> = {
  ArrowLeftRight, ArrowRight, Bell, Calendar, Camera, ChartLine, CircleCheck, Clock, Globe,
  Heart, Lightbulb, Link, Rocket, Shield, Smartphone, Smile, SquareCheck, SquarePlay, Star,
  StickyNote, Trash2, Zap,
}

export function Icon({ name, className }: { name?: string; className?: string }) {
  const C = (name && icons[name]) || StickyNote
  return <C className={className} aria-hidden />
}
