import React from 'react';

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full h-96 relative">
                <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}