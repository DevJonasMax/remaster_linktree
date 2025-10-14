import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { ModalProps } from "@/types";

export default function Modal({
    children,
    isOpen,
    onClose,
    saveData,
    title,
    textBtnRight = "Salvar",
    textBtnLeft = "Cancelar",
    emphasis = "right",
    bgColorBtnRight = "blue",
    bgColorBtnLeft = "gray",
    typeButton = "submit",
    idForm,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    const colorClasses: Record<string, string> = {
        blue: "bg-blue-700 hover:bg-blue-600 border-blue-800",
        red: "bg-red-700 hover:bg-red-600 border-red-800",
        green: "bg-green-700 hover:bg-green-600 border-green-800",
        gray: "bg-gray-700 hover:bg-gray-600 border-gray-800",
        zinc: "bg-zinc-700 hover:bg-zinc-600 border-zinc-800",
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50 p-4"
                >
                    <motion.div
                        ref={modalRef}
                        key="modal-content"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 border dark:border-neutral-700"
                    >
                        {title && (
                            <h1 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-gray-100">
                                {title}
                            </h1>
                        )}

                        <div className="text-neutral-700 dark:text-gray-200">
                            {children}
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border text-gray-100 transition-colors ${
                                    emphasis === "left"
                                        ? colorClasses[bgColorBtnLeft] ||
                                          colorClasses.gray
                                        : "bg-gray-600 hover:bg-gray-500 border-gray-700"
                                }`}
                            >
                                {textBtnLeft}
                            </button>

                            <button
                                form={idForm}
                                type={typeButton}
                                onClick={saveData}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border text-gray-100 transition-colors ${
                                    emphasis === "right"
                                        ? colorClasses[bgColorBtnRight] ||
                                          colorClasses.blue
                                        : "bg-gray-600 hover:bg-gray-500 border-gray-700"
                                }`}
                            >
                                {textBtnRight}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
