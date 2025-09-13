import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({
                   isOpen,
                   onClose,
                   title,
                   children,
                   confirmText = "Confirm",
                   cancelText = "Cancel",
                   onConfirm,
                   confirmButtonClass = "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded",
                   size = "md",
               }) => {
    if (!isOpen) return null;

    // size mapping
    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                    // 👆 semi-transparent black with subtle blur
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className={`bg-white rounded-2xl shadow-lg w-full ${sizeClasses[size]} p-6`}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">{title}</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <div className="mb-6">{children}</div>

                        {/* Footer */}
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                            >
                                {cancelText}
                            </button>
                            <button onClick={onConfirm} className={confirmButtonClass}>
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
