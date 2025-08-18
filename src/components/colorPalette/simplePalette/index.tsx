import { useState } from "react";

type SimplePaletteProps = {
    onSelectColor?: (color: string) => void;
};

const colors = [
    "#111827", // preto suave (body text)
    "#374151", // cinza escuro (subtítulos)
    "#6B7280", // cinza médio (texto secundário)
    "#9CA3AF", // cinza claro (desabilitado)

    "#2563EB", // azul (links, destaque)
    "#16A34A", // verde (sucesso)
    "#DC2626", // vermelho (erro)
    "#D97706", // laranja (aviso)
    "#9333EA", // roxo (criativo)

    "#F59E0B", // amarelo
    "#EC4899", // rosa
    "#06B6D4", // ciano
];

export default function SimplePalette({ onSelectColor }: SimplePaletteProps) {
    const [selectedColor, setSelectedColor] = useState("");

    const handleSelectColor = (color: string) => {
        setSelectedColor(color);
        if (onSelectColor) {
            onSelectColor(color);
        }
    };

    return (
        <div className="grid grid-cols-6 grid-rows-2 gap-3">
            {colors.map((color) => (
                <div
                    key={color}
                    className={`w-7.5 h-7.5 rounded-lg border ${
                        selectedColor === color
                            ? "border-2 border-cyan-600"
                            : ""
                    } cursor-pointer`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleSelectColor(color)}
                    role="button"
                ></div>
            ))}
        </div>
    );
}
