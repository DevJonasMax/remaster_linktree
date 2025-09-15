import React, { useEffect, useRef } from "react"; // useState pode não ser necessário aqui se o pai controla tudo

import type { ModalProps } from "@/types";

export default function Modal({
    children,
    isOpen,
    onClose,
    saveData,
    title,
}: ModalProps) {
    if (!isOpen) {
        return null;
    }
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

    return (
        <div className="fixed p-2 inset-0 flex flex-col justify-center items-center bg-zinc-200 dark:bg-neutral-800/98 bg-opacity-70 z-50 ">
            <div
                ref={modalRef}
                className="inset-shadow-2xs p-6 rounded-lg shadow-xl w-full max-w-xl dark:border dark:bg-neutral-800 max-h-[100vh] overflow-y-auto sm:max-h-[100vh]"
            >
                <h1 className="text-xl text-neutral-800 dark:text-gray-100 font-medium mb-4 pl-5">
                    {title}
                </h1>
                {children}
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="cursor-pointer px-4 py-2 bg-zinc-700 text-gray-100 rounded hover:bg-zinc-600 border border-gray-600"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={saveData}
                        className="cursor-pointer  px-4 py-2 bg-blue-800 text-gray-100 rounded hover:bg-blue-600 border border-blue-900"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
