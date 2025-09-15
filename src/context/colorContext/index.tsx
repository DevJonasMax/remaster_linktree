"use client";
import { createContext, useContext, useState } from "react";

interface colorContextProps {
    colorSelected: string;
    handleSetColor: (color: string) => void;
}

const ColorContext = createContext({} as colorContextProps);

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
    const [colorSelected, setColorSelected] = useState<string>("#FFFFFF");

    const handleSetColor = (color: string) => {
        setColorSelected(color);
    };

    return (
        <ColorContext.Provider
            value={{
                colorSelected,
                handleSetColor,
            }}
        >
            {children}
        </ColorContext.Provider>
    );
};

export const useColorContext = () => {
    const context = useContext(ColorContext);
    if (context === undefined) {
        throw new Error(
            "useColorContext deve ser usado dentro de um ColorProvider"
        );
    }
    return context;
};
