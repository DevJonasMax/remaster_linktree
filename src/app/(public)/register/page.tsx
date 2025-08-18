"use client";
import Inputs from "@/components/inputs";
import { useEffect, useState } from "react";

export default function Register() {
    return (
        <div className="w-full max-w-3xl m-auto h-full flex flex-col border-1">
            <h1>Register page</h1>
            <button className="bg-primary text-white px-4 py-2 rounded">
                Botão Primário
            </button>

            <p className="text-muted">Texto secundário</p>

            <div className="bg-background text-foreground container-padrao">
                Conteúdo da página
            </div>
            <Inputs placeholder="Digite seu nome" />
        </div>
    );
}
