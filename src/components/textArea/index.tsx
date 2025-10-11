"use client";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaPen } from "react-icons/fa";

interface TextAreaProps {
    maxLength?: number;
    onSave?: (text: string) => void;
}
export default function TextArea({ maxLength = 200, onSave }: TextAreaProps) {
    const [inputTextArea, setInputTextArea] = useState("");
    const [textBio, setTextBio] = useState("");
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const openEdit = () => {
        setEdit(true);
    };
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputTextArea(event.target.value);
    };
    const saveText = async () => {
        if (inputTextArea.length === 0) {
            setError(`Adicione uma bio`);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            // Simulação de chamada de API
            await new Promise((resolve) => setTimeout(resolve, 500));
            setTextBio(inputTextArea);
            setEdit(false);
            onSave?.(inputTextArea); // Chama a função de callback, se fornecida
        } catch (e: any) {
            setError(e.message || "Erro ao salvar");
        } finally {
            setLoading(false);
        }
    };

    const cancel = () => {
        setInputTextArea("");
        setEdit(false);
        setError(null);
    };

    return (
        <section>
            <div
                className={`flex flex-col flex-wrap w-full px-4 border rounded-sm py-4 ${
                    edit ? "hidden" : "block"
                }`}
            >
                <div className="w-full flex justify-between items-center">
                    <label htmlFor="bio" className="font-semibold">
                        Bio:
                    </label>
                    <button
                        className="group w-[40px] h-[40px] rounded-full hover:bg-neutral-600/20 flex items-center justify-center cursor-pointer "
                        onClick={openEdit}
                        aria-label="Editar bio"
                    >
                        <CiEdit className="w-6 h-6 text-neutral-400 group-hover:text-neutral-700" />
                    </button>
                </div>
                <pre
                    id="bio"
                    className="pl-2 ml-2 w-11/12"
                    style={{
                        whiteSpace: "pre-wrap",
                        maxWidth: "100%",
                        wordBreak: "break-word",
                    }}
                >
                    {textBio || "Adicione uma bio"}
                </pre>
            </div>

            {edit && (
                <div className="relative flex flex-col w-full px-2">
                    <div>
                        <textarea
                            value={inputTextArea}
                            onChange={handleChange}
                            name="about-textarea"
                            id="about-textarea"
                            placeholder="escreva aqui!"
                            className="w-full h-20 border px-5 py-4 rounded-md resize-none overflow-auto scrollbar-none focus:outline-none focus:ring focus:border-blue-300"
                            aria-label="Editar bio"
                            style={{
                                border: `1px solid ${
                                    error ? "#ef4444" : "#d1d5db"
                                }`,
                            }}
                            maxLength={maxLength}
                        />
                        <p className="absolute -top-2.5 right-5 dark:bg-balck bg-white text-sm">
                            {inputTextArea.length}/{maxLength}
                        </p>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            className="bg-gray-500 hover:bg-gray-500/40 font-semibold text-white px-5 py-2 rounded-md mt-2 cursor-pointer"
                            type="button"
                            onClick={cancel}
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-500/40 font-semibold text-white px-5 py-2 rounded-md mt-2 cursor-pointer"
                            type="button"
                            onClick={saveText}
                            disabled={loading}
                        >
                            {loading ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            )}
        </section>
    );
}
