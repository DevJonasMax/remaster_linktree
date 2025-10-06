import { useState } from "react";

type SimplePaletteProps = {
    onSelectColor?: (color: string) => void;
    sizePallete?: "default" | "small";
    size?: string;
};

const colors = [
    "#111827", // preto suave (body text)
    "#374151", // cinza escuro (subtítulos)
    "#FFFFFF", // cinza médio (texto secundário)
    "#9CA3AF", // cinza claro (desabilitado)

    "#2563EB", // azul (links, destaque)
    "#16A34A", // verde (sucesso)
    "#DC2626", // vermelho (erro)
    "#D97706", // laranja (aviso)
    "#9333EA", // roxo (criativo)

    "#ffdd00", // amarelo
    "#EC4899", // rosa
    "#06B6D4", // ciano
];
const colorReduced = [
    "#111827",
    "#FFFFFF",
    "#2563EB",
    "#16A34A",
    "#DC2626",
    "#D97706",
];
export default function SimplePalette({
    onSelectColor,
    sizePallete = "default",
    size = "30px",
}: SimplePaletteProps) {
    const [selectedColor, setSelectedColor] = useState("");
    const handleSelectColor = (color: string) => {
        setSelectedColor(color);
        if (onSelectColor) {
            onSelectColor(color);
        }
    };

    return (
        <div>
            {sizePallete === "default" && (
                <div className="grid grid-cols-6 grid-rows-2 gap-3">
                    {colors.map((color) => (
                        <div
                            key={color}
                            className={` rounded-lg border ${
                                selectedColor === color
                                    ? "border-1 border-cyan-600"
                                    : "border-gray-600/60"
                            } cursor-pointer`}
                            style={{
                                backgroundColor: color,
                                width: size,
                                height: size,
                            }}
                            onClick={() => handleSelectColor(color)}
                            role="button"
                        ></div>
                    ))}
                </div>
            )}
            {sizePallete === "small" && (
                <div className="flex flex-row flex-wrap gap-3">
                    {colorReduced.map((color) => (
                        <div
                            key={color}
                            className={` rounded-lg border ${
                                selectedColor === color
                                    ? "border-1 border-cyan-600"
                                    : "border-gray-600/60"
                            } cursor-pointer`}
                            style={{
                                backgroundColor: color,
                                width: size,
                                height: size,
                            }}
                            onClick={() => handleSelectColor(color)}
                            role="button"
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );
}
