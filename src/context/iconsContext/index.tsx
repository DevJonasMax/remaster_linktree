import { createContext, useState, ReactNode, useContext } from "react";
import * as Icons from "react-icons/fa";

type IconContextProps = {
    iconSelected: string;
    colorIcon: string;
    setIconSelected: (icon: string) => void;
    setColorIcon: (colorIcon: string) => void;
    removeIcon: () => void;
};

const IconContext = createContext({} as IconContextProps);

export function IconProvider({ children }: { children: ReactNode }) {
    const [iconSelected, setIconSelected] = useState<string>("");
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

export default function DisplayIcons({ size }: { size: number }) {
    const { iconSelected, colorIcon } = useContext(IconContext);
    if (!iconSelected) return null;
    const IconComponent = (Icons as Record<string, React.ComponentType<any>>)[
        iconSelected
    ];
    return (
        <IconComponent
            style={{
                color: colorIcon,
                fontSize: size,
            }}
        />
    );
}
