import { motion, AnimatePresence } from "framer-motion";
import { Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const LinkShareModal = ({ isOpen, onClose, link }) => {
    const [copied, setCopied] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.select(), 100);
        }
    }, [isOpen]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    className="relative z-10 bg-white rounded-lg shadow-xl w-full max-w-md p-6"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                >
                    <h3 className="text-lg font-semibold mb-3">Share File</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        Share this link with others to give them access to this file:
                    </p>

                    <div className="flex items-center gap-2 mb-2">
                        <input
                            ref={inputRef}
                            readOnly
                            value={link}
                            className="flex-1 px-3 py-2 text-sm border rounded-md bg-gray-50"
                        />
                        <motion.button
                            onClick={handleCopy}
                            whileTap={{ scale: 0.9 }}
                            animate={{
                                backgroundColor: copied ? "#dcfce7" : "transparent",
                                color: copied ? "#15803d" : "#374151",
                            }}
                            transition={{ duration: 0.3 }}
                            className="p-2 rounded-md hover:bg-gray-100"
                            title="Copy link"
                        >
                            <Copy size={18} />
                        </motion.button>
                    </div>

                    {/* Animated Success Message */}
                    <AnimatePresence>
                        {copied && (
                            <motion.p
                                className="text-xs text-green-600 mb-2"
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                ✅ Link copied to clipboard!
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <p className="text-xs text-gray-500 mb-4">
                        Anyone with this link can access this file.
                    </p>

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
                        >
                            Close
                        </button>
                        <motion.button
                            onClick={handleCopy}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                backgroundColor: copied ? "#16a34a" : "#7c3aed",
                            }}
                            transition={{ duration: 0.3 }}
                            className="px-4 py-2 rounded-md text-white"
                        >
                            {copied ? "Copied" : "Copy"}
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LinkShareModal;
