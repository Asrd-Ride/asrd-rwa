"use client";

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, Zap } from 'lucide-react';

interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info' | 'premium';
  title: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Premium3DNotification({ 
  type, 
  title, 
  message, 
  isVisible, 
  onClose,
  duration = 5000 
}: NotificationProps) {
  React.useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-emerald-400" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-amber-400" />;
      case 'info':
        return <Info className="w-6 h-6 text-cyan-400" />;
      case 'premium':
        return <Zap className="w-6 h-6 text-purple-400" />;
      default:
        return <Info className="w-6 h-6 text-cyan-400" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/30 bg-emerald-500/10';
      case 'error':
        return 'border-red-500/30 bg-red-500/10';
      case 'warning':
        return 'border-amber-500/30 bg-amber-500/10';
      case 'info':
        return 'border-cyan-500/30 bg-cyan-500/10';
      case 'premium':
        return 'border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-cyan-500/10';
      default:
        return 'border-cyan-500/30 bg-cyan-500/10';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.8, rotateY: 45 }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            scale: 1, 
            rotateY: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 25
            }
          }}
          exit={{ 
            opacity: 0, 
            x: 300, 
            scale: 0.8, 
            rotateY: -45,
            transition: { duration: 0.2 }
          }}
          className={`fixed top-24 right-6 z-50 max-w-sm rounded-2xl border p-4 backdrop-blur-xl ${getStyles()} shadow-2xl transform-gpu`}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          <div className="flex items-start space-x-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="flex-shrink-0"
            >
              {getIcon()}
            </motion.div>
            <div className="flex-1 min-w-0">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white font-semibold text-sm mb-1"
              >
                {title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 text-sm leading-relaxed"
              >
                {message}
              </motion.p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
            >
              <XCircle className="w-4 h-4" />
            </motion.button>
          </div>
          
          {/* Progress bar */}
          {duration > 0 && (
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-current opacity-30 origin-left rounded-full"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
