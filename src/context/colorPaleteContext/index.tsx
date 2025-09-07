import { createContext, useState } from "react";
import * as icons from "react-icons/fa";
import { IconType } from "react-icons";

interface IconContextProps {
    iconSelected: string;
    colorIcon: string;
    setIconSelected: (icon: string) => void;
    setColorIcon: (colorIcon: string) => void;
}

const IconContext = createContext<IconContextProps | null>(null);

export const IconProvider = ({ children }: { children: React.ReactNode }) => {
    const [iconSelected, setIconSelected] = useState<string>("");

    const [colorIcon, setColorIcon] = useState<string>("#FFFFFF");

    return (
        <IconContext.Provider
            value={{
                iconSelected,
                colorIcon,
                setIconSelected,
                setColorIcon,
            }}
        >
            {children}
        </IconContext.Provider>
    );
};
