"use client";
import { createContext, useState, ReactNode, useContext } from "react";
import * as Icons from "react-icons/fa";

type IconContextProps = {
    iconSelected: string | null;
    colorIcon: string;
    setIconSelected: (icon: string | null) => void;
    setColorIcon: (colorIcon: string) => void;
    removeIcon: () => void;
};

const IconContext = createContext({} as IconContextProps);

export function IconProvider({ children }: { children: ReactNode }) {
    const [iconSelected, setIconSelected] = useState<string | null>("");
    const [colorIcon, setColorIcon] = useState<string>("");
    const removeIcon = () => {
        setIconSelected("");
        setColorIcon("");
    };
    return (
        <IconContext.Provider
            value={{
                iconSelected,
                colorIcon,
                setIconSelected,
                setColorIcon,
                removeIcon,
            }}
        >
            {children}
        </IconContext.Provider>
    );
}

export const useIconContext = () => {
    const context = useContext(IconContext);
    if (context === undefined) {
        throw new Error(
            "useIconContext deve ser usado dentro de um IconProvider"
        );
    }
    return context;
};

interface DisplayProps {
    size: number;
    emoji?: string | null;
    icon?: string | null;
    color?: string; // cor opcional para o ícone
}

export default function DisplayIcons({
    size,
    emoji,
    icon,
    color,
}: DisplayProps) {
    // Apenas como fallback, se você ainda quiser usar contexto
    const { iconSelected: contextIcon, colorIcon: contextColor } =
        useContext(IconContext);

    // Renderiza emoji se houver
    if (emoji) {
        return (
            <div
                className="h-auto flex items-center justify-center"
                style={{
                    lineHeight: 1,
                    fontSize: size - 4,
                }}
            >
                {emoji}
            </div>
        );
    }

    // Usa icon passado via prop ou fallback do contexto
    const iconToRender = icon || contextIcon;
    const iconColor = color || contextColor;

    if (!iconToRender) return null;

    const IconComponent = (Icons as Record<string, React.ComponentType<any>>)[
        iconToRender
    ];

    if (!IconComponent) return null;

    return <IconComponent style={{ color: iconColor, fontSize: size }} />;
}
