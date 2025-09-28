import { useState } from "react";
import { Upload, X } from "lucide-react";
import { motion } from "framer-motion";

const UploadBox = ({
                       files,
                       setFiles, // pass setFiles from parent
                       onUpload,
                       uploading,
                       onRemoveFile,
                       remainingCredits,
                       isUploadDisabled,
                   }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles((prev) => [...prev, ...droppedFiles]);
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prev) => [...prev, ...selectedFiles]);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white shadow-sm border border-gray-200"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <Upload size={18} className="text-indigo-600" />
                    <span>Upload Files</span>
                </div>
                <span className="text-sm text-gray-500">{remainingCredits} credits remaining</span>
            </div>

            {/* Drag and Drop Area */}
            <label
                htmlFor="file-upload"
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-12 cursor-pointer transition ${
                    isDragging
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-300 hover:border-indigo-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <Upload size={32} className="text-indigo-500 mb-3" />
                <span className="text-gray-600 font-medium">Drag and drop files here</span>
                <span className="text-sm text-gray-400">
                    or click to browse ({remainingCredits} credits remaining)
                </span>
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={uploading}
                />
            </label>

            {/* File List */}
            {files.length > 0 && (
                <div className="w-full mt-6 space-y-2">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg text-sm"
                        >
                            <span>{file.name}</span>
                            <button
                                onClick={() => onRemoveFile(index)}
                                className="text-red-500 hover:text-red-700"
                                disabled={uploading}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Button */}
            {files.length > 0 && (
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onUpload}
                        disabled={isUploadDisabled || uploading}
                        className={`px-6 py-2 rounded-xl ${
                            uploading
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        }`}
                    >
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default UploadBox;
