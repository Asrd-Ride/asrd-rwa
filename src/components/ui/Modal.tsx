'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Coins, AlertTriangle, Info, CheckCircle } from 'lucide-react'
import { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  type?: 'info' | 'warning' | 'success' | 'error'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  type = 'info',
  size = 'md'
}: ModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-6xl' // Increased for AssetDetailModal
  }

  const icon = {
    info: <Info className="w-6 h-6 text-blue-400" />,
    warning: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
    success: <CheckCircle className="w-6 h-6 text-green-500" />,
    error: <AlertTriangle className="w-6 h-6 text-red-500" />
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`relative bg-luxury-dark border border-emerald-500/20 rounded-2xl shadow-2xl ${sizeClasses[size]} w-full mx-auto max-h-[95vh] overflow-hidden glass-3d`}
        >
          {/* Header - Only show if title is provided */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-emerald-500/20">
              <div className="flex items-center space-x-3">
                {icon[type]}
                <h2 className="text-xl font-bold text-white">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-700/50 rounded-full transition-colors text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Content */}
          <div className="overflow-y-auto" style={{ maxHeight: title ? 'calc(95vh - 80px)' : '95vh' }}>
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
