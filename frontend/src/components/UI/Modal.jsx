import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  className = '' 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className={`inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full ${className}`}>
          <div className="absolute top-0 right-0 pt-6 pr-6">
            <button
              onClick={onClose}
              className="bg-white rounded-full p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};
