"use client";

import React from 'react';
import { X } from 'lucide-react';
import { ContactSection } from './ContactSection';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/80 hover:bg-slate-100 text-slate-500 hover:text-slate-800 shadow-sm border border-slate-200/80 transition-colors"
            aria-label="Close Contact Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6">
          <ContactSection isModal={true} onCloseModal={onClose} />
        </div>
      </div>
    </div>
  );
};
