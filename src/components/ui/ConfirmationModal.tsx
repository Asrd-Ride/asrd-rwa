"use client";

import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'success' | 'warning' | 'danger' | 'info';
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info'
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const getTypeColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-400/30',
          text: 'text-emerald-300',
          button: 'bg-emerald-500 hover:bg-emerald-600'
        };
      case 'warning':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-400/30',
          text: 'text-amber-300',
          button: 'bg-amber-500 hover:bg-amber-600'
        };
      case 'danger':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-400/30',
          text: 'text-red-300',
          button: 'bg-red-500 hover:bg-red-600'
        };
      default:
        return {
          bg: 'bg-cyan-500/10',
          border: 'border-cyan-400/30',
          text: 'text-cyan-300',
          button: 'bg-cyan-500 hover:bg-cyan-600'
        };
    }
  };

  const colors = getTypeColors();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-ultimate rounded-3xl border border-white/20 p-8 max-w-md w-full mx-4">
        {/* Icon */}
        <div className={`w-16 h-16 ${colors.bg} ${colors.border} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
          {type === 'success' && (
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {type === 'warning' && (
            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          )}
          {type === 'danger' && (
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {type === 'info' && (
            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-cyan-100 leading-relaxed">{message}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-white/20 text-white py-3 px-4 rounded-xl font-semibold hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 ${colors.button} text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
