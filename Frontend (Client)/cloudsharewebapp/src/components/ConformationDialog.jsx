import React from "react";
import Modal from "./Modal.jsx";

const ConfirmationDialog = ({
                                isOpen,
                                onClose,
                                title = "Confirm Action",
                                message = "Are you sure you want to proceed?",
                                confirmText = "Confirm",
                                cancelText = "Cancel",
                                onConfirm,
                                confirmButtonClass = "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded",
                            }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            confirmText={confirmText}
            cancelText={cancelText}
            onConfirm={onConfirm}
            confirmButtonClass={confirmButtonClass}
            size="sm"
        >
            <p className="text-gray-600">{message}</p>
        </Modal>
    );
};

export default ConfirmationDialog;
